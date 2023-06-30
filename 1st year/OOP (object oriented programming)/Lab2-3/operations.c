#include <stdlib.h>
#include <stdio.h>
#include "country.h"
#include "operations.h"

Operation* createOperation(char* operationType, Country* country, double position) {
	Operation* operation = (Operation*)malloc(sizeof(Operation));
	if (operation) {
		operation->operationType = operationType;
		operation->country = country;
		operation->position = position;
	}
	return operation;
}

void destroyOperation(Operation* operation) {
	free(operation->operationType);
	free(operation->country);
	free(operation);
}

char* getOperationType(Operation* operation) {
	return operation->operationType;
}

OperationStack* createOperationStack() {
	OperationStack* operationStack = (OperationStack*)malloc(sizeof(OperationStack));
	if (operationStack) {
		operationStack->length = 0;
	}
	return operationStack;
}

void destroyOperationStack(OperationStack* operationStack) {
	int i;
	for (i = 0; i < operationStack->length; i++) {
		destroyOperation(operationStack->operations[i]);
	}
	free(operationStack);
}

void push(OperationStack* operationStack, Operation* operation) {
	operationStack->operations[operationStack->length++] = operation;
}

Operation* pop(OperationStack* operationStack) {
	operationStack->length--;
	return operationStack->operations[operationStack->length];
}

int stackIsEmpty(OperationStack* operationStack) {
	return operationStack->length == 0;
}

int stackIsFull(OperationStack* operationStack) {
	return operationStack->length == MAXSIZE;
}