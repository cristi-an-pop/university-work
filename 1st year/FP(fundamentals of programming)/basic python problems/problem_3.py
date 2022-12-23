# Solve the problem from the third set here

# Problem #3
# Generate the largest perfect number smaller than a given natural number n. If such a number does not exist,
# a message should be displayed. A number is perfect if it is equal to the sum of its divisors, except itself.
# (e.g. 6 is a perfect number, as 6=1+2+3).

def largest_smaller_perfect_number(n):
    """
    This function generates the largest perfect number smaller than the given natural number n

    A number is perfect if it is equal to the sum of its divisors, except itself (e.g.6 is a perfect number, as 6=1+2+3)
    :param n: natural number
    :return: largest perfect number smaller than n
             "Does not exist message" if such number does not exist
    """

    for i in reversed(range(n)):
        divisors_sum = 0
        for d in range(1, int(i/2) + 1):
            if i % d == 0:
                divisors_sum += d
        if divisors_sum == i and i >= 6:
            return i
    return "Does not exist!"


if __name__ == '__main__':
    number = input("Type your number and then press Enter: ")
    print(largest_smaller_perfect_number(int(number)))
