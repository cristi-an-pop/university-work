#include <iostream>
#include <vector>
#include <thread>
#include <future>
#include <chrono>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <cstdlib>

using Matrix = std::vector<std::vector<int>>;

class ThreadPool {
public:
    explicit ThreadPool(size_t numThreads);
    ~ThreadPool();

    template <class F>
    void enqueue(F&& task);

private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queueMutex;
    std::condition_variable condition;
    bool stop;

    void workerThread();
};

ThreadPool::ThreadPool(size_t numThreads) : stop(false) {
    for (size_t i = 0; i < numThreads; ++i)
        workers.emplace_back(&ThreadPool::workerThread, this);
}

ThreadPool::~ThreadPool() {
    {
        std::unique_lock<std::mutex> lock(queueMutex);
        stop = true;
    }
    condition.notify_all();
    for (auto& worker : workers)
        worker.join();
}

template <class F>
void ThreadPool::enqueue(F&& task) {
    {
        std::unique_lock<std::mutex> lock(queueMutex);
        tasks.emplace(std::forward<F>(task));
    }
    condition.notify_one();
}

void ThreadPool::workerThread() {
    while (true) {
        std::function<void()> task;
        {
            std::unique_lock<std::mutex> lock(queueMutex);
            condition.wait(lock, [this] { return stop || !tasks.empty(); });
            if (stop && tasks.empty())  
                return;
            task = std::move(tasks.front());
            tasks.pop();
        }
        task();
    }
}

Matrix generateRandomMatrix(int rows, int cols) {
    Matrix matrix(rows, std::vector<int>(cols));
    for (int i = 0; i < rows; ++i)
        for (int j = 0; j < cols; ++j)
            matrix[i][j] = rand() % 10;
    return matrix;
}

int computeElement(const Matrix& A, const Matrix& B, int row, int col) {
    int result = 0;
    for (int k = 0; k < A[0].size(); ++k)
        result += A[row][k] * B[k][col];
    return result;
}

void rowWiseTask(const Matrix& A, const Matrix& B, Matrix& C, int startRow, int endRow) {
    int cols = B[0].size();
    for (int i = startRow; i < endRow; ++i)
        for (int j = 0; j < cols; ++j)
            C[i][j] = computeElement(A, B, i, j);
}

void columnWiseTask(const Matrix& A, const Matrix& B, Matrix& C, int startCol, int endCol) {
    int rows = A.size();
    for (int j = startCol; j < endCol; ++j)
        for (int i = 0; i < rows; ++i)
            C[i][j] = computeElement(A, B, i, j);
}

void kElementTask(const Matrix& A, const Matrix& B, Matrix& C, int taskId, int k) {
    int rows = A.size();
    int cols = B[0].size();
    for (int i = 0; i < rows; ++i)
        for (int j = taskId; j < cols; j += k)
            C[i][j] = computeElement(A, B, i, j);
}

void runWithSeparateThreads(const Matrix& A, const Matrix& B, Matrix& C, int numTasks, int method) {
    std::vector<std::thread> threads;
    int rows = A.size();
    int cols = B[0].size();

    for (int t = 0; t < numTasks; ++t) {
        if (method == 0) {
            int startRow = t * rows / numTasks;
            int endRow = (t + 1) * rows / numTasks;
            threads.emplace_back(rowWiseTask, std::ref(A), std::ref(B), std::ref(C), startRow, endRow);
        }
        else if (method == 1) {
            int startCol = t * cols / numTasks;
            int endCol = (t + 1) * cols / numTasks;
            threads.emplace_back(columnWiseTask, std::ref(A), std::ref(B), std::ref(C), startCol, endCol);
        }
        else if (method == 2) {
            threads.emplace_back(kElementTask, std::ref(A), std::ref(B), std::ref(C), t, numTasks);
        }
    }

    for (auto& thread : threads)
        thread.join();
}

void runWithThreadPool(const Matrix& A, const Matrix& B, Matrix& C, int numTasks, int method, ThreadPool* pool) {
    int rows = A.size();
    int cols = B[0].size();

    for (int t = 0; t < numTasks; ++t) {
        if (method == 0) {
            int startRow = t * rows / numTasks;
            int endRow = (t + 1) * rows / numTasks;
            pool->enqueue([&, startRow, endRow] { rowWiseTask(A, B, C, startRow, endRow); });
        }
        else if (method == 1) {
            int startCol = t * cols / numTasks;
            int endCol = (t + 1) * cols / numTasks;
            pool->enqueue([&, startCol, endCol] { columnWiseTask(A, B, C, startCol, endCol); });
        }
        else if (method == 2) {
            pool->enqueue([&, t] { kElementTask(A, B, C, t, numTasks); });
        }
    }
}

void printMatrix(const Matrix& matrix) {
    for (const auto& row : matrix) {
        for (const auto& element : row)
            std::cout << " " << element;
        std::cout << '\n';
    }
    std::cout << '\n';
}

int main() {
    int size = 1000;
    int numTasks = 5;
    int numThreads = 5;

    Matrix A = generateRandomMatrix(size, size);
    Matrix B = generateRandomMatrix(size, size);
    Matrix C(size, std::vector<int>(size, 0));

    //std::cout << "Matrix A:\n";
    //printMatrix(A);
    //std::cout << "Matrix B:\n";
    //printMatrix(B);
        
    for (int method = 0; method < 3; ++method) {
        C.assign(size, std::vector<int>(size, 0));
        auto start = std::chrono::high_resolution_clock::now();
        runWithSeparateThreads(A, B, C, numTasks, method);
        auto end = std::chrono::high_resolution_clock::now();

        std::cout << "Using Separate Threads, Method " << method << ":\n";
        // printMatrix(C);
        std::cout << "Time taken: "
            << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count()
            << " ms\n\n";

        ThreadPool* pool = new ThreadPool(numThreads);
        C.assign(size, std::vector<int>(size, 0));
        auto start2 = std::chrono::high_resolution_clock::now();
        runWithThreadPool(A, B, C, numTasks, method, pool);
        delete pool;
        auto end2 = std::chrono::high_resolution_clock::now();

        std::cout << "Using Thread Pool, Method " << method << ":\n";
        // printMatrix(C);
        std::cout << "Time taken: "
            << std::chrono::duration_cast<std::chrono::milliseconds>(end2 - start2).count()
            << " ms\n\n";
    }


    return 0;
}
