#include "Product.h"

Product::Product(std::string name, int quantity, double price) : name(name), quantity(quantity), price(price) {}

std::string Product::getName() const { return this->name; }

double Product::getPrice() const { return this->price; }

int Product::getQuantity() { 
	std::lock_guard<std::mutex> lock(this->mutex);
	return this->quantity; 
}

void Product::DecreaseQuantity(int amount) {
	std::lock_guard<std::mutex> lock(this->mutex);
	if (this->quantity < amount) {
		throw std::runtime_error("Not enough " + name + " in stock.");
	}
	this->quantity -= amount;
}
