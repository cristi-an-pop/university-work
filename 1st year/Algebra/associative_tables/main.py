from itertools import product
import numpy as np


def is_associative(table):
    """
    Input: operation table
    Output: True if the operation is associative, False otherwise
    """
    for i in range(len(table)):
        for j in range(len(table)):
            for k in range(len(table)):
                if table[table[i][j]][k] != table[i][table[j][k]]:
                    return False
    return True


def generate_associative_operations(n):
    """
     Input: non-zero natural number n
     Output:
    1. the number of associative operations on a set A = {a1, . . . , an}
    2. the operation table of each associative operation (for n ≤ 4)
    """
    num_operations = 0

    elements = []
    for i in range(n):
        elements.append(i)
    # Generate all possible arrays with elements from the set
    arrays = list(product(elements, repeat=len(elements)))

    # Generate all possible operation tables
    operation_tables = list(product(arrays, repeat=n))
    for table in operation_tables:
        if is_associative(table): # Check if the operation table is associative
            num_operations += 1
            if n <= 4:
                associative_table = np.matrix(table)
                print(associative_table)

    print("Number of associative operations:", num_operations)

if __name__ == "__main__":
    set_size = int(input("Enter the size of the set: "))
    generate_associative_operations(set_size)
