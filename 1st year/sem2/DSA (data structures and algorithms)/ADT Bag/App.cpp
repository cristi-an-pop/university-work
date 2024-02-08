/*
ADT Bag - represented using a dynamic  array of <element,  frequency>  pairs (or  two dynamic arrays).
For example, the bag [5, 10, -1, 2, 3, 10, 5, 5, -5]
will be represented as [(5,3), (10, 2), (-1, 1), (2, 1), (3, 1),(-5, 1)]
*/
#include "Bag.h"
#include "ShortTest.h"
#include "ExtendedTest.h"
#include <iostream>

using namespace std;

int main() {

	testAll();
	cout << "Short tests over" << endl;
	testAllExtended();

	cout << "All test over" << endl;
}