module View.GUI {
    requires javafx.controls;
    requires javafx.fxml;


    opens View.GUI to javafx.fxml;
    exports View.GUI;
}