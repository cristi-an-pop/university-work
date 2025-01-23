#include <iostream>
#include <map>
#include <thread>
#include <vector>
#include <random>
#include "Inventory.h"
#include <cstdlib>
#include <ctime>

void saleOperation(Inventory& inventory, const std::map<std::string, int>& sale_items) {
    try {
        inventory.MakeSale(sale_items);
    }
    catch (const std::exception& e) {
        std::cerr << "Sale failed: " << e.what() << "\n";
    }
}

std::map<std::string, int> generateRandomSale(const std::map<std::string, std::pair<int, double>>& inventory_items) {
    std::map<std::string, int> sale;
    std::srand(static_cast<unsigned int>(std::time(nullptr)));

    for (const auto& item : inventory_items) {
        const std::string& item_name = item.first;

        int quantity = (std::rand() % 50) + 1;
        sale[item_name] = quantity;
    }

    return sale;
}

int main() {
    std::map<std::string, std::pair<int, double>> initial_inventory = {
        { "flour", { 500000, 1.0 } },
        { "banana", { 300000, 0.5 } },
        { "cereals", { 200000, 0.75 } },
    };

    Inventory inventory(initial_inventory);

    int num_threads;
    std::cout << "Enter the number of threads to run: ";
    std::cin >> num_threads;

    std::vector<std::thread> threads;

    for (int i = 0; i < num_threads; ++i) {
        std::map<std::string, int> sale_operation = generateRandomSale(initial_inventory);

        threads.emplace_back(saleOperation, std::ref(inventory), sale_operation);
    }

    for (auto& t : threads) {
        if (t.joinable()) {
            t.join();
        }
    }

    inventory.CheckInventory();

    return 0;
}
