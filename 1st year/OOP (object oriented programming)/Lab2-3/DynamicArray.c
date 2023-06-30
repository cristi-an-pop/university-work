#include <stdlib.h>
#include "DynamicArray.h"
#include "country.h"

DynamicArray* createDynamicArray(int capacity, destroyer destroyer) {
	DynamicArray* array = (DynamicArray*)malloc(sizeof(DynamicArray));
	if (array) {
		array->capacity = capacity;
		array->length = 0;
		array->destroy = destroyer;
		array->elements = (TElem*)malloc(sizeof(TElem) * array->capacity);
	}
	return array;

}

void destroyDynamicArray(DynamicArray* array) {
	for (int i = 0; i < array->length; i++) {
		destroyCountry(array->elements[i]);
	}
	free(array->elements);
	free(array);
}

void resize(DynamicArray* array) {
	if (array) {
		array->capacity *= 2;
		TElem* new_elements = (TElem*)realloc(array->elements, sizeof(TElem) * array->capacity);
		if (new_elements) {
			array->elements = new_elements;
		}
	}
}

void addElement(DynamicArray* array, TElem element) {
	if (array) {
		if (array->length >= array->capacity) {
			resize(array);
		}
		array->elements[array->length++] = element;
	}
}

void removeElement(DynamicArray* array, int index) {
	if (array) {
		array->destroy(array->elements[index]);

		for(int i = index; i < array->length - 1; i++) 
			array->elements[i] = array->elements[i + 1]; {
		}
	}
}

void updateElement(DynamicArray* array, int index, TElem element) {
	if (array) {
		array->elements[index] = element;
	}
}

TElem getElement(DynamicArray* array, int index) {
	if (array) {
		return array->elements[index];
	}
	return NULL;
}

int getLength(DynamicArray* array) {
	if (array) {
		return array->length;
	}
	return -1;
}

int getCapacity(DynamicArray* array) {
	if (array) {
		return array->capacity;
	}
	return -1;
}