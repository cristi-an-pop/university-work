#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;
bool done = false; 
int product = 0;

void producer(const std::vector<int>& vec1, const std::vector<int>& vec2) {
    for (size_t i = 0; i < vec1.size(); ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        product = vec1[i] * vec2[i];
        ready = true;       
        cv.notify_one();    
        cv.wait(lock, [] { return !ready; }); 
    }
   
    std::unique_lock<std::mutex> lock(mtx);
    done = true;
    cv.notify_one();
}

void consumer(int& sum) {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [] { return ready || done; }); 
        if (done && !ready) {
            break; 
        }
        sum += product;
        ready = false; 
        cv.notify_one();
    }
}

int main() {
    std::vector<int> vec1 = { 1, 2, 3, 4, 5 };
    std::vector<int> vec2 = { 6, 7, 8, 9, 10 };

    int sum = 0;

    std::thread producer_thread(producer, std::ref(vec1), std::ref(vec2));
    std::thread consumer_thread(consumer, std::ref(sum));

    producer_thread.join();
    consumer_thread.join();

    std::cout << sum << std::endl;

    return 0;
}
