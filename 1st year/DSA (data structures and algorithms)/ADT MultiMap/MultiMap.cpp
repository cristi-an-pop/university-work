#include "MultiMap.h"
#include "MultiMapIterator.h"
#include <exception>
#include <iostream>

using namespace std;


MultiMap::MultiMap() {
	this->capacity = 10;
	this->elements = new TElem[this->capacity];
	this->next = new int[this->capacity];
	this->head = -1;
	this->firstFree = 0;
	this->length = 0;

	for (int i = 0; i < this->capacity - 1; i++)
		this->next[i] = i + 1;
    this->next[this->capacity - 1] = -1;
}


void MultiMap::add(TKey c, TValue v) {
	int positionToAdd = this->allocate();
	TElem pairToAdd = make_pair(c, v);
	
	if (this->length == 0) {
		this->elements[positionToAdd] = pairToAdd;
		this->head = positionToAdd;
		this->next[positionToAdd] = -1;
		this->length++;
	}
	else {
		this->elements[positionToAdd] = pairToAdd;
		this->next[positionToAdd] = this->head;
		this->head = positionToAdd;
		this->length++;
	}
}
//Θ(1)


bool MultiMap::remove(TKey c, TValue v) {
	int prev = -1;
	int current = this->head;
	while (current != -1 && (this->elements[current].first != c || this->elements[current].second != v)) {
		prev = current;
		current = this->next[current];
	}
	if (current != -1) {
		if (current == this->head)
			this->head = this->next[current];
		else
			this->next[prev] = this->next[current];
		this->next[current] = this->firstFree;
		this->firstFree = current;
		this->length--;
		return true;
	}
	return false;
}
//Θ(length)

vector<TValue> MultiMap::removeKey(TKey key) {
	vector<TValue> values;
	int prev = -1;
	int current = this->head;
	while (current != -1) {
		if (this->elements[current].first == key) {
			values.push_back(this->elements[current].second);
			if (current == this->head)
				this->head = this->next[current];
			else
				this->next[prev] = this->next[current];
			this->next[current] = this->firstFree;
			this->firstFree = current;
			this->length--;
		}
		else
			prev = current;
		current = this->next[current];
	}
	return values;
}
//Θ(length)


vector<TValue> MultiMap::search(TKey c) const {
	vector<TValue> values;
	for (int i = this->head; i != -1; i = this->next[i])
		if (this->elements[i].first == c)
			values.push_back(this->elements[i].second);
	return values;
}
//Θ(length)


int MultiMap::size() const {
	return this->length;
}
//Θ(1)


bool MultiMap::isEmpty() const {
	return this->length == 0;
}
//Θ(1)

MultiMapIterator MultiMap::iterator() const {
	return MultiMapIterator(*this);
}

void MultiMap::resize() {
	//double the capacity and rehash all the elements
	//copy all the elements in a new array
	//update the next array

	int newCapacity = this->capacity * 2;
	TElem* newElements = new TElem[newCapacity];
	int* newNext = new int[newCapacity];

	for (int i = 0; i < this->capacity; i++) {
		newElements[i] = this->elements[i];
		newNext[i] = this->next[i];
	}

	for (int i = this->capacity; i < newCapacity - 1; i++)
		newNext[i] = i + 1;
	
	newNext[newCapacity - 1] = -1;

	delete[] this->elements;
	delete[] this->next;

	this->elements = newElements;
	this->next = newNext;
	this->firstFree = this->capacity;
	this->capacity = newCapacity;
}
//Θ(newCapacity)

int MultiMap::allocate() {
	//return position on which to add a new element and handle resizing if necessary
	if(this->firstFree == -1)
		this->resize();

	int positionToAdd = this->firstFree;
	this->firstFree = this->next[this->firstFree];
	return positionToAdd;
}
//Θ(1)

int MultiMap::findFirstFree() {
	//return the first free position in the array
	for (int i = 0; i < this->capacity; i++)
		if (this->next[i] == -1)
			return i;
	return -1;
}
//Θ(capacity)


MultiMap::~MultiMap() {
	delete[] this->elements;
	delete[] this->next;
}

