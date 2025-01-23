#pragma once
#include <string>
#include <mutex>

class Product {
public:
	Product(std::string name, int quantity, double price);
	std::string getName() const;
	double getPrice() const;
	int getQuantity();
	void DecreaseQuantity(int amount);
private:
	std::string name;
	int quantity;
	double price;
	std::mutex mutex;
};