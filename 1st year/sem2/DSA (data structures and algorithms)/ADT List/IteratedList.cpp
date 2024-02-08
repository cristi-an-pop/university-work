
#include <exception>
#include "ListIterator.h"
#include "IteratedList.h"

IteratedList::IteratedList() {
	this->head = nullptr;
	this->sizeList = 0;
}
//Θ(1)

int IteratedList::size() const {
	return this->sizeList;
}
//Θ(size), size = number of elements in the list

bool IteratedList::isEmpty() const {
	if (this->sizeList == 0) {
		return true;
	}
	return false;
}
//Θ(1)

ListIterator IteratedList::first() const {
	return ListIterator(*this);
}
//Θ(1)

TElem IteratedList::getElement(ListIterator pos) const {
	return pos.getCurrent();
}
//Θ(1)

TElem IteratedList::remove(ListIterator& pos) {
	if (!pos.valid()) {
		throw std::exception();
	}

	TElem oldElem = pos.current->info;


	PNode current = this->head;
	PNode prev = nullptr;
	
	while (current != nullptr && current != pos.current) {
		prev = current;
		current = current->next;
	}

	if (current != nullptr && prev == nullptr) {
		this->head = this->head->next;
	}
	else if (current != nullptr) {
		prev->next = current->next;
		current->next = nullptr;
	}

	delete current;
	this->sizeList--;
	return oldElem;
}
//Θ(size), size = number of elements in the list

ListIterator IteratedList::search(TElem e) const{
	ListIterator it = this->first();
	while (it.current != nullptr) {
		if (it.current->info != e) {
			it.next();
		}
		else {
			break;
		}
	}
	return it;
}
//Θ(size), size = number of elements in the list

TElem IteratedList::setElement(ListIterator pos, TElem e) {
	if (!pos.valid()) {
		throw std::exception();
	}

	TElem oldElem = pos.getCurrent();
	pos.current->info = e;
	return oldElem;
}
//Θ(1)

void IteratedList::addToPosition(ListIterator& pos, TElem e) {
	if (!pos.valid()) {
		throw std::exception();
	}
	
	this->sizeList++;

	PNode newNode = new SLLNode;
	newNode->info = e;
	newNode->next = nullptr;

	newNode->next = pos.current->next;
	pos.current->next = newNode;
	pos.next();
}

//Θ(1)

void IteratedList::addToEnd(TElem e) {
	this->sizeList++;

	PNode newNode = new SLLNode;
	newNode->info = e;
	newNode->next = nullptr;

	if (this->head == nullptr) {
		this->head = newNode;
		return;
	}
	else {
		PNode last = this->head;
		while (last->next != nullptr) 
			last = last->next; {
		}
		last->next = newNode;
	}
}
//Θ(size), size = number of elements in the list

void IteratedList::addToBeginning(TElem e) {
	this->sizeList++;

	PNode newNode = new SLLNode;
	newNode->info = e;
	newNode->next = nullptr;

	PNode aux = this->head;
	this->head = newNode;
	newNode->next = aux;
}
//Θ(1)

void IteratedList::removeBetween(ListIterator& start, ListIterator& end) {
	if (!start.valid() || !end.valid()) {
		throw std::exception();
	}

	PNode current = this->head;
	PNode prev = nullptr;

	while (current != nullptr && current != start.current) {
		prev = current;
		current = current->next;
	}

	if (current != nullptr && prev == nullptr) {
		this->head = end.current->next;
	}
	else if (current != nullptr) {
		prev->next = end.current->next;
		end.current->next = nullptr;
	}

	while (current != nullptr && current != end.current) {
		PNode next = current->next;
		delete current;
		current = next;
		this->sizeList--;
	}

	if (current != nullptr) {
		PNode next = current->next;
		delete current;
		current = next;
		this->sizeList--;
	}
	start.current = end.current;
}
//Θ(size), size = number of elements in the list

IteratedList::~IteratedList() {
	PNode current = this->head;
	while (current != nullptr) {
		PNode next = current->next;
		delete current;
		current = next;
	}
}
//Θ(size), size = number of elements in the list

