/*
ADT Bag - represented using a dynamic  array of <element,  frequency>  pairs (or  two dynamic arrays).
For example, the bag [5, 10, -1, 2, 3, 10, 5, 5, -5]
will be represented as [(5,3), (10, 2), (-1, 1), (2, 1), (3, 1),(-5, 1)]
*/
#include <exception>
#include "BagIterator.h"
#include "Bag.h"

using namespace std;


BagIterator::BagIterator(const Bag& c): bag(c)
{
	//TODO - Implementation
	this->current = 0;
}
//Theta(1)

void BagIterator::first() {
	//TODO - Implementation
	this->current = 0;
}
//Theta(1)


void BagIterator::next() {
	//TODO - Implementation
	if (this->current >= this->bag.size()) {
		throw exception();
	}
	else {
		this->current++;
	}
}
//Theta(1)


bool BagIterator::valid() const {
	//TODO - Implementation
	if(this->current < this->bag.size())
		return true;
	return false;
}
//Theta(1)



TElem BagIterator::getCurrent() const
{
	//TODO - Implementation
	if (this->current >= this->bag.size()) {
		throw exception();
	}
	return this->bag.elements[this->current];
}
//Theta(1)
