#include "Inventory.h"
#include <iostream>
#include <algorithm>

Inventory::Inventory(const std::map<std::string, std::pair<int, double>>& initial_inventory) {
    for (const auto& item : initial_inventory) {
        const std::string& productName = item.first;
        int quantity = item.second.first;
        double price = item.second.second;
        this->products[productName] = new Product(productName, quantity, price);
    }
}

Inventory::~Inventory() {
    for (auto& item : this->products) {
        delete item.second;
    }
}

void Inventory::MakeSale(const std::map<std::string, int>& saleItems) {
    Bill bill;
    double totalSaleAmount = 0;

    std::vector<std::string> productNames;
    for (const auto& item : saleItems) {
        productNames.push_back(item.first);
    }
    std::sort(productNames.begin(), productNames.end());

    std::vector<std::unique_lock<std::mutex>> productLocks;
    for (const auto& productName : productNames) {
        Product* product = getProduct(productName);
        product->DecreaseQuantity(saleItems.at(productName));
        double itemPrice = product->getPrice();
        bill.addItem(productName, saleItems.at(productName), itemPrice);
        totalSaleAmount += itemPrice * saleItems.at(productName);
    }

    {
        std::lock_guard<std::mutex> lock(moneyMutex);
        this->totalMoney += totalSaleAmount;
    }

    {
        std::lock_guard<std::mutex> lock(salesMutex);
        this->sales.push_back(bill);
    }
}

void Inventory::CheckInventory() {
    double calculatedTotalMoney = 0;
    std::map<std::string, int> productSales;

    for (const auto& product : this->products) {
        const std::string productName = product.first;
        productSales[productName] = 0;
    }

    {
        std::lock_guard<std::mutex> lock(salesMutex);
        for (auto& bill : this->sales) {
            const auto& billItems = bill.getItems();
            for (const auto& item : billItems) {
                const std::string productName = std::get<0>(item);
                const int quantity = std::get<1>(item);
                const double price = std::get<2>(item);
               
                productSales[productName] += quantity;
                calculatedTotalMoney += quantity * price;
            }
        }
    }

    for (const auto& product : this->products) {
        int soldQuantity = productSales[product.first];
        int currentQuantity = product.second->getQuantity();
        std::cout << product.first <<  ": Sold stock - " << soldQuantity << ", Current stock - " << currentQuantity << "\n";
    }

    {
        std::lock_guard<std::mutex> lock(moneyMutex);
        if (calculatedTotalMoney != totalMoney) {
            std::cout << "Discrepancy in total money: expected $" << calculatedTotalMoney
                << ", actual $" << totalMoney << "\n";
        }
        else {
            std::cout << "Inventory and money are consistent.\n";
        }
    }

}

Product* Inventory::getProduct(const std::string& name) {
    if (this->products.find(name) == this->products.end()) {
        throw std::runtime_error("Products not found: " + name);
    }
    return this->products[name];
}
