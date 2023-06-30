#pragma once

#include "SortedMultiMap.h"

class Stack {
private:
    int* elements;
    int nrElements;
    int capacity;

public:
    Stack();

    int getNrElements() const;

    int getCapacity() const;

    void push(int element);

    void resize();

    int pop();

    int operator[](int position) const;

    ~Stack();
};

class SMMIterator {
    friend class SortedMultiMap;
private:
    //DO NOT CHANGE THIS PART
    const SortedMultiMap& map;
    SMMIterator(const SortedMultiMap& map);

    Stack stack{};
    int currentIndex;

public:
    void first();

    void next();

    bool valid() const;

    TElem getCurrent() const;

    void inOrderRecursive(int startNode);
};