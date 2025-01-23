#pragma once
#include <string>
#include <tuple>
#include <vector>

class Bill {
public:
    // Add an item to the bill
    void addItem(const std::string& product, int quantity, double price);

    // Get the total price of the bill
    double getTotalPrice() const;

    // Print the bill (for debugging)
    void Print() const;

    std::vector<std::tuple<std::string, int, double>> getItems();

private:
    std::vector<std::tuple<std::string, int, double>> items;
    double totalPrice = 0;
};