#pragma once
#include "repository.h"
#include "operations.h"

typedef struct {
	Repository* repository;
	OperationStack* undoStack;
	OperationStack* redoStack;
	int canRecordOperation;
} Service;

Service* createService(Repository* repository, OperationStack* undoStack, OperationStack* redoStack);
void destroyService(Service* service);
int addCountryService(Service* service, char* name, char* continent, double population);
int deleteCountryService(Service* service, char* name);
int updateCountryService(Service* service, char* name, double new_population);
int undoOperation(Service* service);
int redoOperation(Service* service);