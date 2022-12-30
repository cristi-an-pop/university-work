"""
Implement a menu-driven console application that provides the following functionalities:

1. Read a list of complex numbers (in z = a + bi form) from the console.
2. Display the entire list of numbers on the console.
3. Display on the console the sequence, subarray or numbers required by the properties that were assigned to you.
Each student will receive one property from A and another one from B.
4. Exit the application.

A. Length and elements of a longest subarray of numbers where their real part is in the form of a mountain
B. The length and elements of a longest alternating subsequence, when considering each number's real part
"""


#
# Write below this comment
# Functions to deal with complex numbers -- list representation
# -> There should be no print or input statements in this section
# -> Each function should do one thing only
# -> Functions communicate using input parameters and their return values
#

def stringify_complex_number(complex_number):
    """
    Converts a complex number to a string.

    :param complex_number: The complex number to be converted
    :return: The string representation of the complex number
    """
    real_part = str(complex_number[0])
    imaginary_part = str(complex_number[1]) + 'i'
    if complex_number[1] >= 0:
        return real_part + '+' + imaginary_part
    else:
        return real_part + imaginary_part


#
# Write below this comment
# Functions to deal with complex numbers -- dict representation
# -> There should be no print or input statements in this section
# -> Each function should do one thing only
# -> Functions communicate using input parameters and their return values
#

def determine_longest_mountain_subarray(complex_numbers_array):
    """
    Determines the longest alternating subsequence, when considering each number's real part.

    :param complex_numbers_array: The array of complex numbers
    :return: The start and end index of the longest subarray
    """
    max_length_of_subarray = 0
    longest_subarray = []
    start_max = 0
    end_max = 0

    for start in range(0, len(complex_numbers_array) - 3):
        for end in range(2, len(complex_numbers_array) + 1):
            if is_mountain_array(complex_numbers_array[start:end]):
                if len(complex_numbers_array[start:end]) > max_length_of_subarray:
                    longest_subarray = complex_numbers_array[start:end]
                    start_max = start
                    end_max = end
                    max_length_of_subarray = len(longest_subarray)

    return longest_subarray, start_max, end_max


def determine_longest_alternating_subarray(complex_numbers_array):
    """
    Determines the longest alternating subarray of complex numbers where their real part is in the form of a mountain.

    :param complex_numbers_array: The array of complex numbers
    :return: The start and end index of the longest subarray
    """
    if len(complex_numbers_array) <= 1:
        return len(complex_numbers_array)

    length_of_alternating_subsequences_table = [[0] * 2 for i in range(len(complex_numbers_array))]
    max_length = 0
    end_index_of_longest_subsequence = 0

    for i in range(0, len(complex_numbers_array)):
        for j in range(i):
            if complex_numbers_array[i] > complex_numbers_array[j]:
                length_of_alternating_subsequences_table[i][0] = max(length_of_alternating_subsequences_table[i][0],
                                                                     length_of_alternating_subsequences_table[j][1] + 1)
            if complex_numbers_array[i] < complex_numbers_array[j]:
                length_of_alternating_subsequences_table[i][1] = max(length_of_alternating_subsequences_table[i][1],
                                                                     length_of_alternating_subsequences_table[j][0] + 1)
            line_max_value = max(length_of_alternating_subsequences_table[i][0],
                                 length_of_alternating_subsequences_table[i][1])
            if max_length < line_max_value:
                end_index_of_longest_subsequence = i
                max_length = line_max_value

    return end_index_of_longest_subsequence - max_length + 1, end_index_of_longest_subsequence + 1


#
# Write below this comment
# Functions that deal with subarray/subsequence properties
# -> There should be no print or input statements in this section
# -> Each function should do one thing only
# -> Functions communicate using input parameters and their return values
#

def is_mountain_array(array):
    """
    Determines if the given array is a mountain array.

    :param array: The array to be checked
    :return: True if the array is a mountain array, False otherwise
    """
    if len(array) < 3:
        return False
    i = 0
    for i in range(1, len(array)):
        if array[i] <= array[i - 1]:
            break

    if i == len(array) or i == 1:
        return False

    while i < len(array):
        if array[i] >= array[i - 1]:
            break
        i += 1
    return i == len(array)


#
# Write below this comment
# UI section
# Write all functions that have input or print statements here
# Ideally, this section should not contain any calculations relevant to program functionalities
#

def read_complex_number():
    """
    Reads a complex number from the console.

    :return: The complex number
    """
    complex_number = input("Type complex number: ")
    complex_number = complex_number.partition("+")
    real_part_of_complex_number = int(complex_number[0])
    temporary_imaginary_part = complex_number[2].partition("i")
    imaginary_part_of_complex_number = int(temporary_imaginary_part[0])
    return real_part_of_complex_number, imaginary_part_of_complex_number


def display_complex_number(complex_numbers_array_element):
    """
    Displays a complex number on the console.

    :param complex_numbers_array_element: The complex number to be displayed
    """
    string_of_complex_number = stringify_complex_number(complex_numbers_array_element)
    print(string_of_complex_number)


def update_dictionary_of_complex_numbers(complex_numbers_array):
    """
    Updates the dictionary of complex numbers.

    :param complex_numbers_array: The array of complex numbers
    """
    complex_numbers_dictionary = {
        "real": [],
        "imaginary": []
    }
    for complex_number in complex_numbers_array:
        complex_numbers_dictionary["real"].append(complex_number[0])
        complex_numbers_dictionary["imaginary"].append(complex_number[1])

    return complex_numbers_dictionary


if __name__ == "__main__":
    array_of_complex_numbers = [(1, 2), (3, -4), (10, 12), (15, 16), (3, 5), (1, 2), (8, 9), (2, 9), (5, 5), (7, 9)]
    dictionary_of_complex_numbers = update_dictionary_of_complex_numbers(array_of_complex_numbers)
    print(dictionary_of_complex_numbers)
    while True:
        print("1. Read a list of complex numbers")
        print("2. Display the list of complex numbers")
        print("3. Length and elements of the longest mountain subarray")
        print("4. Length and elements of the longest alternating subsequence (considering each number's real part)")
        print("5. Exit")
        menu_option = int(input("> "))
        match menu_option:
            case 1:
                array_of_complex_numbers = []
                size_of_array = int(input("Type the size of the array: "))
                for i in range(size_of_array):
                    array_of_complex_numbers.append(read_complex_number())
                dictionary_of_complex_numbers = update_dictionary_of_complex_numbers(array_of_complex_numbers)
            case 2:
                for element in array_of_complex_numbers:
                    display_complex_number(element)
            case 3:
                longest_mountain_subarray_of_real_numbers, start_index, end_index = determine_longest_mountain_subarray(
                    dictionary_of_complex_numbers["real"])
                print(longest_mountain_subarray_of_real_numbers)
                longest_mountain_subarray_of_real_numbers = []
                for i in range(start_index, end_index):
                    longest_mountain_subarray_of_real_numbers.append(
                        (dictionary_of_complex_numbers["real"][i], dictionary_of_complex_numbers["imaginary"][i]))
                for element in longest_mountain_subarray_of_real_numbers:
                    display_complex_number(element)
            case 4:
                start_index, end_index = determine_longest_alternating_subarray(dictionary_of_complex_numbers["real"])
                longest_alternating_subarray_of_real_numbers = []
                for i in range(start_index, end_index):
                    longest_alternating_subarray_of_real_numbers.append(
                        (dictionary_of_complex_numbers["real"][i], dictionary_of_complex_numbers["imaginary"][i]))
                for element in longest_alternating_subarray_of_real_numbers:
                    display_complex_number(element)
                print("Length: ", end_index - start_index)
            case 5:
                break
