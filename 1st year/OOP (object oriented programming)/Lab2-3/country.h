#pragma once

typedef struct {
	char* name;
	char* continent;
	double population;
} Country;

Country* createCountry(char* name, char* continent, double population);
void destroyCountry(Country* country);