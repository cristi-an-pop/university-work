#include "MultiMapIterator.h"
#include "MultiMap.h"
#include <exception>

MultiMapIterator::MultiMapIterator(const MultiMap& c): col(c) {
	if (col.head != -1) {
		this->current = col.head;
	}
	else {
		this->current = -1;
	}
}

TElem MultiMapIterator::getCurrent() const{
	if (this->valid()) {
		return this->col.elements[this->current];
	}
	else {
		throw std::exception();
	}
}

bool MultiMapIterator::valid() const {
	if (this->current == -1) {
		return false;
	}
	return true;
}

void MultiMapIterator::next() {
	if (this->valid()) {
		this->current = this->col.next[this->current];
	}
	else {
		throw std::exception();
	}
}

void MultiMapIterator::first() {
	if (this->col.head != -1) {
		this->current = this->col.head;
	}
	else {
		throw std::exception();
	}
}

