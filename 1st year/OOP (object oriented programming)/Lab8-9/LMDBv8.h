#pragma once

#include <QtWidgets/QMainWindow>
#include <QtWidgets/qpushbutton.h>
#include <QtWidgets/qlineedit.h>
#include <QtWidgets/qlistwidget.h>
#include <QtWidgets/qlayout.h>
#include <QtWidgets/qformlayout.h>
#include <QtWidgets/qmessagebox.h>
#include <QtWidgets/qwidget.h>
#include <QtWidgets/qlabel.h>
#include "ui_LMDBv8.h"
#include "Controller.h"
#include "RepositoryExceptions.h"

class LMDBv8 : public QMainWindow
{
    Q_OBJECT

public:
    Watchlist watchlist;

    LMDBv8(Controller& controller, QWidget *parent = nullptr);
    ~LMDBv8();
    void initGUI();
    void centralConnectSignalsAndSlots();

    void adminConnectSignalsAndSlots();
    int adminGetSelectedIndex();
    void adminPopulateList();
    void adminAddMovie();
    void adminDeleteMovie();
    void adminUpdateMovie();

    void userConnectSignalsAndSlots();
    void userAddToWatchlist();
    void userDeleteFromWatchlist();
    void userSeeWatchlist();
    void userSeeByGenre();
    void userSave();
    void userNext();
    void userPopulateList();
    int userGetSelectedIndex() const;

private:
    Ui::LMDBv8Class ui;
    Controller& controller;
    QWidget* centralWidget;
    QPushButton* adminButton;
    QPushButton* userButton;

    QWidget* adminWidget;
    QWidget* userWidget;
    
    // Admin
    QListWidget* moviesListWidget;
    QLineEdit* titleLineEdit;
    QLineEdit* genreLineEdit;
    QLineEdit* yearLineEdit;
    QLineEdit* likesLineEdit;
    QLineEdit* trailerLineEdit;
    QPushButton* addButton;
    QPushButton* deleteButton;
    QPushButton* updateButton;
    QPushButton* mainMenuButton;

    // User
    QListWidget* watchlistListWidget;
    QLabel* movieLabel;
    QLineEdit* genreLineEditUser;
    QPushButton* seeByGenreButton;
    QPushButton* addToWatchlistButton;
    QPushButton* deleteFromWatchlistButton;
    QPushButton* seeWatchlistButton;
    QPushButton* saveButton;
    QPushButton* nextButton;
};
