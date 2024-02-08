#include "SMMIterator.h"
#include "SortedMultiMap.h"

SMMIterator::SMMIterator(const SortedMultiMap& d) : map(d) {
    int startNode = d.root;

    this->currentIndex = 0;
    this->inOrderRecursive(startNode);
} // theta(nrNodes)

void SMMIterator::first() {
    this->currentIndex = 0;
} // theta(1)

void SMMIterator::next() {
    if (!valid()) {
        throw std::exception();
    }

    this->currentIndex++;
} // theta(1)

bool SMMIterator::valid() const {
    if (this->currentIndex >= this->stack.getNrElements())
        return false;

    return true;
} // theta(1)

TElem SMMIterator::getCurrent() const {
    if (!valid()) {
        throw std::exception();
    }

    return this->map.elements[this->stack[this->currentIndex]].information;
} // theta(1)

void SMMIterator::inOrderRecursive(int startNode) {
    if (startNode != -1) {
        this->inOrderRecursive(this->map.elements[startNode].left);
        this->stack.push(startNode);
        this->inOrderRecursive(this->map.elements[startNode].right);
    }
} //theta(nrNodes)

Stack::Stack() : nrElements{ 0 }, capacity{ 10 } {
    this->elements = new int[this->capacity];
} // theta(1)

int Stack::getNrElements() const {
    return this->nrElements;
} // theta(1)

int Stack::getCapacity() const {
    return this->capacity;
} // theta(1)

void Stack::push(int element) {
    if (this->nrElements == this->capacity)
        this->resize();

    this->elements[this->nrElements] = element;
    this->nrElements++;
} // theta(1) amortized

void Stack::resize() {
    int* newElements = new int[this->capacity * 2];

    int index;
    for (index = 0; index < this->nrElements; index++)
        newElements[index] = this->elements[index];

    this->capacity = this->capacity * 2;
    delete[] this->elements;
    this->elements = newElements;
} // theta(nrElements)

int Stack::pop() {
    this->nrElements--;
    return this->elements[this->nrElements];
} // theta(1)

int Stack::operator[](int position) const
{
    return this->elements[position];
} // theta(1)

Stack::~Stack() {
    delete[] this->elements;
} // theta(1)