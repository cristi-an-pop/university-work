#include <iostream>
#include <fstream>
#include <vector>
#include <mpi.h>
#include <time.h>
#include <stdint.h>
#include <stdio.h>
#include <assert.h>
#include <chrono>

using namespace std;

const int MAXVALUE = 100;

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

void brute(int* A, int* B, int* ret, int n) {
    for (int i = 0; i < 2 * n; ++i) {
        ret[i] = 0;
    }
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            ret[i + j] += A[i] * B[j];
        }
    }
}

void karatsuba(int* A, int* B, int* ret, int n) {
    if (n <= 4) {
        brute(A, B, ret, n);
        return;
    }

    int i;
    int* A0 = &A[0];                 // low-order half of A
    int* A1 = &A[n / 2];             // high-order half of A
    int* B0 = &B[0];                 // low-order half of B
    int* B1 = &B[n / 2];             // high-order half of B
    int* asum = &ret[n * 5];         // sum of A's halves
    int* bsum = &ret[n * 5 + n / 2]; // sum of B's halves
    int* p1 = &ret[n * 0];           // A0*B0's location
    int* p2 = &ret[n * 1];           // A1*B1's location
    int* p3 = &ret[n * 2];           // asum*bsum's location

    for (i = 0; i < n / 2; i++) {
        asum[i] = A0[i] + A1[i];
        bsum[i] = B0[i] + B1[i];
    }

    karatsuba(A0, B0, p1, n / 2);
    karatsuba(A1, B1, p2, n / 2);
    karatsuba(asum, bsum, p3, n / 2);

    for (i = 0; i < n; i++)
        p3[i] = p3[i] - p1[i] - p2[i];
    for (i = 0; i < n; i++)
        ret[i + n / 2] += p3[i];
}

inline void sendWork(vector<int>& A, vector<int>& B, int nrProcs) {
    cout << "Sending work to " << nrProcs << " processes..." << endl;
    int n = A.size();
    for (int i = 1; i < nrProcs; ++i) {
        int start = i * n / nrProcs;
        int end = min(n, (i + 1) * n / nrProcs);
        MPI_Ssend(&n, 1, MPI_INT, i, 0, MPI_COMM_WORLD);
        MPI_Ssend(&start, 1, MPI_INT, i, 1, MPI_COMM_WORLD);
        MPI_Ssend(&end, 1, MPI_INT, i, 2, MPI_COMM_WORLD);
        MPI_Ssend(A.data() + start, end - start, MPI_INT, i, 3, MPI_COMM_WORLD);
        MPI_Ssend(B.data(), n, MPI_INT, i, 4, MPI_COMM_WORLD);
    }
    cout << "Work sent!" << endl;
}

inline void doWork(int start, int end, vector<int>& A, vector<int>& B, vector<int>& res) {
    cout << "Computing partial result for range [" << start << ", " << end << ")..." << endl;
    karatsuba(A.data(), B.data(), res.data(), A.size());
    cout << "Partial result computed!" << endl;
}

inline void collectResults(int n, int nrProcs, vector<int>& res) {
    vector<int> aux(2 * n - 1);
    for (int i = 1; i < nrProcs; ++i)
    {
        MPI_Status _;
        int st = i * n / nrProcs;
        int dr = min(n, (i + 1) * n / nrProcs);
        MPI_Recv(aux.data(), 2 * n - 1, MPI_INT, i, 5, MPI_COMM_WORLD, &_);
        for (int i = 0; i < 2 * n - 1; ++i)
        {
            res[i] += aux[i];
        }
    }
    cout << "Results collected!" << endl;
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

inline void workerProcess(int me) {
    std::cout << "Worker process " << me << " started!" << std::endl;
    int n;
    int start;
    int end;
    MPI_Status _;
    MPI_Recv(&n, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, &_);
    MPI_Recv(&start, 1, MPI_INT, 0, 1, MPI_COMM_WORLD, &_);
    MPI_Recv(&end, 1, MPI_INT, 0, 2, MPI_COMM_WORLD, &_);
    vector<int> A(n, 0);
    vector<int> B(n, 0);
    MPI_Recv(A.data() + start, end - start, MPI_INT, 0, 3, MPI_COMM_WORLD, &_);
    MPI_Recv(B.data(), n, MPI_INT, 0, 4, MPI_COMM_WORLD, &_);
    vector<int> res(6 * n, 0);
    doWork(start, end, A, B, res);
    MPI_Ssend(res.data(), 2 * n - 1, MPI_INT, 0, 5, MPI_COMM_WORLD);
    std::cout << "Worker process " << me << " finished!" << std::endl;
}

int main(int argc, char* argv[]) {
    MPI_Init(0, 0);

    int me;
    int nrProcs;
    MPI_Comm_size(MPI_COMM_WORLD, &nrProcs);
    MPI_Comm_rank(MPI_COMM_WORLD, &me);

    unsigned int n;
    vector<int> A, B;

    if (argc != 2 || 1 != sscanf_s(argv[1], "%u", &n)) {
        cout << "usage: mpi_kar <n>\n" << endl;
        return 1;
    }

    if (me == 0) {
		generatePolynomial(A, n);
		cout << "Polynoial A: ";
		printPolynomial(A);
		generatePolynomial(B, n);
		cout << "Polynoial B: ";
		printPolynomial(B);

        while (n & (n - 1)) {
            ++n;
            A.push_back(0);
            B.push_back(0);
        }

        auto startTime = chrono::high_resolution_clock::now();
        sendWork(A, B, nrProcs);

        int st = 0;
        int dr = n / nrProcs;
        vector<int> aux(A);
        for (int i = dr; i < aux.size(); ++i) {
            aux[i] = 0;
        }
        vector<int> res(6 * n);
        doWork(st, dr, aux, B, res);
        collectResults(n, nrProcs, res);
        auto endTime = chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = endTime - startTime;
        res.resize(2 * n - 1);
		cout << "Result: ";
		printPolynomial(res);
        std::cout << "Time: " << duration.count() << "s" << std::endl;
        checkResult(A, B, res);
    }
    else {
        workerProcess(me);
    }

    MPI_Finalize();
}