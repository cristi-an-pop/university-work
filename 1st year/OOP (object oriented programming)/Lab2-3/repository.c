#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "repository.h"

Repository* createRepository() {
	Repository* repository = (Repository*)malloc(sizeof(Repository));
	if (repository) {
		repository->capacity = 10;
		repository->length = 0;
		repository->countries = (Country*)malloc(sizeof(Country) * repository->capacity);
	}
	return repository;
}

void destroyRepository(Repository* repository) {
	free(repository->countries);
	free(repository);
}

Country* getAllCountriesRepository(Repository* repository) {
	return repository->countries;
}

int getLengthRepository(Repository* repository) {
	return repository->length;
}

Country* getCountryByPositionRepository(Repository* repository, char* name) {
	for (int i = 0; i < repository->length; i++) {
		if (strcmp(repository->countries[i].name, name) == 0) {
			return &(repository->countries[i]);
		}
	}
	return NULL;
}

int addCountryRepository(Repository* repository, Country* country) {
	if (repository->length >= repository->capacity) {
		repository->capacity *= 2;
		repository->countries = (Country*)realloc(repository->countries, sizeof(Country) * repository->capacity);
		if (repository->countries == NULL) {
			return 0; // failed to allocate memory
		}
	}
	Country* newCountry = createCountry(country->name, country->continent, country->population);
	if (newCountry == NULL) {
		return 0; // failed to create a new country
	}
	repository->countries[repository->length].name = (char*)malloc(strlen(newCountry->name) + 1);
	strcpy(repository->countries[repository->length].name, newCountry->name);
	repository->countries[repository->length].continent = newCountry->continent;
	repository->countries[repository->length].population = newCountry->population;

	repository->length++;
	return 1; // success
}

int deleteCountryRepository(Repository* repository, Country* country) {
	for (int i = 0; i < repository->length; i++) {
		if (strcmp(repository->countries[i].name, country->name) == 0) {
			for (int j = i + 1; j < repository->length; j++) {
				repository->countries[j - 1] = repository->countries[j];
			}
			repository->length--;
			return 1;
		}
	}
	return 0;
}

int updateCountryRepository(Repository* repository, char* name, double new_population) {
	int i;
	for (i = 0; i < repository->length; i++) {
		if (strcmp(repository->countries[i].name, name) == 0) {
			break;
		}
	}
	if (i == repository->length) {
		return 0;
	}
	repository->countries[i].population = new_population;
	return 1;
}