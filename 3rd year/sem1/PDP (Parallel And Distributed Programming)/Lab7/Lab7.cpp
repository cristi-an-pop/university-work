#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <mpi.h>
#include <fstream>
#include <cassert>
#include <chrono>

void printPolynomial(const std::vector<int>& poly) {
    for (size_t i = 0; i < poly.size(); ++i) {
        if (i > 0) std::cout << " + ";
        std::cout << poly[i] << "x^" << i;
    }
    std::cout << std::endl;
}

void generatePolynomial(std::vector<int>& poly, int size, int minCoeff = 0, int maxCoeff = 10) {
    poly.resize(size);
    for (int i = 0; i < size; ++i) {
        poly[i] = minCoeff + rand() % (maxCoeff - minCoeff + 1);
    }
}

void sendWork(const std::vector<int>& A, const std::vector<int>& B, int nrProcs) {
    std::cout << "Sending work to " << nrProcs << " processes..." << std::endl;
    int n = A.size();
    int l = A.size() + B.size() - 1;
    for (int i = 1; i < nrProcs; ++i) {
        int start = i * l / nrProcs;
        int end = std::min(l, (i + 1) * l / nrProcs);
        MPI_Ssend(&n, 1, MPI_INT, i, 0, MPI_COMM_WORLD);
        MPI_Ssend(&start, 1, MPI_INT, i, 1, MPI_COMM_WORLD);
        MPI_Ssend(&end, 1, MPI_INT, i, 2, MPI_COMM_WORLD);
        MPI_Ssend(A.data(), std::min(end, n), MPI_INT, i, 3, MPI_COMM_WORLD);
        MPI_Ssend(B.data(), std::min(end, n), MPI_INT, i, 4, MPI_COMM_WORLD);
    }
    std::cout << "Work sent!" << std::endl;
}

inline void doWork(int start, int end, const std::vector<int>& A, const std::vector<int>& B, std::vector<int>& result) {
    std::cout << "Computing partial result for range [" << start << ", " << end << ")..." << std::endl;

    for (int i = start; i < end; ++i) {
        for (int x = 0; x <= std::min(int(A.size()) - 1, i); ++x) {
            int y = i - x;
            if (y >= B.size()) {
                continue;
            }
            result[i - start] += A[x] * B[y];
        }
    }
    std::cout << "Partial result computed!" << std::endl;
}

void collectResults(int nrProcs, std::vector<int>& finalResult) {
    int n = finalResult.size();
    for (int i = 1; i < nrProcs; ++i) {
        MPI_Status _;
        int start = i * n / nrProcs;
        int end = std::min(n, (i + 1) * n / nrProcs);
        MPI_Recv(finalResult.data() + start, end - start, MPI_INT, i, 5, MPI_COMM_WORLD, &_);
    }
    std::cout << "Results collected!" << std::endl;
}


void verifyResult(const std::vector<int>& poly1, const std::vector<int>& poly2, const std::vector<int>& result) {
    int n = poly1.size();
    std::vector<int> expectedResult(2 * n - 1, 0);

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            expectedResult[i + j] += poly1[i] * poly2[j];
        }
    }

    assert(expectedResult.size() == result.size());
    for (size_t i = 0; i < expectedResult.size(); ++i) {
        assert(expectedResult[i] == result[i]);
    }

    std::cout << "Result verified successfully!" << std::endl;
}

void workerProcess(int me) {
    std::cout << "Worker process " << me << " started!" << std::endl;
    int n;
    int start;
    int end;
    MPI_Status _;
    MPI_Recv(&n, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, &_);
    MPI_Recv(&start, 1, MPI_INT, 0, 1, MPI_COMM_WORLD, &_);
    MPI_Recv(&end, 1, MPI_INT, 0, 2, MPI_COMM_WORLD, &_);
    std::vector<int> A(end);
    std::vector<int> B(end);
    MPI_Recv(A.data(), std::min(end, n), MPI_INT, 0, 3, MPI_COMM_WORLD, &_);
    MPI_Recv(B.data(), std::min(end, n), MPI_INT, 0, 4, MPI_COMM_WORLD, &_);
    std::vector<int> result(end - start, 0);
    doWork(start, end, A, B, result);
    MPI_Ssend(result.data(), end - start, MPI_INT, 0, 5, MPI_COMM_WORLD);
    std::cout << "Worker process " << me << " finished!" << std::endl;
}

void checkResult(const std::vector<int> A, const std::vector<int> B, const std::vector<int> result) {
    std::vector<int> expected(2 * A.size() - 1, 0);
    for (size_t i = 0; i < A.size(); ++i) {
        for (size_t j = 0; j < B.size(); ++j) {
            expected[i + j] += A[i] * B[j];
        }
    }

    for (size_t i = 0; i < expected.size(); ++i) {
        assert(expected[i] == result[i]);
    }
}


int main(int argc, char** argv) {
    MPI_Init(0, 0);
    int me;
    int nrProcs;

    MPI_Comm_rank(MPI_COMM_WORLD, &me);
    MPI_Comm_size(MPI_COMM_WORLD, &nrProcs);

    unsigned int n;
    std::vector<int> A, B;

    if (argc != 2 || 1 != sscanf_s(argv[1], "%u", &n)) {
        fprintf(stderr, "usage: mpi_naive <n>\n");
        return 1;
    }

    if (me == 0) {
        generatePolynomial(A, n);
        generatePolynomial(B, n);
        std::cout << "Polynomial A: ";
        printPolynomial(A);
        std::cout << "Polynomial B: ";
        printPolynomial(B);
        auto startTime = std::chrono::high_resolution_clock::now();
        sendWork(A, B, nrProcs);
        int start = 0;
        int end = (2 * n - 1) / nrProcs;
        std::vector<int> result(2 * n - 1);
        doWork(start, end, A, B, result);
        collectResults(nrProcs, result);
        auto endTime = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = endTime - startTime;
        checkResult(A, B, result);
		std::cout << "Time: " << duration.count() << "s" << std::endl;
        std::cout << "Result: " << std::endl;
        printPolynomial(result);
    } else {
        workerProcess(me);
    }

    MPI_Finalize();
}
