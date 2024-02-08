package View.GUI;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class GuiInterpreter extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(GuiInterpreter.class.getResource("select-window.fxml"));
        Parent root = fxmlLoader.load();
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Toy Language Interpreter - Select");
        stage.setMinHeight(800);
        stage.setMinWidth(1200);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}
