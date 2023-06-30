"""
Calculate the complexity of the sorting algorithms
"""

import random
import timeit

def permutation_sort(list):
    """
    This function sorts a list using the Permutation method (Bogo Sort)


    :param list: list of natural numbers
    :return: sorted list
    """
    while not is_sorted(list):
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
        random_index = random.randint(0, list_length - 1)
        list_to_be_shuffled[i], list_to_be_shuffled[random_index] = list_to_be_shuffled[random_index], \
                                                                    list_to_be_shuffled[i]


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


def comb_sort(list):
    """
    This function sorts a list using Comb Sort algorithm

    :param list: list of natural numbers
    :return: sorted list of natural numbers
    """
    if is_sorted(list):
         return list
    list_length = len(list)
    gap = list_length
    swapped = True
    while gap != 1 or swapped:
        gap = get_next_gap(gap)
        swapped = False
        for i in range(0, list_length - gap):
            if list[i] > list[i + gap]:
                list[i], list[i + gap] = list[i + gap], list[i]
                swapped = True
    return list


def best_case_list_generator(sort_option, list_size):
    """
    This function generates a list made of random elements for the given option
    1-Permutation Sort
    2-Comb Sort

    :param sort_option: natural number
    :param list_size: natural number, size of list
    :return: list
    """
    best_case_list = []
    if sort_option == 1 or sort_option == 2:
        for i in range(0, list_size):
            best_case_list.append(i)

    return best_case_list


def reverse_sorted_list_generator(list_size):
    """
    This function generates a reverse sorted list

    :param list_size: natural number
    :return: reverse sorted list
    """

    reverse_sorted_list = []
    for i in reversed(range(0, list_size)):
        reverse_sorted_list.append(i)

    return reverse_sorted_list


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
        best_case_list = []
        average_case_list = []
        worst_case_list = []
        print("<<<MENU>>>")
        print("1. Permutation Sort")
        print("2. Comb Sort")
        print("0. Exit")

        sort_opt = input(">")
        if sort_opt == "1":
            print("Choose the case scenario:")
            print("1. Best Case O(n)")
            print("2. Average Case O((n-1)*n!)")

            case_opt = input(">")
            if case_opt == "1":
                list_size = 5
                print("List Size     Time")
                for i in range(0, 5):
                    best_case_list = best_case_list_generator(int(sort_opt), list_size)
                    print(list_size, " | ", timeit.timeit(lambda: permutation_sort(best_case_list)))
                    list_size *= 2
            elif case_opt == "2":
                list_size = 2
                print("List Size     Time")
                for i in range(0, 5):
                    random_list_generator(average_case_list, list_size)
                    print(list_size, " | ", timeit.timeit(lambda: permutation_sort(average_case_list)))
                    list_size += 2
            else:
                print("Invalid option!")
        elif sort_opt == "2":
            print("Choose the case scenario:")
            print("1. Best Case O(nlog(n))")
            print("2. Average Case O(n^2/2^gs)")
            print("3. Worst Case O(n^2)")

            case_opt = input(">")
            if case_opt == "1":
                list_size = 100
                print("List Size     Time")
                for i in range(0, 5):
                    best_case_list = best_case_list_generator(int(sort_opt), list_size)
                    t1_start = timeit.default_timer()
                    # print(list_size, " | ", timeit.timeit(lambda: comb_sort(best_case_list)))
                    comb_sort(best_case_list)
                    t1_stop = timeit.default_timer() - t1_start
                    print(list_size, " | ",  t1_stop)
                    list_size *= 2
            elif case_opt == "2":
                list_size = 10
                print("List Size     Time")
                for i in range(0, 5):
                    random_list_generator(average_case_list, list_size)
                    print(list_size, " | ", timeit.timeit(lambda: comb_sort(best_case_list)))
                    list_size *= 2
            elif case_opt == "3":
                list_size = 10
                print("List Size     Time")
                for i in range(0, 5):
                    worst_case_list = reverse_sorted_list_generator(list_size)
                    print(list_size, " | ", timeit.timeit(lambda: comb_sort(worst_case_list)))
                    list_size *= 2
            else:
                print("Invalid option!")
        elif sort_opt == "0":
            return
        else:
            print("Invalid option!")


start()
