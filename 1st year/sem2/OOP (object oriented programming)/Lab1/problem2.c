//Given a vector of numbers, find the longest increasing contiguous subsequence, such the sum of that any 2 consecutive elements is a prime number.

#include <stdio.h>
#include <stdbool.h>

bool is_prime(int n) {
	if (n < 2) {
		return false;
	}
	if (n == 2) {
		return true;
	}
	if (n > 2 && n % 2 == 0) {
		return false;
	}
	for (int d = 3; d * d <= n; d += 2) {
		if (n % d == 0) {
			return false;
		}
	}
	return true;
}

void longest_increasing_subsequence(int n, int* arr, int* start, int* end) {

	int max_length = 0;
	int length = 1;
	for (int i = 1; i < n; i++) {
		if (is_prime(arr[i] + arr[i - 1]) && arr[i] > arr[i-1]) {
			length++;
		}
		else {
			if (length > max_length) {
				max_length = length;
				*end = i - 1;
				*start = *end - max_length + 1;
			}
		}
	}
	
}

void read_array(int n, int *arr) {
	for (int i = 0; i < n; i++)
		scanf("%d", &arr[i]);
}

int main() {
	int option = 0, n;
	int arr[100];

	do {
		printf("1. Enter a vector of numbers:\n");
		printf("2. Find the longest increasing contiguous subsequence, such that the sum of any 2 consecutive elements is a prime number:\n");
		printf("3. Exit\n");
		printf("> ");
		scanf("%d", &option);
		
		switch (option) {
			case 1:
				printf("Enter the vector's length: ");
				scanf("%d", &n);
				read_array(n, arr);
				break;
			case 2:
				int start, end;
				longest_increasing_subsequence(n, arr, &start, &end);
				for (int i = start; i <= end; i++) {
					printf("%d ", arr[i]);
				}
				printf("\n");
				break;
			case 3:
				printf("Exiting...\n");
				break;
			default:
				printf("Invalid option.\n");
		}

	} while (option != 3);

	return 0;
}