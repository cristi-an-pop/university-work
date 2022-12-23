# Solve the problem from the first set here

# Problem #1
# Generate the first prime number larger than a given natural number n

import math


def is_prime(number_to_be_checked):
    """
    This function checks if a number is prime or not

    :param number_to_be_checked: natural number
    :return: True if n is a prime number
             False
    """

    if number_to_be_checked < 2:
        return False
    if number_to_be_checked % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(number_to_be_checked)) + 1, 2):
        if number_to_be_checked % i == 0:
            return False
    return True


def first_larger_prime(number):
    """
    This function generates the first prime number larger than the given number

    This function generates the first prime number larger than the given [number] where [number] is a natural number
    :param number: natural number
    :return: the first prime number larger than n
    """

    while True:
        number = number + 1
        if is_prime(number):
            return number


if __name__ == '__main__':
    num = input("Type a number and then press Enter: ")
    print(first_larger_prime(int(num)))
