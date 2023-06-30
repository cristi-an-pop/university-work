#pragma once

typedef void* TElem;
typedef void(*destroyer)(TElem);

typedef struct {
	TElem* elements;
	int length;
	int capacity;
	destroyer destroy;
} DynamicArray;

DynamicArray* createDynamicArray(int, destroyer);
void destroyDynamicArray(DynamicArray*);
void addElement(DynamicArray*, TElem);
void removeElement(DynamicArray*, int);
void updateElement(DynamicArray*, int, TElem);
TElem getElement(DynamicArray*, int);
int getLength(DynamicArray*);
int getCapacity(DynamicArray*);
