/*
ADT  MultiMap–using  a  SLLAwith  (key,  value)  pairs.  A  key  can  appear  in  multiple  pairs. Pairs do not have to be ordered.
*/

#include <iostream>
#include "MultiMap.h"
#include "ExtendedTest.h"
#include "ShortTest.h"
#include "MultiMapIterator.h"

using namespace std;


int main() {


	testAll();
	testAllExtended();
	cout << "End" << endl;
	system("pause");

}
