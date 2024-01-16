package View.GUI;

import Datastructures.MyDictionary;
import Datastructures.MyHeap;
import Datastructures.MyList;
import Datastructures.MyStack;
import ExampleGenerator.ExampleGenerator;
import Model.ProgramState.ProgramState;
import Repository.IRepository;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ListView;
import Repository.Repository;
import Controller.Controller;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

public class SelectWindowController implements Initializable {
    private final List<ProgramState> programs = new ArrayList<>();

    @FXML
    private ListView<String> selectProgramsList;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        this.createExamples();
        this.populateSelectProgramsList();
    }

    private void createExamples() {
        ExampleGenerator.getExamples().forEach(example -> {
            try {
                this.programs.add(new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyHeap(), new MyDictionary<>(), new MyList<>(), example));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    public void populateSelectProgramsList() {
        this.programs.forEach(program -> this.selectProgramsList.getItems().add(program.getOriginalProgram().toString()));
    }

    public void switchToMainWindow(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(GuiInterpreter.class.getResource("main-window.fxml"));

        Parent root = fxmlLoader.load();
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setMinHeight(800);
        stage.setMinWidth(1200);
        stage.setTitle("Toy Language Interpreter - Main");
        stage.show();

        this.loadProgram(fxmlLoader);
    }

    private void loadProgram(FXMLLoader fxmlLoader) {
        int selectedIndex = this.selectProgramsList.getSelectionModel().getSelectedIndex();
        if(selectedIndex < 0) {
            selectedIndex = 0;
        }
        ProgramState program = this.programs.get(selectedIndex);
        String logFilePath = "D:\\ubb\\university-work\\2nd year\\APM (Advanced Progamming Methodologies)\\ToyLanguageInterpreter\\src\\main\\java\\logs\\out.txt";
        IRepository repository = new Repository(program, logFilePath);
        Controller controller = new Controller(repository);

        MainWindowController mainWindowController = fxmlLoader.getController();
        mainWindowController.loadProgram(controller);
    }
}
