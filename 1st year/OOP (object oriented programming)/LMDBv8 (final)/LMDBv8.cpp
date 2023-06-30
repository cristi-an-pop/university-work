#include "LMDBv8.h"
#include "RepositoryExceptions.h"

LMDBv8::LMDBv8(Controller& controller, QWidget *parent)
    : QMainWindow(parent), controller{ controller }
{
    ui.setupUi(this);
    this->setWindowTitle("Local Movie DataBase");
    this->setMinimumSize(800, 600);

    this->initGUI();
	this->centralConnectSignalsAndSlots();
    this->adminConnectSignalsAndSlots();
	this->adminPopulateList();

	this->userConnectSignalsAndSlots();
}

void LMDBv8::initGUI() {
	this->centralCentralWidget = new QWidget{};
    this->centralWidget = new QWidget{};
    this->adminWidget = new QWidget{};
    this->userWidget = new QWidget{};

    this->adminButton = new QPushButton{ "Admin" };
    this->userButton = new QPushButton{ "User" };

	QHBoxLayout* centralCentralLayout = new QHBoxLayout{ this->centralCentralWidget };
	centralCentralLayout->addWidget(this->centralWidget);
	centralCentralLayout->addWidget(this->adminWidget);
	centralCentralLayout->addWidget(this->userWidget);

    QHBoxLayout* mainLayout = new QHBoxLayout{ this->centralWidget };
    mainLayout->addWidget(this->adminButton);
    mainLayout->addWidget(this->userButton);

    // Admin
    this->moviesListWidget = new QListWidget{};
    this->titleLineEdit = new QLineEdit{};
    this->genreLineEdit = new QLineEdit{};
    this->yearLineEdit = new QLineEdit{};
    this->likesLineEdit = new QLineEdit{};
    this->trailerLineEdit = new QLineEdit{};
    this->addButton = new QPushButton{ "Add" };
    this->deleteButton = new QPushButton{ "Delete" };
    this->updateButton = new QPushButton{ "Update" };
    this->mainMenuButton = new QPushButton{ "Main Menu" };

    QFormLayout* adminFormLayout = new QFormLayout{};
    adminFormLayout->addRow("Title", this->titleLineEdit);
    adminFormLayout->addRow("Genre", this->genreLineEdit);
    adminFormLayout->addRow("Year", this->yearLineEdit);
    adminFormLayout->addRow("Likes", this->likesLineEdit);
    adminFormLayout->addRow("Trailer", this->trailerLineEdit);
    adminFormLayout->addRow(this->addButton, this->deleteButton);
    adminFormLayout->addRow(this->updateButton, this->mainMenuButton);

    QVBoxLayout* adminMainLayout = new QVBoxLayout{ this->adminWidget };
    adminMainLayout->addWidget(this->moviesListWidget);
    adminMainLayout->addLayout(adminFormLayout);

	// User
	this->watchlistListWidget = new QListWidget{};
	this->genreLineEditUser = new QLineEdit{};
	this->seeByGenreButton = new QPushButton{ "See by genre" };
	this->addToWatchlistButton = new QPushButton{ "Add to watchlist" };
	this->deleteFromWatchlistButton = new QPushButton{ "Delete from watchlist" };
	this->seeWatchlistButton = new QPushButton{ "See watchlist" };
	this->nextButton = new QPushButton{ "Next" };
	this->saveButton = new QPushButton{ "Save" };
	this->movieLabel = new QLabel{};
	this->mainMenuButtonUser = new QPushButton{ "Main Menu" };

	QFormLayout* userFormLayout = new QFormLayout{};
	userFormLayout->addRow("Genre", this->genreLineEditUser);
	userFormLayout->addRow(this->seeByGenreButton);
	userFormLayout->addRow(this->addToWatchlistButton);
	userFormLayout->addRow(this->deleteFromWatchlistButton);
	userFormLayout->addRow(this->seeWatchlistButton);
	userFormLayout->addRow(this->nextButton);
	userFormLayout->addRow(this->saveButton);
	userFormLayout->addRow(this->mainMenuButtonUser);


	QVBoxLayout* userMainLayout = new QVBoxLayout{ this->userWidget };
	userMainLayout->addWidget(this->movieLabel);
	userMainLayout->addWidget(this->watchlistListWidget);
	userMainLayout->addLayout(userFormLayout);

	this->addToWatchlistButton->setEnabled(false);
	this->deleteFromWatchlistButton->setEnabled(false);
	this->nextButton->setEnabled(false);
	this->saveButton->setEnabled(false);

	this->setCentralWidget(this->centralCentralWidget);
	this->centralWidget->setVisible(true);
	this->adminWidget->setVisible(false);
	this->userWidget->setVisible(false);

}

void LMDBv8::centralConnectSignalsAndSlots() {
	QObject::connect(this->adminButton, &QPushButton::clicked, [this]() {
		this->centralWidget->setVisible(false);
		this->adminWidget->setVisible(true);
		});
	QObject::connect(this->userButton, &QPushButton::clicked, [this]() {
		this->centralWidget->setVisible(false);
		this->userWidget->setVisible(true);
		});
}

void LMDBv8::adminPopulateList() {
	this->moviesListWidget->clear();
	std::vector<Movie> movies = this->controller.getAllMovies();
	for (Movie& movie : movies) {
		this->moviesListWidget->addItem(QString::fromStdString(movie.getTitle() + " - " + movie.getGenre() + " - " + std::to_string(movie.getYear()) + " - " + std::to_string(movie.getLikes()) + " - " + movie.getTrailer()));
	}
}

void LMDBv8::adminConnectSignalsAndSlots() {
    QObject::connect(this->moviesListWidget, &QListWidget::clicked, [this]() {
		int selectedIndex = this->adminGetSelectedIndex();
		if (selectedIndex < 0)
			return;
		Movie movie = this->controller.getAllMovies()[selectedIndex];
		this->titleLineEdit->setText(QString::fromStdString(movie.getTitle()));
		this->genreLineEdit->setText(QString::fromStdString(movie.getGenre()));
		this->yearLineEdit->setText(QString::fromStdString(std::to_string(movie.getYear())));
		this->likesLineEdit->setText(QString::fromStdString(std::to_string(movie.getLikes())));
		this->trailerLineEdit->setText(QString::fromStdString(movie.getTrailer()));
		});
	QObject::connect(this->addButton, &QPushButton::clicked, this, &LMDBv8::adminAddMovie);
	QObject::connect(this->deleteButton, &QPushButton::clicked, this, &LMDBv8::adminDeleteMovie);
	QObject::connect(this->updateButton, &QPushButton::clicked, this, &LMDBv8::adminUpdateMovie);
    QObject::connect(this->mainMenuButton, &QPushButton::clicked, [this]() {
        this->centralWidget->setVisible(true);
		this->adminWidget->setVisible(false);
		this->userWidget->setVisible(false);
        });
}

int LMDBv8::adminGetSelectedIndex()
{
    QModelIndexList indexList = this->moviesListWidget->selectionModel()->selectedIndexes();
    if (indexList.size() == 0)
        return -1;
    int index = indexList.at(0).row();
    return index;
}

void LMDBv8::adminAddMovie() {
	std::string title = this->titleLineEdit->text().toStdString();
	std::string genre = this->genreLineEdit->text().toStdString();
	int year = this->yearLineEdit->text().toInt();
	int likes = this->likesLineEdit->text().toInt();
	std::string trailer = this->trailerLineEdit->text().toStdString();
	try {
		this->controller.addMovie(Movie{ title, genre, year, likes, trailer });
		this->adminPopulateList();
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

void LMDBv8::adminDeleteMovie() {
	int selectedIndex = this->adminGetSelectedIndex();
	if (selectedIndex < 0)
		return;
	Movie movie = this->controller.getAllMovies()[selectedIndex];
	try {
		this->controller.deleteMovie(movie);
		this->adminPopulateList();
	}
	catch (RepositoryException& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
	catch (std::exception& e) {
		QMessageBox::critical(this, "Error", QString::fromStdString(e.what()));
	}
}

void LMDBv8::adminUpdateMovie() {
	int selectedIndex = this->adminGetSelectedIndex();
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
		this->adminPopulateList();
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

void LMDBv8::userConnectSignalsAndSlots() {
	QObject::connect(this->seeByGenreButton, &QPushButton::clicked, this, &LMDBv8::userSeeByGenre);
	QObject::connect(this->addToWatchlistButton, &QPushButton::clicked, this, &LMDBv8::userAddToWatchlist);
	QObject::connect(this->deleteFromWatchlistButton, &QPushButton::clicked, this, &LMDBv8::userDeleteFromWatchlist);
	QObject::connect(this->seeWatchlistButton, &QPushButton::clicked, this, &LMDBv8::userSeeWatchlist);
	QObject::connect(this->nextButton, &QPushButton::clicked, this, &LMDBv8::userNext);
	QObject::connect(this->saveButton, &QPushButton::clicked, this, &LMDBv8::userSave);
	QObject::connect(this->mainMenuButtonUser, &QPushButton::clicked, [this]() {
		this->centralWidget->setVisible(true);
		this->adminWidget->setVisible(false);
		this->userWidget->setVisible(false);
		});
}

void LMDBv8::userSeeByGenre() {
	nextButton->setEnabled(true);
	QString genre = genreLineEditUser->text();

	if (genre.isEmpty()) {
		// Genre is empty, display a message or perform appropriate action
		movieLabel->setText("Please enter a genre.");
		nextButton->setEnabled(false);
		addToWatchlistButton->setEnabled(false);
		return;
	}

	std::string genreStr = genre.toStdString();
	this->watchlist = this->controller.filterMoviesByGenre(genreStr);

	if (!this->watchlist.isEmpty()) {
		nextButton->setEnabled(true);
		addToWatchlistButton->setEnabled(true);
		Movie movie = this->watchlist.getCurrentMovie();
		movieLabel->setText(QString::fromStdString(movie.getTitle() + " - " + movie.getGenre() + " - " + std::to_string(movie.getYear()) + " - " + std::to_string(movie.getLikes()) + " - " + movie.getTrailer()));
	}
	else {
		movieLabel->setText("No movies found!");
		nextButton->setEnabled(false);
		addToWatchlistButton->setEnabled(false);
	}


}

void LMDBv8::userNext() {
	this->watchlist.next();
	Movie movie = this->watchlist.getCurrentMovie();
	movieLabel->setText(QString::fromStdString(movie.getTitle() + " - " + movie.getGenre() + " - " + std::to_string(movie.getYear()) + " - " + std::to_string(movie.getLikes()) + " - " + movie.getTrailer()));
}

void LMDBv8::userAddToWatchlist() {
	Movie movie = this->watchlist.getCurrentMovie();
	this->controller.addMovieToWatchlist(movie);
	watchlist.deleteMovie(movie);
	userNext();
}

void LMDBv8::userSeeWatchlist() {
	deleteFromWatchlistButton->setEnabled(true);
	saveButton->setEnabled(true);
	nextButton->setEnabled(false);
	this->userPopulateList();
}

void LMDBv8::userPopulateList() {
	this->watchlistListWidget->clear();
	for (auto movie : this->controller.getWatchlist().getMovies()) {
		QString itemInList = QString::fromStdString(movie.getTitle() + " - " + movie.getGenre() + " - " + std::to_string(movie.getYear()) + " - " + std::to_string(movie.getLikes()) + " - " + movie.getTrailer());
		QListWidgetItem* item = new QListWidgetItem{ itemInList };
		this->watchlistListWidget->addItem(item);
	}
}

int LMDBv8::userGetSelectedIndex() const {
	QModelIndexList selectedIndexes = this->watchlistListWidget->selectionModel()->selectedIndexes();
	int selectedIndex = selectedIndexes.at(0).row();
	return selectedIndex;
}

void LMDBv8::userDeleteFromWatchlist() {
	int selectedIndex = this->userGetSelectedIndex();
	if (selectedIndex < 0)
		return;
	Movie movie = this->controller.getWatchlist().getMovies()[selectedIndex];
	this->controller.deleteMovieFromWatchlist(movie);
	this->userPopulateList();
}

void LMDBv8::userSave() {
	this->controller.saveWatchlist();
	this->controller.openWatchlist();
}

LMDBv8::~LMDBv8()
{}
