#pragma once

#include <QtWidgets/QMainWindow>
#include "ui_LMDBv7.h"

class LMDBv7 : public QMainWindow
{
    Q_OBJECT

public:
    LMDBv7(QWidget *parent = nullptr);
    ~LMDBv7();

private:
    Ui::LMDBv7Class ui;
};
