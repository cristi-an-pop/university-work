"""
Implement a menu-driven console application to help visualize the way sorting algorithms work.
You will be given two of the algorithms from the list below to implement (one from each set).
When started, the program will print a menu with the following options:

Generate a list of n random natural numbers. Generated numbers must be between 0 and 100.
Sort the list using the first algorithm. (Permutation Sort)
Sort the list using the second algorithm. (Comb Sort)
Exit the program
"""

import random


def permutation_sort(list, steps_until_display):
    """
    This function sorts a list using the Permutation method (Bogo Sort)


    :param list: list of natural numbers
    :param steps_until_display: natural number
    :return: sorted list
    """
    step_counter = 0
    while not is_sorted(list):
        step_counter += 1
        if step_counter == steps_until_display:
            print(list)
            step_counter = 0
        shuffle(list)
    return list


def is_sorted(list):
    """
    This function checks if a function is sorted or not

    :param list: list of natural numbers
    :return: True if the list is sorted
             False if the list is not sorted
    """
    list_length = len(list)
    for i in range(0, list_length - 1):
        if list[i] > list[i + 1]:
            return False
    return True


def shuffle(list_to_be_shuffled):
    """
    This function randomly permutes every element of the given list

    :param list_to_be_shuffled: list of natural numbers
    :return:
    """
    list_length = len(list_to_be_shuffled)
    for i in range(0, list_length):
        r = random.randint(0, list_length - 1)
        list_to_be_shuffled[i], list_to_be_shuffled[r] = list_to_be_shuffled[r], list_to_be_shuffled[i]


def get_next_gap(comb_sort_gap):
    """
    This function generates the suitable gap for the comb sort based on the previous gap (dividing the previous gap by
    1.3)

    :param comb_sort_gap: natural number
    :return: natural number
    """
    comb_sort_gap = (comb_sort_gap * 10) // 13
    if comb_sort_gap < 1:
        return 1
    return comb_sort_gap


def comb_sort(list, steps_until_display):
    """
    This function sorts a list using Comb algorithm of sortation

    :param list: list of natural numbers
    :param steps_until_display: natural number
    :return: sorted list of natural numbers
    """
    step_counter = 0
    list_length = len(list)
    gap = list_length
    swapped = True
    while gap != 1 or swapped:
        step_counter += 1
        gap = get_next_gap(gap)
        swapped = False
        if step_counter == steps_until_display:
            print(list)
            step_counter = 0
        for i in range(0, list_length - gap):
            if list[i] > list[i + gap]:
                list[i], list[i + gap] = list[i + gap], list[i]
                swapped = True
    return list


def random_list_generator(list_to_be_generated, size_of_list):
    """
    This function generates a list made of random elements of the given size

    :param list_to_be_generated: empty list
    :param size_of_list: natural number
    :return: random list of [size_of_list] elements
    """
    for i in range(0, size_of_list):
        list_element = random.randint(1, 100)
        list_to_be_generated.append(list_element)


def start():
    while True:
        print("<<<MENU>>>")
        list_size = input("Enter the size of the list: ")
        random_elements_list = []
        random_list_generator(random_elements_list, int(list_size))
        print(random_elements_list)
        print("1. Permutation Sort")
        print("2. Comb Sort")
        print("0. Exit")

        opt = input(">")
        if opt == "1":
            step = input("Enter step value: ")
            print(permutation_sort(random_elements_list, int(step)))
        elif opt == "2":
            step = input("Enter step value: ")
            print(comb_sort(random_elements_list, int(step)))
        elif opt == "0":
            return
        else:
            print("Invalid option!")


start()
