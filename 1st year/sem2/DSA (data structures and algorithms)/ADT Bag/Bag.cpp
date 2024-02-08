/*
ADT Bag - represented using a dynamic  array of <element,  frequency>  pairs (or  two dynamic arrays).
For example, the bag [5, 10, -1, 2, 3, 10, 5, 5, -5] 
will be represented as [(5,3), (10, 2), (-1, 1), (2, 1), (3, 1),(-5, 1)]
*/

#include "Bag.h"
#include "BagIterator.h"
#include <exception>
#include <iostream>
using namespace std;


Bag::Bag() {
	//TODO - Implementation
	this->capacity = 10;
	this->length = 0;
	this->elements = new TElem[capacity];
	this->frequencies = new int[capacity];
}


void Bag::add(TElem elem) {
	//TODO - Implementation
	if (this->length >= this->capacity) {
		this->capacity *= 2;
		TElem* newElements = new TElem[this->capacity];
		int* newFrequencies = new int[this->capacity];
		for (int i = 0; i < this->length; i++) {
			newElements[i] = this->elements[i];
			newFrequencies[i] = this->frequencies[i];
		}
		delete[] this->elements;
		delete[] this->frequencies;
		this->elements = newElements;
		this->frequencies = newFrequencies;
	}
	bool found = false;
	for (int i = 0; i < this->length; i++) {
		if (this->elements[i] == elem) {
			this->frequencies[i]++;
			found = true;
			break;
		}
	}
	if (!found) {
		if (this->length < this->capacity) {
			this->elements[this->length] = elem;
			this->frequencies[this->length] = 1;
			this->length++;
		}
	}
}


bool Bag::remove(TElem elem) {
	int i = 0;
	while (i < this->length && this->elements[i] != elem) {
		i++;
	}
	if (i < this->length) {
		this->frequencies[i]--;
		if (this->frequencies[i] == 0) {
			// shift all remaining elements one position to the left
			for (int j = i; j < this->length - 1; j++) {
				this->elements[j] = this->elements[j + 1];
				this->frequencies[j] = this->frequencies[j + 1];
			}
			this->length--;
		}
		return true;
	}
	return false;
}


bool Bag::search(TElem elem) const {
	//TODO - Implementation
	for (int i = 0; i < this->length; i++) {
		if (this->elements[i] == elem)
			return true;
	}
	return false; 
}

int Bag::nrOccurrences(TElem elem) const {
	//TODO - Implementation
	for(int i = 0; i < this->length; i++)
		if(this->elements[i] == elem)
			return this->frequencies[i];
	return 0;
}


int Bag::size() const {
	//TODO - Implementation
	int size = 0;
	for (int i = 0; i < this->length; i++) {
		size += this->frequencies[i];
	}
	return size;
}


bool Bag::isEmpty() const {
	//TODO - Implementation
	if(this->length == 0)
		return true;
	return false;
}

BagIterator Bag::iterator() const {
	return BagIterator(*this);
}


Bag::~Bag() {
	//TODO - Implementation
	delete[] this->elements;
	delete[] this->frequencies;
}

