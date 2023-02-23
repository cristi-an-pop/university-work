"""
Input: non-zero natural number n
Output:
1. the number of bases of the vector space nZ2
over Z2
2. the vectors of each such basis (for n ≤ 4)
"""

from itertools import permutations
import numpy as np

def generate_vectors(n):
    if n == 0:
        return [[]]
    else:
        arrays = []
        for array in generate_vectors(n - 1):
            arrays.append(array + [0])
            arrays.append(array + [1])
        return arrays

def is_basis(base):
    """
    For a matrix to be base, its determinant must be 0
    """

    # converting the base to a matrix
    matrix = []
    for vector in base:
        matrix.append(vector)
    matrix = np.array(matrix)
    return np.linalg.det(matrix) % 2 != 0


def determine_bases(n):
    if n == 0:
        return 0, []
    vectors = generate_vectors(n)
    bases = list(permutations(vectors, n))
    final_bases = []
    for base in bases:
        if is_basis(base):
            final_bases.append(base)
    if n <= 4:
        return len(final_bases), final_bases
    else:
        return len(final_bases)

if __name__ == '__main__':
    n = int(input("Enter a non-zero natural number: "))
    bases_count, bases = determine_bases(n)
    print(f"Number of bases: {bases_count}")
    if n <= 4:
        for basis in bases:
            print(basis)