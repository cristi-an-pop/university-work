#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "ui.h"

UI* createUI(Service* service) {
	UI* ui = (UI*)malloc(sizeof(UI));
	if (ui) {
		ui->service = service;
	}
	return ui;
}

void destroyUI(UI* ui) {
	destroyService(ui->service);
	free(ui);
}

void startUI(UI* ui) {
	int menu_option;

	while (1) {
		printf("<<MENU>>\n");
		printf("1. Add country\n");
		printf("2. Delete country\n");
		printf("3. Update country\n");
		printf("4. Search country\n");
		printf("5. Search country by continent and population\n");
		printf("6. Undo\n");
		printf("7. Redo\n");
		printf("0. Exit\n");

		scanf_s("%d", &menu_option);
		switch (menu_option) {
			case 1:
				addCountryUI(ui);
				break;
			case 2:
				deleteCountryUI(ui);
				break;
			case 3:
				updateCountryUI(ui);
				break;
			case 4:
				searchCountryUI(ui);
				break;
			case 5:
				searchCountryByCriteriaUI(ui);
				break;
			case 6:
				if (undoOperation(ui->service)) {
					printf("Undo succesful!\n");
				}
				else {
					printf(":(\n");
				}
				break;
			case 7:
				if (redoOperation(ui->service)) {
					printf("Redo succesful!\n");
				}
				else {
					printf(":(\n");
				}
				break;
			case 0:
				destroyUI(ui);
				return;
			default:
				printf("Invalid option!\n");
		}
	}
}

void addCountryUI(UI* ui) {
	char name[20];
	char* continent;
	double population;

	printf("Enter name: ");
	fgets(name, 20, stdin);
	fgets(name, 20, stdin);
	name[strcspn(name, "\n")] = 0;
	
	if (name == "") {
		printf("Invalid name!\n");
		return;
	}
	
	printf("Choose continent:\n");
	printf("1. Europe\n");
	printf("2. Asia\n");
	printf("3. Africa\n");
	printf("4. America\n");
	printf("5. Australia\n");
	int option;
	scanf_s("%d", &option);
	switch (option) {
		case 1:
			continent = "Europe";
			break;
		case 2:
			continent = "Asia";
			break;
		case 3:
			continent = "Africa";
			break;
		case 4:
			continent = "America";
			break;
		case 5:
			continent = "Australia";
			break;
		default:
			printf("Invalid option!\n");
			return;
	}

	printf("Enter population: ");
	scanf_s("%lf", &population);

	if (addCountryService(ui->service, name, continent, population)) {
		printf("Country added succesfully!\n");
	}
	else {
		printf("Country was not added!\n");
	}
}

void deleteCountryUI(UI* ui) {
	char name[20];

	printf("Enter name: ");
	fgets(name, 20, stdin);
	fgets(name, 20, stdin);
	name[strcspn(name, "\n")] = 0;

	if (deleteCountryService(ui->service, name)) {
		printf("Country deleted succesfully!\n");
	}
	else {
		printf("Country has not been deleted!\n");
	}
}

void updateCountryUI(UI* ui) {
	char name[20];
	double new_population;

	printf("Enter name: ");
	fgets(name, 20, stdin);
	fgets(name, 20, stdin);
	name[strcspn(name, "\n")] = 0;

	printf("New population: ");
	scanf_s("%lf", &new_population);

	if (updateCountryService(ui->service, name, new_population)) {
		printf("Country updated succsefully!\n");
	}
	else {
		printf("Country has not been updated!\n");
	}
}

void searchCountryUI(UI* ui) {
	char key[20];

	printf("Search: ");
	fgets(key, 20, stdin);
	fgets(key, 20, stdin);
	key[strcspn(key, "\n")] = 0; //remove \n from string

	Country* all_countries = getAllCountriesRepository(ui->service->repository);
	int number_of_countries = getLengthRepository(ui->service->repository);

	if (number_of_countries == 0) {
		printf("No countries!\n");
		return;
	}

	if (key == "") {
		for (int i = 0; i < number_of_countries; i++) {
			printf("%s %s %lf\n", all_countries[i].name, all_countries[i].continent, all_countries[i].population);
		}
	}
	else {
		for (int i = 0; i < number_of_countries; i++) {
			if(strstr(all_countries[i].name, key) != NULL) 
				printf("%s %s %lf\n", all_countries[i].name, all_countries[i].continent, all_countries[i].population);
		}
	}
	return;
}

void searchCountryByCriteriaUI(UI* ui) {
	//Display all countries on a given continent (if the continent is empty, all countries will be considered), 
	//whose populations are greater than a given value, sorted ascending by population.
	printf("Choose continent: \n");
	printf("1. Europe\n");
	printf("2. Asia\n");
	printf("3. Africa\n");
	printf("4. America\n");
	printf("5. Australia\n");
	int option;
	scanf_s("%d", &option);
	char* continent;
	switch (option) {
		case 1:
			continent = "Europe";
			break;
		case 2:
			continent = "Asia";
			break;
		case 3:
			continent = "Africa";
			break;
		case 4:
			continent = "America";
			break;
		case 5:
			continent = "Australia";
			break;
		default:
			printf("Invalid option!\n");
			return;
	}
	
	int length = getLengthRepository(ui->service->repository);
	Country* continentCountries = (Country*)malloc(sizeof(Country) * length);
	int numberOfCountries = 0;
	Country* all_countries = getAllCountriesRepository(ui->service->repository);
	for (int i = 0; i < length; i++) {
		if (strcmp(all_countries[i].continent, continent) == 0) {
			continentCountries[numberOfCountries] = all_countries[i];
			numberOfCountries++;
		}
	}

	if (numberOfCountries == 0) {
		printf("No countries found!\n");
		return;
	}

    printf("Population: ");
	double population;
	scanf_s("%lf", &population);

	Country* countries = (Country*)malloc(sizeof(Country) * numberOfCountries);
	int numberOfCountriesWithPopulation = 0;
	for (int i = 0; i < numberOfCountries; i++) {
		if (continentCountries[i].population > population) {
			countries[numberOfCountriesWithPopulation] = continentCountries[i];
			numberOfCountriesWithPopulation++;
		}
	}

	if (numberOfCountriesWithPopulation == 0) {
		printf("No countries found!\n");
		return;
	}

	for (int i = 0; i < numberOfCountriesWithPopulation - 1; i++) {
		for (int j = i + 1; j < numberOfCountriesWithPopulation; j++) {
			if (countries[i].population > countries[j].population) {
				Country aux = countries[i];
				countries[i] = countries[j];
				countries[j] = aux;
			}
		}
	}

	for (int i = 0; i < numberOfCountriesWithPopulation; i++) {
		printf("%s %s %lf\n", countries[i].name, countries[i].continent, countries[i].population);
	}

	free(continentCountries);
}

