#include "Bill.h"
#include <iostream>

void Bill::addItem(const std::string& product, int quantity, double price) {
	this->items.push_back(std::make_tuple(product, quantity, price));
	this->totalPrice += quantity * price;
}

double Bill::getTotalPrice() const {
	return this->totalPrice;
}

void Bill::Print() const {
    for (const auto& item : this->items) {
        std::cout << std::get<0>(item) << " -" << std::get<1>(item)
            << " @ $" << std::get<2>(item) << " each\n";
    }
    std::cout << "Total: $" << this->totalPrice << "\n";
}

std::vector<std::tuple<std::string, int, double>> Bill::getItems() {
    return this->items;
}