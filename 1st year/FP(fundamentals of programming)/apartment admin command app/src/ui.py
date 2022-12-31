#
# This is the program's UI module. The user interface and all interaction with the user (print and input statements) are found here
#
import copy

import functions


def read_command():
    command = input("> ")
    pos = command.find(" ")
    if pos == -1:
        return command, []
    option_read = command[:pos]
    command_arguments = command[pos + 1:]
    command_arguments = command_arguments.split(" ")
    command_arguments = [s.strip() for s in command_arguments]
    return option_read, command_arguments


def print_options(commands):
    print(*list(commands.keys()), " ")


def add_transaction(apartments_log, all_apartments, *command_arguments):
    try:
        if len(command_arguments) == 3:
            apartment_number = int(command_arguments[0])
            type_of_expense = command_arguments[1]
            expense_price = int(command_arguments[2])
            functions.add_transaction_to_apartment(all_apartments, apartment_number, type_of_expense, expense_price)
            apartments_log.append(copy.deepcopy(all_apartments))
    except ValueError as ve:
        print("Invalid input", ve)


def remove_command_handler(apartments_log, all_apartments, *command_arguments):
    try:
        match len(command_arguments):
            case 1:
                if command_arguments[0].isnumeric():
                    try:
                        apartment_number = int(command_arguments[0])
                        functions.remove_all_expenses_of_apartment(all_apartments, apartment_number)
                        apartments_log.append(copy.deepcopy(all_apartments))
                        print(apartments_log)
                    except ValueError as ve:
                        print("Invalid input", ve)
                else:
                    try:
                        expense_to_be_removed = command_arguments[0]
                        functions.remove_expense_from_all_apartments(all_apartments,
                                                                     expense_to_be_removed)
                        apartments_log.append(copy.deepcopy(all_apartments))
                    except ValueError as ve:
                        print("Invalid input", ve)
            case 3:
                try:
                    start_apartment = int(command_arguments[0])
                    end_apartment = int(command_arguments[2])
                    functions.remove_all_expenses_for_apartments_between(all_apartments,
                                                                         start_apartment, end_apartment)
                    apartments_log.append(copy.deepcopy(all_apartments))
                except ValueError as ve:
                    print("Invalid input", ve)
    except ValueError as ve:
        print("Invalid input", ve)


def replace_command_handler(apartments_log, all_apartments, *command_arguments):
    try:
        if len(command_arguments) == 4:
            try:
                apartment_number = int(command_arguments[0])
                expense = command_arguments[1]
                expense_amount = command_arguments[3]
                functions.update_expense_price_of_apartment(all_apartments, apartment_number, expense, expense_amount)
                apartments_log.append(copy.deepcopy(all_apartments))
            except ValueError as ve:
                print("Invalid input", ve)
        else:
            print("This command takes 4 arguments")
    except ValueError as ve:
        print("Invalid input", ve)


def list_command_handler(apartments_log, all_apartments, *command_arguments):
    match len(command_arguments):
        case 0:
            print(apartments_log)
            functions.display_all_expenses(all_apartments)
        case 1:
            try:
                apartment_number = int(command_arguments[0])
                functions.display_all_expenses_for_apartment(all_apartments, apartment_number)
            except ValueError as ve:
                print("Invalid input", ve)
        case 2:
            try:
                sign = command_arguments[0]
                expense_price = int(command_arguments[1])
                functions.display_all_expenses_less_equal_greater(all_apartments, sign, expense_price)
            except ValueError as ve:
                print("Invalid input", ve)


def filter_command_handler(apartments_log, all_apartments, *command_arguments):
    try:
        if command_arguments[0].isnumeric():
            amount_of_money = int(command_arguments[0])
            functions.keep_only_expense_having_an_amount_of_money_smaller(all_apartments,
                                                                          amount_of_money)
            apartments_log.append(copy.deepcopy(all_apartments))
        else:
            expense_type = command_arguments[0]
            functions.keep_only_one_expense(all_apartments, expense_type)
            apartments_log.append(copy.deepcopy(all_apartments))
    except ValueError as ve:
        print("Invalid input", ve)


def undo(apartments_log, all_apartments, *command_arguments):
    try:
        if command_arguments:
            print("This command does not take arguments")
        else:
            if len(apartments_log) > 1:
                apartments_log.pop()
                all_apartments.clear()
                all_apartments.extend(apartments_log[-1])
            else:
                print("There is nothing to undo")
    except ValueError as ve:
        print("Invalid input", ve)


def run_console():
    apartments_log = []
    commands = {
        "add": add_transaction,
        "remove": remove_command_handler,
        "replace": replace_command_handler,
        "list": list_command_handler,
        "filter": filter_command_handler,
        "undo": undo
    }
    all_apartments = functions.randomly_generated_apartments()
    apartments_log.append(copy.deepcopy(all_apartments))
    while True:
        print_options(commands)
        option_read, command_arguments = read_command()
        if option_read == "exit":
            break

        try:
            commands[option_read](apartments_log, all_apartments, *command_arguments)
        except KeyError as ke:
            print("Invalid option!", ke)
