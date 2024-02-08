#include "GUI.h"
#include "RepositoryExceptions.h"

GUI::GUI(Controller& controller) : controller{ controller }
{
	this->initGUI();
	this->populateList();
	this->connectSignalsAndSlots();
}

void GUI::initGUI()
{
	this->moviesListWidget = new QListWidget{};
	this->titleLineEdit = new QLineEdit{};
	this->genreLineEdit = new QLineEdit{};
	this->yearLineEdit = new QLineEdit{};
	this->likesLineEdit = new QLineEdit{};
	this->trailerLineEdit = new QLineEdit{};
	this->addButton = new QPushButton{ "Add" };
	this->deleteButton = new QPushButton{ "Delete" };
	this->updateButton = new QPushButton{ "Update" };

	QVBoxLayout *mainLayout = new QVBoxLayout{ this };
	mainLayout->addWidget(this->moviesListWidget);

	QFormLayout* formLayout = new QFormLayout{};
	formLayout->addRow("Title", this->titleLineEdit);
	formLayout->addRow("Genre", this->genreLineEdit);
	formLayout->addRow("Year", this->yearLineEdit);
	formLayout->addRow("Likes", this->likesLineEdit);
	formLayout->addRow("Trailer", this->trailerLineEdit);
	mainLayout->addLayout(formLayout);

	QHBoxLayout* hboxLayout = new QHBoxLayout{};
	hboxLayout->addWidget(this->addButton);
	hboxLayout->addWidget(this->deleteButton);
	hboxLayout->addWidget(this->updateButton);
	mainLayout->addLayout(hboxLayout);
}

void GUI::populateList() {
	this->moviesListWidget->clear();
	for (auto movie : controller.getAllMovies()) {
		QString itemInList = QString::fromStdString(movie.getTitle() + " - " + movie.getGenre() + " - " + std::to_string(movie.getYear()) + " - " + std::to_string(movie.getLikes()) + " - " + movie.getTrailer());
		this->moviesListWidget->addItem(itemInList);
	}
}

void GUI::connectSignalsAndSlots() {
	QObject::connect(this->moviesListWidget, &QListWidget::clicked, [this]() {
		int selectedIndex = this->getSelectedIndex();
		if (selectedIndex < 0)
			return;
		Movie movie = this->controller.getAllMovies()[selectedIndex];
		this->titleLineEdit->setText(QString::fromStdString(movie.getTitle()));
		this->genreLineEdit->setText(QString::fromStdString(movie.getGenre()));
		this->yearLineEdit->setText(QString::fromStdString(std::to_string(movie.getYear())));
		this->likesLineEdit->setText(QString::fromStdString(std::to_string(movie.getLikes())));
		this->trailerLineEdit->setText(QString::fromStdString(movie.getTrailer()));
		});
	QObject::connect(this->addButton, &QPushButton::clicked, this, &GUI::addMovie);
	QObject::connect(this->deleteButton, &QPushButton::clicked, this, &GUI::deleteMovie);
	QObject::connect(this->updateButton, &QPushButton::clicked, this, &GUI::updateMovie);
}

int GUI::getSelectedIndex()
{
	QModelIndexList indexList = this->moviesListWidget->selectionModel()->selectedIndexes();
	if(indexList.size() == 0)
		return -1;
	int index = indexList.at(0).row();
	return index;
}

void GUI::addMovie() {
	std::string title = this->titleLineEdit->text().toStdString();
	std::string genre = this->genreLineEdit->text().toStdString();
	int year = this->yearLineEdit->text().toInt();
	int likes = this->likesLineEdit->text().toInt();
	std::string trailer = this->trailerLineEdit->text().toStdString();
	try {
		this->controller.addMovie(Movie{title, genre, year, likes, trailer});
		this->populateList();
	}
	catch (MovieException& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.getErrors()[0]));
	}
	catch (RepositoryException& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
	catch (std::exception& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
}

void GUI::deleteMovie() {
	int selectedIndex = this->getSelectedIndex();
	if (selectedIndex < 0)
		return;
	Movie movie = this->controller.getAllMovies()[selectedIndex];
	try {
		this->controller.deleteMovie(movie);
		this->populateList();
	}
	catch (RepositoryException& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
	catch (std::exception& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
}

void GUI::updateMovie() {
	int selectedIndex = this->getSelectedIndex();
	if (selectedIndex < 0)
		return;
	Movie movie = this->controller.getAllMovies()[selectedIndex];
	std::string title = this->titleLineEdit->text().toStdString();
	std::string genre = this->genreLineEdit->text().toStdString();
	int year = this->yearLineEdit->text().toInt();
	int likes = this->likesLineEdit->text().toInt();
	std::string trailer = this->trailerLineEdit->text().toStdString();
	Movie new_movie{ title, genre, year, likes, trailer };
	try {
		this->controller.updateMovie(movie, new_movie);
		this->populateList();
	}
	catch (MovieException& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.getErrors()[0]));
	}
	catch (RepositoryException& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
	catch (std::exception& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
}