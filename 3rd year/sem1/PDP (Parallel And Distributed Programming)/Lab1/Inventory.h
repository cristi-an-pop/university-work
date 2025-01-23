#pragma once
#include <string>
#include <map>
#include "Product.h"
#include <vector>
#include "Bill.h"

class Inventory {
public:
	Inventory(const std::map<std::string, std::pair<int, double>>& initial_inventory);
	~Inventory();
	void MakeSale(const std::map<std::string, int>& saleItems);
	void CheckInventory();

private:
	Product* getProduct(const std::string& name);
	std::map<std::string, Product*> products;
	std::vector<Bill> sales;
	std::mutex salesMutex;
	std::mutex moneyMutex;
	double totalMoney = 0;
};