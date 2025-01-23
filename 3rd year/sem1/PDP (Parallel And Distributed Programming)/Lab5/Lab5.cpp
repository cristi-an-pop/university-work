#include <iostream>
#include <vector>
#include <thread>
#include <chrono>
#include <cmath>
#include <mutex>

void printPolynomial(const std::vector<int>& poly) {
    for (size_t i = 0; i < poly.size(); ++i) {
        if (i > 0) std::cout << " + ";
        std::cout << poly[i] << "x^" << i;
    }
    std::cout << std::endl;
}

std::vector<int> multiplyNaive(const std::vector<int>& A, const std::vector<int>& B) {
    int n = A.size(), m = B.size();
    std::vector<int> result(n + m - 1, 0);

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            result[i + j] += A[i] * B[j];
        }
    }
    return result;
}

void multiplyNaiveParallelWorker(const std::vector<int>& A, const std::vector<int>& B, std::vector<int>& result, int start, int end) {
    for (int i = start; i < end; ++i) {
        for (int j = 0; j < B.size(); ++j) {
            result[i + j] += A[i] * B[j];
        }
    }
}

std::vector<int> multiplyNaiveParallel(const std::vector<int>& A, const std::vector<int>& B, int numThreads) {
    int n = A.size(), m = B.size();
    std::vector<int> result(n + m - 1, 0);
    std::vector<std::thread> threads;

    int chunkSize = (n + numThreads - 1) / numThreads;
    for (int t = 0; t < numThreads; ++t) {
        int start = t * chunkSize;
        int end = std::min(start + chunkSize, n);
        threads.emplace_back(multiplyNaiveParallelWorker, std::ref(A), std::ref(B), std::ref(result), start, end);
    }

    for (auto& thread : threads) {
        thread.join();
    }

    return result;
}

std::vector<int> karatsuba(const std::vector<int>& A, const std::vector<int>& B) {
    int n = A.size();
    if (n == 1) return { A[0] * B[0] };
    int k = n / 2;

    std::vector<int> A0(A.begin(), A.begin() + k);
    std::vector<int> A1(A.begin() + k, A.end());
    std::vector<int> B0(B.begin(), B.begin() + k);
    std::vector<int> B1(B.begin() + k, B.end());

    auto P1 = karatsuba(A1, B1);
    auto P2 = karatsuba(A0, B0);

    std::vector<int> A0A1(A0.size());
    std::vector<int> B0B1(B0.size());
    for (int i = 0; i < k; ++i) {
        A0A1[i] = A0[i] + A1[i];
        B0B1[i] = B0[i] + B1[i];
    }

    auto P3 = karatsuba(A0A1, B0B1);

    std::vector<int> result(2 * n - 1, 0);
    for (int i = 0; i < P1.size(); ++i) result[i + n] += P1[i];
    for (int i = 0; i < P2.size(); ++i) result[i] += P2[i];
    for (int i = 0; i < P3.size(); ++i) result[i + k] += P3[i] - P1[i] - P2[i];

    return result;
}

std::vector<int> karatsubaParallel(const std::vector<int>& A, const std::vector<int>& B, int depth = 0) {
    int n = A.size();

    if (n <= 128) return multiplyNaive(A, B);

    int k = n / 2;
    std::vector<int> A0(A.begin(), A.begin() + k);
    std::vector<int> A1(A.begin() + k, A.end());
    std::vector<int> B0(B.begin(), B.begin() + k);
    std::vector<int> B1(B.begin() + k, B.end());

    std::vector<int> P1, P2, P3;

    if (depth < 4) {
        std::thread t1([&]() { P1 = karatsubaParallel(A1, B1, depth + 1); });
        std::thread t2([&]() { P2 = karatsubaParallel(A0, B0, depth + 1); });

        t1.join();
        t2.join();
    }
    else {
        P1 = karatsuba(A1, B1);
        P2 = karatsuba(A0, B0);
    }

    std::vector<int> A0A1(A0.size());
    std::vector<int> B0B1(B0.size());
    for (int i = 0; i < k; ++i) {
        A0A1[i] = A0[i] + A1[i];
        B0B1[i] = B0[i] + B1[i];
    }

    P3 = karatsuba(A0A1, B0B1);

    std::vector<int> result(2 * n - 1, 0);
    for (int i = 0; i < P1.size(); ++i) result[i + n] += P1[i];
    for (int i = 0; i < P2.size(); ++i) result[i] += P2[i];
    for (int i = 0; i < P3.size(); ++i) result[i + k] += P3[i] - P1[i] - P2[i];

    return result;
}


template <typename Func>
void measure(const std::string& description, Func func) {
    auto start = std::chrono::high_resolution_clock::now();
    func();
    auto end = std::chrono::high_resolution_clock::now();
    std::cout << description << ": "
        << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count()
        << " ms" << std::endl;
}

std::vector<int> generatePolynomial(int size, int minCoeff = 0, int maxCoeff = 10) {
    std::vector<int> poly(size);
    for (int i = 0; i < size; ++i) {
        poly[i] = minCoeff + rand() % (maxCoeff - minCoeff + 1);
    }
    return poly;
}

int main() {
    std::vector<int> A = generatePolynomial(4);
    std::vector<int> B = generatePolynomial(4);

	//printPolynomial(A);
	//printPolynomial(B);
	//printPolynomial(multiplyNaive(A, B));
	//printPolynomial(multiplyNaiveParallel(A, B, 4));
	//printPolynomial(karatsuba(A, B));
	//printPolynomial(karatsubaParallel(A, B));

     A = generatePolynomial(2048);
	 B = generatePolynomial(2048);

      measure("Naive Sequential", [&]() { multiplyNaive(A, B); });
      measure("Karatsuba Sequential", [&]() { karatsuba(A, B); });

     measure("Naive Parallel", [&]() { multiplyNaiveParallel(A, B, 12); });
     measure("Karatsuba Parallel", [&]() { karatsubaParallel(A, B); });

    return 0;
}
