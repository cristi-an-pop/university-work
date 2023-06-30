#include "ListIterator.h"
#include "IteratedList.h"
#include <exception>

ListIterator::ListIterator(const IteratedList& list) : list(list) {
	//TODO - Implementation
	this->current = nullptr;
	first();
}

void ListIterator::first() {
	//TODO - Implementation
	this->current = list.head;
}

void ListIterator::next() {
	//TODO - Implementation
	if (this->valid()) {
		this->current = this->current->next;
	}
	else {
		throw std::exception();
	}
}

bool ListIterator::valid() const {
	//TODO - Implementation
	if (this->current != nullptr) {
		return true;
	}
	return false;
}

TElem ListIterator::getCurrent() const {
	if (this->valid()) {
		return this->current->info;
	}
	else {
		throw std::exception();
	}
}



