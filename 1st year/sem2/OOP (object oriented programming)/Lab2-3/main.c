#include <stdlib.h>
#include "ui.h"
#include "test.h"
#include <crtdbg.h>


void generate_countries(UI* ui);

int main() {
	//testAll();

	Repository* repository = createRepository();
	OperationStack* undoStack = createOperationStack();
	OperationStack* redoStack = createOperationStack();
	Service* service = createService(repository, undoStack, redoStack);
	UI* ui = createUI(service);

	generate_countries(ui);
	startUI(ui);
	destroyUI(ui);

	_CrtDumpMemoryLeaks();
}

void generate_countries(UI* ui) {
	Country* country1 = createCountry("Romania", "Europe", 19.5);
	Country* country2 = createCountry("Germany", "Europe", 82.2);
	Country* country3 = createCountry("France", "Europe", 66.9);
	Country* country4 = createCountry("Spain", "Europe", 46.6);
	Country* country5 = createCountry("Italy", "Europe", 60.5);
	Country* country6 = createCountry("United Kingdom", "Europe", 66.0);
	Country* country7 = createCountry("Russia", "Europe", 144.5);
	Country* country8 = createCountry("China", "Asia", 1393.7);
	Country* country9 = createCountry("India", "Asia", 1351.2);
	Country* country10 = createCountry("United States", "North America", 327.2);
	addCountryRepository(ui->service->repository, country1);
	addCountryRepository(ui->service->repository, country2);
	addCountryRepository(ui->service->repository, country3);
	addCountryRepository(ui->service->repository, country4);
	addCountryRepository(ui->service->repository, country5);
	addCountryRepository(ui->service->repository, country6);
	addCountryRepository(ui->service->repository, country7);
	addCountryRepository(ui->service->repository, country8);
	addCountryRepository(ui->service->repository, country9);
	addCountryRepository(ui->service->repository, country10);
	destroyCountry(country1);
	destroyCountry(country2);
	destroyCountry(country3);
	destroyCountry(country4);
	destroyCountry(country5);
	destroyCountry(country6);
	destroyCountry(country7);
	destroyCountry(country8);
    destroyCountry(country9);
	destroyCountry(country10);
}