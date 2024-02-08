#pragma once
#include <qwidget.h>
#include <qlistwidget.h>
#include <qlineedit.h>
#include <qpushbutton.h>
#include <qboxlayout.h>
#include <qformlayout.h>
#include <qmessagebox.h>
#include "Controller.h"

class GUI : public QWidget {
private:
	Controller& controller;
	QListWidget* moviesListWidget;
	QLineEdit* titleLineEdit;
	QLineEdit* genreLineEdit;
	QLineEdit* yearLineEdit;
	QLineEdit* likesLineEdit;
	QLineEdit* trailerLineEdit;
	QPushButton* addButton;
	QPushButton* deleteButton;
	QPushButton* updateButton;
public:
	GUI(Controller& controller);
private:
	void initGUI();
	void populateList();
	void connectSignalsAndSlots();
	int getSelectedIndex();
	void addMovie();
	void deleteMovie();
	void updateMovie();
};