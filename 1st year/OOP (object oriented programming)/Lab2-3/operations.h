#pragma once

#define MAXSIZE 200

typedef struct {
	char* operationType;
	Country* country;
	double position;
} Operation;

Operation* createOperation(char* operationType, Country* country, double position);
void destroyOperation(Operation* operation);
char* getOperationType(Operation* operation);

typedef struct {
	Operation* operations[MAXSIZE];
	int length;
} OperationStack;

OperationStack* createOperationStack();
void destroyOperationStack(OperationStack* operationStack);
void push(OperationStack* operationStack, Operation* operation);
Operation* pop(OperationStack* operationStack);
int stackIsEmpty(OperationStack* operationStack);
int stackIsFull(OperationStack* operationStack);
