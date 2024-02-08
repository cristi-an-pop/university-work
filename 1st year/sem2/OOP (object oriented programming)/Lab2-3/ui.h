#pragma once
#include "controller.h"

typedef struct {
	Service* service;
} UI;

UI* createUI(Service* service);
void destroyUI(UI* ui);
void startUI(UI* ui);
void addCountryUI(UI* ui);
void deleteCountryUI(UI* ui);
void updateCountryUI(UI* ui);
void searchCountryUI(UI* ui);
void searchCountryByCriteriaUI(UI* ui);
