"""
Backtracking problem:
Generate all subsequences of length 2n+1, formed only by 0, -1 or 1,
such that a1 = 0, ..., a2n+1= 0 and |ai+1 - ai| = 1 or 2, for any 1 ≤ i ≤ 2n.
-Solved both recursive and iterative

Dynamic Programming problem:
Determine the longest common subsequence of two given sequences. Subsequence elements are not required to occupy
consecutive positions. For example, if X = "MNPNQMN" and Y = "NQPMNM", the longest common subsequence has length 4,
and can be one of "NQMN", "NPMN" or "NPNM". Determine and display both the length of the longest common subsequence
as well as at least one such subsequence.
-Solved both dynamic and naive
"""


def is_subsequence_whose_consecutive_elements_subtraction_is_not_zero(subsequence, subsequence_size):
    """
    Checks if the subsequence is valid

    :param subsequence: the subsequence to be checked
    :param subsequence_size: the size of the subsequence
    :return: True if the subsequence is valid, False otherwise
    """
    for i in range(1, subsequence_size + 1):
        if abs(subsequence[i] - subsequence[i - 1]) == 0:
            return False
    if subsequence_size == len(list) - 2:
        if abs(subsequence[subsequence_size + 1] - subsequence[subsequence_size]) == 0:
            return False
    return True


def generate_all_subsequences_formed_only_by_zero_one_negative_and_one_backtracking_recursive(generated_subsequence,
                                                                                              sequence_size,
                                                                                              current_index):
    """
    Generates all subsequences of length 2n+1, formed only by 0, -1 or 1,
    such that a1 = 0, ..., a2n+1= 0 and |ai+1 - ai| = 1 or 2, for any 1 ≤ i ≤ 2n.

    :param generated_subsequence: the subsequence to be generated
    :param sequence_size: the size of the subsequence
    :param current_index: the current index of the subsequence
    :return: None
    """
    if current_index == sequence_size:
        print(generated_subsequence)
        return
    else:
        for i in range(-1, 2):
            generated_subsequence[current_index] = i
            if is_subsequence_whose_consecutive_elements_subtraction_is_not_zero(generated_subsequence, current_index):
                generate_all_subsequences_formed_only_by_zero_one_negative_and_one_backtracking_recursive(
                    generated_subsequence, sequence_size,
                    current_index + 1)
    generated_subsequence[current_index] = 0


def generate_all_subsequences_formed_only_by_zero_one_negative_and_one_backtracking_iterative(list_size):
    """
    Generates all subsequences of length 2n+1, formed only by 0, -1 or 1,
    such that a1 = 0, ..., a2n+1= 0 and |ai+1 - ai| = 1 or 2, for any 1 ≤ i ≤ 2n.

    :param list_size: the size of the subsequence
    :return: None
    """
    solution = [-1] * list_size
    solution[0] = 0
    solution[list_size - 1] = 0
    current_index = 1
    while current_index >= 1:
        if is_subsequence_whose_consecutive_elements_subtraction_is_not_zero(solution,
                                                                             current_index) and current_index < list_size - 2:
            current_index += 1
            solution[current_index] = -1
        else:
            if is_subsequence_whose_consecutive_elements_subtraction_is_not_zero(solution,
                                                                                 current_index) and current_index == list_size - 2 and \
                    solution[current_index]:
                print(solution)
            while solution[current_index] == 1:
                solution[current_index] = -1
                current_index -= 1
            if current_index < 1:
                break
            solution[current_index] += 1


def determine_longest_common_subsequence_dynamic(first_sequence, second_sequence):
    """
    Determines the longest common subsequence of two given sequences. Subsequence elements are not required to occupy
    consecutive positions. For example, if X = "MNPNQMN" and Y = "NQPMNM", the longest common subsequence has length 4,
    and can be one of "NQMN", "NPMN" or "NPNM". Determine and display both the length of the longest common subsequence
    as well as at least one such subsequence.

    :param first_sequence: the first sequence
    :param second_sequence: the second sequence
    :return: None
    """
    length_of_first_sequence = len(first_sequence)
    length_of_second_sequence = len(second_sequence)

    array_of_subsequence_length = [[0] * length_of_second_sequence for i in range(length_of_first_sequence)]

    for i in range(1, length_of_first_sequence):
        for j in range(1, length_of_second_sequence):
            if first_sequence[i] == second_sequence[j]:
                array_of_subsequence_length[i][j] = 1 + array_of_subsequence_length[i - 1][j - 1]
            else:
                array_of_subsequence_length[i][j] = max(array_of_subsequence_length[i - 1][j],
                                                        array_of_subsequence_length[i][j - 1])

    i = length_of_first_sequence - 1
    j = length_of_second_sequence - 1
    longest_common_subsequence = ''

    while i >= 1 and j >= 1:
        if first_sequence[i] == second_sequence[j]:
            longest_common_subsequence += first_sequence[i]
            i -= 1
            j -= 1
        else:
            if (array_of_subsequence_length[i - 1][j] > array_of_subsequence_length[i][j - 1]):
                i -= 1
            else:
                j -= 1

    longest_common_subsequence = longest_common_subsequence[::-1]

    print(longest_common_subsequence,
          array_of_subsequence_length[length_of_first_sequence - 1][length_of_second_sequence - 1])


def determine_longest_common_subsequence_naive(sequence_a, sequence_b, current_index_of_sequence_a,
                                               current_index_of_sequence_b):
    """
    Determines the longest common subsequence of two given sequences. Subsequence elements are not required to occupy
    consecutive positions. For example, if X = "MNPNQMN" and Y = "NQPMNM", the longest common subsequence has length 4,
    and can be one of "NQMN", "NPMN" or "NPNM". Determine and display both the length of the longest common subsequence
    as well as at least one such subsequence.

    :param sequence_a: the first sequence
    :param sequence_b: the second sequence
    :param current_index_of_sequence_a: the current index of the first sequence
    :param current_index_of_sequence_b: the current index of the second sequence
    :return: the length of the longest common subsequence
    """
    if current_index_of_sequence_a == -1 or current_index_of_sequence_b == -1:
        return ''
    if sequence_a[current_index_of_sequence_a] == sequence_b[current_index_of_sequence_b]:
        return sequence_a[current_index_of_sequence_a] + determine_longest_common_subsequence_naive(sequence_a,
                                                                                                    sequence_b,
                                                                                                    current_index_of_sequence_a - 1,
                                                                                                    current_index_of_sequence_b - 1)
    return max(determine_longest_common_subsequence_naive(sequence_a, sequence_b, current_index_of_sequence_a - 1,
                                                          current_index_of_sequence_b),
               determine_longest_common_subsequence_naive(sequence_a, sequence_b, current_index_of_sequence_a,
                                                          current_index_of_sequence_b - 1))


if __name__ == '__main__':
    while True:
        print("<<MENU>>")
        print("Choose Problem Solving Method")
        print("1. Backtracking")
        print("2. Dynamic Programming")
        problem_solving_method_option = input("> ")
        if problem_solving_method_option == '1':
            list_size = int(input("List Size: "))
            list_size = list_size * 2 + 1
            list = [0] * list_size
            print("Choose Backtracking method: ")
            print("1. Recursive")
            print("2. Iterative")
            backtracking_method_option = input("> ")
            if backtracking_method_option == '1':
                generate_all_subsequences_formed_only_by_zero_one_negative_and_one_backtracking_recursive(list,
                                                                                                          list_size - 1,
                                                                                                          1)
            elif backtracking_method_option == '2':
                generate_all_subsequences_formed_only_by_zero_one_negative_and_one_backtracking_iterative(list_size)
            else:
                print("Invalid Option")
        elif problem_solving_method_option == '2':
            first_sequence = input("Type the first sequence: ")
            second_sequence = input("Type the second sequence: ")
            print("Choose method: ")
            print("1. Naive")
            print("2. Dynamic")
            problem_solving_method_option = input("> ")
            if problem_solving_method_option == '1':
                lcs = determine_longest_common_subsequence_naive(first_sequence, second_sequence,
                                                                 len(first_sequence) - 1,
                                                                 len(second_sequence) - 1)
                print(lcs[::-1], len(lcs))
            elif problem_solving_method_option == '2':
                first_sequence = '0' + first_sequence
                second_sequence = '0' + second_sequence
                determine_longest_common_subsequence_dynamic(first_sequence, second_sequence)
            else:
                print("Invalid Option")
        else:
            print("Invalid Option!")
