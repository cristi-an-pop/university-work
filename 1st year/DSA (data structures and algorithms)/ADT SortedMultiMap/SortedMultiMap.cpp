#include "SMMIterator.h"
#include "SortedMultiMap.h"
#include <iostream>
#include <vector>
#include <exception>

using namespace std;

SortedMultiMap::BSTNode::BSTNode()
{
	this->information = NULL_TELEM;
	this->left = -1;
	this->right = -1;
} // theta(1)

SortedMultiMap::BSTNode::BSTNode(TElem _information, int _left, int _right)
{
	this->information = _information;
	this->left = _left;
	this->right = _right;
} // theta(1)

const TKey& SortedMultiMap::BSTNode::getKey() const
{
	return this->information.first;
} // theta(1)

const TValue& SortedMultiMap::BSTNode::getValue() const
{
	return this->information.second;
} // theta(1)

void SortedMultiMap::resizeArray()
{
	this->capacity *= 2;
	BSTNode* newArray = new BSTNode[this->capacity];

	for (int node = 0; node < this->length; node++)
		newArray[node] = this->elements[node];

	delete[] this->elements;

	this->elements = newArray;
} // theta(capacity)

void SortedMultiMap::computeFirstEmptyAfterAddition()
{
	while (this->elements[this->firstEmpty].information != NULL_TELEM)
		this->firstEmpty++;
} // theta(n) (where n<-number of elements)

int SortedMultiMap::insertRecursive(int node, TElem newElement)
{
	// the map is empty
	if (node == -1) {
		this->elements[this->firstEmpty].information = newElement;
		int oldFirstEmpty = this->firstEmpty;
		this->computeFirstEmptyAfterAddition();
		return oldFirstEmpty;
	}

	// the value of the element we are searching for is greater than the current one, we go left subtree
	else if (!this->relation(this->elements[node].getKey(), newElement.first)) {
		this->elements[node].left = insertRecursive(this->elements[node].left, newElement);
		return node;
	}

	// the value of the element we are searching for is smaller than the current one, we go right subtree
	else {
		this->elements[node].right = insertRecursive(this->elements[node].right, newElement);
		return node;
	}
} // theta(n) time complexity (where n<-number of elements)

int SortedMultiMap::findMinimumElement(int node)
{
	if (node == -1)
		return -1;

	while (this->elements[node].left != -1)
		node = this->elements[node].left;

	return node;
} // theta(h) <=> theta(n) time complexity(where h <-height of the tree; n <-number of elements)

int SortedMultiMap::removeRecursive(int node, TElem element, bool& removed)
{
	if (node == -1)
		return -1;

	if (this->elements[node].information == element) {
		removed = true;

		// the node to be removed has no descendant
		if (this->elements[node].left == -1 && this->elements[node].right == -1)
			return -1;

		// the node to be removed has one descendant
		else if (this->elements[node].left == -1)
			return this->elements[node].right;

		else if (this->elements[node].right == -1)
			return this->elements[node].left;

		// the node to be removed has two descendants
		else {
			// find the minimum of the right subtree 
			int minimumElement = findMinimumElement(this->elements[node].right);

			// move it to the node to be deleted
			this->elements[node].information = this->elements[minimumElement].information;

			// now delete the minimum in the same way
			this->elements[node].right = removeRecursive(this->elements[node].right, this->elements[minimumElement].information, removed);
			return node;
		}
	}

	// the value of the element we are searching for is greater (in terms of relation) than the current one, we go left subtree
	else if (!this->relation(this->elements[node].getKey(), element.first)) {
		this->elements[node].left = removeRecursive(this->elements[node].left, element, removed);
		return node;
	}

	// the value of the element we are searching for is smaller (in terms of relation) than the current one, we go right subtree
	else {
		this->elements[node].right = removeRecursive(this->elements[node].right, element, removed);
		return node;
	}
} // theta(h) <=> theta(n) time complexity (where h<-height of the tree; n<-number of elements)

SortedMultiMap::SortedMultiMap(Relation r) {
	this->length = 0;
	this->capacity = 10;
	this->elements = new BSTNode[this->capacity];
	this->root = -1;
	this->firstEmpty = 0;
	this->relation = r;
} // theta(1)

void SortedMultiMap::add(TKey c, TValue v) {
	TElem newElement = make_pair(c, v);

	if (this->length + 1 == this->capacity)
		this->resizeArray();

	if (this->length == 0) {
		this->elements[this->firstEmpty].information = newElement;
		this->root = this->firstEmpty;
		this->computeFirstEmptyAfterAddition();
	}
	else
		this->insertRecursive(this->root, newElement);

	this->length++;
} // theta(h) <=> theta(n) time complexity (where h<-height of the tree; n<-number of elements)

vector<TValue> SortedMultiMap::search(TKey c) const {
	vector<TValue> keyValues;

	int eachPosition = this->root;

	while (eachPosition != -1) {
		if (this->elements[eachPosition].getKey() == c)
			keyValues.push_back(this->elements[eachPosition].getValue());

		if (this->relation(this->elements[eachPosition].getKey(), c))
			eachPosition = this->elements[eachPosition].right;

		else
			eachPosition = this->elements[eachPosition].left;
	}

	return keyValues;
} // theta(h) <=> theta(n) time complexity (where h<-height of the tree; n<-number of elements)

bool SortedMultiMap::remove(TKey c, TValue v) {
	bool wasElementRemoved = false;
	TElem elementToBeRemoved = make_pair(c, v);

	this->removeRecursive(this->root, elementToBeRemoved, wasElementRemoved);

	if (wasElementRemoved)
		this->length--;

	return wasElementRemoved;
} // theta(h) <=> theta(n) time complexity (where h<-height of the tree; n<-number of elements)

int SortedMultiMap::size() const {
	return this->length;
} // theta(1)

bool SortedMultiMap::isEmpty() const {
	return this->length == 0;
} // theta(1)

void SortedMultiMap::replaceAll(Transformer t) {
	replaceAllRecursive(this->root, t);
} // theta(n) time complexity (where n<-number of elements)

void SortedMultiMap::replaceAllRecursive(int node, Transformer t) {
	if (node == -1)
		return;

	replaceAllRecursive(this->elements[node].left, t);
	this->elements[node].information.second = t(this->elements[node].information.first, this->elements[node].information.second);
	replaceAllRecursive(this->elements[node].right, t);
} // theta(n) time complexity (where n<-number of elements)

SMMIterator SortedMultiMap::iterator() const {
	return SMMIterator(*this);
} // theta(n)

SortedMultiMap::~SortedMultiMap() {
	delete[] this->elements;
} // theta(1)