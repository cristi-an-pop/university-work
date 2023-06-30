//Generate the closest prime number to n

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

int get_closest_prime_below(int n) {
    if (is_prime(n)) {
		return n;
	}
	return get_closest_prime_below(n - 2);
}

int get_closest_prime_above(int n) {
    if (is_prime(n)) {
		return n;
	}
	return get_closest_prime_above(n + 2);
}

int get_closest_prime(int n) {
    int closest_prime_below, closest_prime_above;
    if (n == 2) {
        return 3;
    }

    if(n <= 3) 
        return 2; {
	}

    if (n % 2 == 0) {
        closest_prime_below = get_closest_prime_below(n - 1);
        closest_prime_above = get_closest_prime_above(n + 1);
    }
    else {
        closest_prime_below = get_closest_prime_below(n - 2);
        closest_prime_above = get_closest_prime_above(n + 2);
    }
    if (n - closest_prime_below < closest_prime_above - n) {
        return closest_prime_below;
    }
    else {
        return closest_prime_above;
    }
}

int main() {
    int option = 0, n = -1;
    do {
        printf("1. Enter a natural number n\n");
        printf("2. Print closest prime number to n\n");
        printf("3. Exit\n");
        printf("> ");
        scanf("%d", &option);
        switch (option) {
        case 1:
            printf("Enter n: ");
            scanf("%d", &n);
            break;
        case 2:
            if (n < 0) {
                scanf("%d", &n);
            }
            printf("Closest prime number to %d is %d\n", n, get_closest_prime(n));
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