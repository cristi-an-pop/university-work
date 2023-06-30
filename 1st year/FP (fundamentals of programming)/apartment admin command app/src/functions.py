#
# The program's functions are implemented here. There is no user interaction in this file, therefore no input/print statements. Functions here
# communicate via function parameters, the return statement and raising of exceptions.
#
import random


def create_apartment(number_of_apartment):
    expenses_dictionary = {
        "water": 0,
        "heating": 0,
        "electricity": 0,
        "gas": 0,
        "other": 0
    }
    return {
        number_of_apartment: expenses_dictionary
    }


def randomly_generated_apartments():
    """
    Randomly generates 10 apartments with expenses

    :return: array of 10 apartments with expenses
    """
    expense_type = ["water", "heating", "electricity", "gas", "other"]
    list_of_apartments = []
    for i in range(10):
        apartment = create_apartment(i)
        for j in range(random.randint(0, 5)):
            apartment[i][expense_type[j]] = random.randint(10, 300)
        list_of_apartments.append(apartment)

    return list_of_apartments


def is_apartment(all_apartments, number_of_apartment):
    index_of_apartment = 0
    for apartment in all_apartments:
        if list(apartment.keys())[0] == number_of_apartment:
            return True, index_of_apartment
        index_of_apartment += 1
    return False


# Add new transaction

def add_transaction_to_apartment(all_apartments, apartment_number, expense_type, expense_price):
    try:
        if is_apartment(all_apartments, apartment_number):
            boolean, index_of_apartment = is_apartment(all_apartments, apartment_number)
            all_apartments[index_of_apartment][apartment_number][expense_type] = expense_price
        else:
            new_apartment = create_apartment(apartment_number)
            new_apartment[apartment_number][expense_type] = expense_price
            all_apartments.append(new_apartment)
    except ValueError as ve:
        print("Invalid input!", ve)


# Modify expenses

def remove_all_expenses_of_apartment(all_apartments, apartment_number):
    if is_apartment(all_apartments, apartment_number):
        boolean, index_of_apartment = is_apartment(all_apartments, apartment_number)
        expense_type = ["water", "heating", "electricity", "gas", "other"]
        for expense in expense_type:
            all_apartments[index_of_apartment][apartment_number][expense] = 0
    else:
        print("This apartment does not exist")


def remove_all_expenses_for_apartments_between(all_apartments, start_apartment, end_apartment):
    if is_apartment(all_apartments, start_apartment) and is_apartment(all_apartments, end_apartment):
        for apartment_number in range(start_apartment, end_apartment + 1):
            remove_all_expenses_of_apartment(all_apartments, apartment_number)
    else:
        print("These apartments do not exist")


def remove_expense_from_all_apartments(all_apartments, expense):
    for apartment in all_apartments:
        apartment_number = list(apartment.keys())[0]
        apartment[apartment_number][expense] = 0


def update_expense_price_of_apartment(all_apartments, apartment_number, expense, new_price_of_expense):
    if is_apartment(all_apartments, apartment_number):
        boolean, index_of_apartment = is_apartment(all_apartments, apartment_number)
        all_apartments[index_of_apartment][apartment_number][expense] = new_price_of_expense
    else:
        print("This apartment does not exist")


# Display expenses having different properties

def display_all_expenses(all_apartments):
    expense_type = ["water", "heating", "electricity", "gas", "other"]
    for apartment in all_apartments:
        apartment_number = list(apartment.keys())[0]
        print("#####")
        print("Apartment", apartment_number)
        for expense in expense_type:
            if apartment[apartment_number][expense] != 0:
                print(expense, apartment[apartment_number][expense])
        print("#####")


def display_all_expenses_for_apartment(all_apartments, apartment_number):
    if is_apartment(all_apartments, apartment_number):
        expense_type = ["water", "heating", "electricity", "gas", "other"]
        boolean, index_of_apartment = is_apartment(all_apartments, apartment_number)
        for expense in expense_type:
            if all_apartments[index_of_apartment][apartment_number][expense] != 0:
                print(expense, all_apartments[index_of_apartment][apartment_number][expense])
    else:
        print("This apartment does not exist")


def sum_of_expenses(apartment):
    expense_type = ["water", "heating", "electricity", "gas", "other"]
    apartment_number = list(apartment.keys())[0]
    sum_expenses = 0
    for expense in expense_type:
        sum_expenses += apartment[apartment_number][expense]
    return sum_expenses


def display_all_expenses_less_equal_greater(all_apartments, sign, expense_price):
    match sign:
        case "<":
            for apartment in all_apartments:
                total_expenses = sum_of_expenses(apartment)
                if total_expenses < expense_price:
                    print(apartment)
        case "=":
            for apartment in all_apartments:
                total_expenses = sum_of_expenses(apartment)
                if total_expenses == expense_price:
                    print(apartment)
        case ">":
            for apartment in all_apartments:
                total_expenses = sum_of_expenses(apartment)
                if total_expenses > expense_price:
                    print(apartment)


# Filter
def keep_only_one_expense(all_apartments, expense_to_keep):
    expense_type = ["water", "heating", "electricity", "gas", "other"]
    for apartment in all_apartments:
        apartment_number = list(apartment.keys())[0]
        for expense in expense_type:
            if expense != expense_to_keep:
                apartment[apartment_number][expense] = 0


def keep_only_expense_having_an_amount_of_money_smaller(all_apartments, amount_of_money):
    expense_type = ["water", "heating", "electricity", "gas", "other"]
    for apartment in all_apartments:
        apartment_number = list(apartment.keys())[0]
        for expense in expense_type:
            if apartment[apartment_number][expense] >= amount_of_money:
                apartment[apartment_number][expense] = 0


# Test Functions


def test_add_transaction_to_apartment():
    test_list = randomly_generated_apartments()

    add_transaction_to_apartment(test_list, 20, "water", 100)

    assert test_list[10][20]["water"]


def test_remove_all_expenses_of_apartment():
    test_list = randomly_generated_apartments()

    remove_all_expenses_of_apartment(test_list, 0)

    assert test_list[0][0]["water"] == 0


def test_remove_all_expenses_for_apartments_between():
    test_list = randomly_generated_apartments()

    remove_all_expenses_for_apartments_between(test_list, 0, 2)

    assert test_list[1][1]["gas"] == 0


def test_remove_expense_from_all_apartments():
    test_list = randomly_generated_apartments()

    remove_expense_from_all_apartments(test_list, "water")

    assert test_list[0][0]["water"] == 0


def test_update_expense_price_of_apartment():
    test_list = randomly_generated_apartments()

    update_expense_price_of_apartment(test_list, 0, "water", 50)

    assert test_list[0][0]["water"] == 50