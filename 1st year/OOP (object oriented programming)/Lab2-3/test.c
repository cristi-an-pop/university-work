#include "test.h"
#include "DynamicArray.h"
#include "controller.h"
#include <assert.h>
#include <string.h>
#define MAXCAPACITY 200

void testDynamicArray() {
	DynamicArray* array = createDynamicArray(MAXCAPACITY, destroyCountry);
	assert(array->capacity == MAXCAPACITY);
	assert(array->length == 0);
	assert(array->destroy == destroyCountry);
	assert(array->elements != NULL);
	destroyDynamicArray(array);
}

void testController() {
	Repository* repository = createRepository();
	OperationStack* undoStack = createOperationStack();
	OperationStack* redoStack = createOperationStack();
	Service* service = createService(repository, undoStack, redoStack);
	assert(service->repository == repository);
	assert(service->undoStack == undoStack);
	assert(service->redoStack == redoStack);
	assert(service->canRecordOperation == 1);
	destroyService(service);
}

void testRepository() {
	Repository* repository = createRepository();
	assert(repository->length == 0);
	assert(repository->capacity == 10);
	assert(repository->countries != NULL);
	destroyRepository(repository);
}

void testOperations() {
	Operation* operation = createOperation("add", createCountry("Romania", "Europe", 19.5), 1);
	assert(strcmp(operation->operationType, "add") == 0);
	assert(operation->country != NULL);
	assert(operation->position == 1);
	destroyOperation(operation);
}

void testAll() {
	testDynamicArray();
	testController();
	testRepository();
	testOperations();
}
