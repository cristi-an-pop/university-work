#include <stdlib.h>
#include "country.h"

Country* createCountry(char* name, char* continent, double population) {
	Country* country = (Country*)malloc(sizeof(Country));
	if (country) {
		country->name = name;
		country->continent = continent;
		country->population = population;
	}
	return country;
}

void destroyCountry(Country* country) {
	free(country);
}