#pragma once
#include "country.h"

typedef struct {
	int capacity;
	int length;
	Country* countries;
} Repository;

Repository* createRepository();
void destroyRepository(Repository* repository);
Country* getAllCountriesRepository(Repository* repository);
int getLengthRepository(Repository* repository);
int addCountryRepository(Repository* repository, Country* country);
int deleteCountryRepository(Repository* repository, Country* country);
int updateCountryRepository(Repository* repository, char* name, double new_population);
Country* getCountryByPositionRepository(Repository* repository, char* name);