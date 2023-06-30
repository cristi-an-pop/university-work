#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "controller.h"

Service* createService(Repository* repository, OperationStack* undoStack, OperationStack* redoStack) {
	Service* service = (Service*)malloc(sizeof(Service));
	if (service) {
		service->repository = repository;
		service->undoStack = undoStack;
		service->redoStack = redoStack;
		service->canRecordOperation = 1;
		return service;
	}
	else {
		return NULL;
	}
}

void destroyService(Service* service) {
	destroyRepository(service->repository);
	destroyOperationStack(service->undoStack);
	destroyOperationStack(service->redoStack);
	free(service);
}

int addCountryService(Service* service, char* name, char* continent, double population) {
	Country* country = createCountry(name, continent, population);
	int result = addCountryRepository(service->repository, country);
	if (result == 1 && service->canRecordOperation == 1) {
		Operation* operation = createOperation("add", country, 1);
		push(service->undoStack, operation);
	}
	return result;

}

int deleteCountryService(Service* service, char* name) {
	Country* country = createCountry(name, "", 0);
	int result = deleteCountryRepository(service->repository, country);
	if (result == 1 && service->canRecordOperation == 1) {
		Operation* operation = createOperation("delete", country, 1);
		push(service->undoStack, operation);
	}
	return result;
}

int updateCountryService(Service* service, char* name, double population) {
	Country* country = createCountry(name, "", population);
	int result = updateCountryRepository(service->repository, name, population);
	if (result == 1 && service->canRecordOperation == 1) {
		double old_population = 0;
		for (int i = 0; i < service->repository->length; i++) {
			if (strcmp(service->repository->countries[i].name, name) == 0) {
				old_population = service->repository->countries[i].population;
			}
		}
		Operation* operation = createOperation("update", country, old_population);
		push(service->undoStack, operation);
	}
	return result;
}

int undoOperation(Service* service) {
	if (service->undoStack->length == 0) {
		return 0;
	}
	Operation* operation = pop(service->undoStack);
	if (strcmp(operation->operationType, "add") == 0) {
		printf("HERE");
		service->canRecordOperation = 0;
		deleteCountryService(service, operation->country->name);
		service->canRecordOperation = 1;
		push(service->redoStack, operation);
	}
	else if (strcmp(operation->operationType, "delete") == 0) {
		service->canRecordOperation = 0;
		addCountryService(service, operation->country->name, operation->country->continent, operation->country->population);
		service->canRecordOperation = 1;
		push(service->redoStack, operation);
	}
	else if (strcmp(operation->operationType, "update") == 0) {
		service->canRecordOperation = 0;
		updateCountryService(service, operation->country->name, operation->position);
		service->canRecordOperation = 1;
		push(service->redoStack, operation);
	}
	return 1;
}

int redoOperation(Service* service) {
	if (service->redoStack->length == 0) {
		return 0;
	}
	Operation* operation = pop(service->redoStack);
	Country* country = createCountry(operation->country->name, operation->country->continent, operation->country->population);
	if (country == NULL) {
		printf("Error: Could not allocate memory for Country object\n");
		return 0;
	}
	if (strcmp(operation->operationType, "add") == 0) {
		service->canRecordOperation = 0;
		addCountryService(service, operation->country->name, operation->country->continent, operation->country->population);
		service->canRecordOperation = 1;
		push(service->undoStack, operation);
	}
	else if (strcmp(operation->operationType, "delete") == 0) {
		service->canRecordOperation = 0;
		deleteCountryService(service, operation->country->name);
		service->canRecordOperation = 1;
		push(service->undoStack, operation);
	}
	else if (strcmp(operation->operationType, "update") == 0) {
		service->canRecordOperation = 0;
		updateCountryService(service, operation->country->name, operation->country->population);
		service->canRecordOperation = 1;
		push(service->undoStack, operation);
	}
	destroyCountry(country);
	return 1;
}