package View.GUI;

import Exceptions.DictionaryException;
import Model.ProgramState.ProgramState;
import Model.Statements.Statement;
import Model.Values.Value;
import View.GUI.TableEntries.LockTableEntry;
import javafx.application.Platform;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import Controller.Controller;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ListView;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import View.GUI.TableEntries.HeapTableEntry;
import View.GUI.TableEntries.SymbolTableEntry;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

public class MainWindowController implements Initializable {
    private Controller program;
    private String selectedThread;

    @FXML
    private ListView<String> threadsList;
    @FXML
    private ListView<String> executionStackList;
    @FXML
    private TableView<SymbolTableEntry> symbolTable;
    @FXML
    private TableColumn<SymbolTableEntry, String> symbolTableIdColumn;
    @FXML
    private TableColumn<SymbolTableEntry, String> symbolTableValueColumn;
    @FXML
    private ListView<String> outputList;
    @FXML
    private ListView<String> fileTableList;
    @FXML
    private TableView<HeapTableEntry> heapTable;
    @FXML
    private TableColumn<HeapTableEntry, String> addressHeapTableColumn;
    @FXML
    private TableColumn<HeapTableEntry, String> valueHeapTableColumn;
    @FXML
    private TableView<LockTableEntry> lockTable;
    @FXML
    private TableColumn<LockTableEntry, String> addressLockTableColumn;
    @FXML
    private TableColumn<LockTableEntry, String> valueLockTableColumn;
    @FXML
    private TextField threadCountText;

    public void loadProgram(Controller controller) {
        this.program = controller;
        try {
            this.updateWindow();
        } catch (DictionaryException e) {
            throw new RuntimeException(e);
        }
        threadsList.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                Platform.runLater(() -> {
                    try {
                        changeThread();
                    } catch (DictionaryException e) {
                        throw new RuntimeException(e);
                    }
                });
            }
        });
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        this.symbolTableIdColumn.setCellValueFactory(cellData -> cellData.getValue().idProperty());
        this.symbolTableValueColumn.setCellValueFactory(cellData -> cellData.getValue().valueProperty());
        this.addressHeapTableColumn.setCellValueFactory(cellData -> cellData.getValue().addressProperty());
        this.valueHeapTableColumn.setCellValueFactory(cellData -> cellData.getValue().valueProperty());
        this.addressLockTableColumn.setCellValueFactory(cellData -> cellData.getValue().addressProperty());
        this.valueLockTableColumn.setCellValueFactory(cellData -> cellData.getValue().threadIdProperty());
    }

    public void updateWindow() throws DictionaryException {
        this.populateThreadsList();
        this.populateExecutionStackList();
        this.populateSymbolTable();
        this.populateOutputList();
        this.populateFileTable();
        this.populateHeapTable();
        this.populateLockTable();
        this.populateThreadCountText();
    }

    private void changeThread() throws DictionaryException {
        int selectedIndex = this.threadsList.getSelectionModel().getSelectedIndex();
        if(selectedIndex < 0) {
            selectedIndex = 0;
        }

        this.threadsList.getSelectionModel().select(selectedIndex);
        this.selectedThread = this.threadsList.getItems().get(selectedIndex);
    }

    private void populateThreadsList() {
        int selectedIndex = this.threadsList.getSelectionModel().getSelectedIndex();
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }

        this.threadsList.getItems().clear();
        this.program.getRepository().getProgramStateList()
                .forEach(programState -> {
                    this.threadsList.getItems().add(String.valueOf(programState.getId()));
                });

        this.threadsList.getSelectionModel().select(selectedIndex);
        this.selectedThread = this.threadsList.getItems().get(selectedIndex);
    }

    private void populateExecutionStackList() {
        this.executionStackList.getItems().clear();
        for (ProgramState programState : this.program.getRepository().getProgramStateList()) {
            if (String.valueOf(programState.getId()).equals(this.selectedThread)) {
                for (Statement statement : programState.getExecutionStack().reversed()) {
                    this.executionStackList.getItems().add(statement.toString());
                }
                break;
            }
        }
    }

    private void populateSymbolTable() throws DictionaryException {
        this.symbolTable.getItems().clear();
        for (ProgramState programState : this.program.getRepository().getProgramStateList()) {
            if (String.valueOf(programState.getId()).equals(this.selectedThread)) {
                for (String key : programState.getSymbolTable().keys()) {
                    SymbolTableEntry entry = new SymbolTableEntry(key, programState.getSymbolTable().get(key));
                    this.symbolTable.getItems().add(entry);
                }
                break;
            }
        }
    }

    private void populateOutputList() {
        this.outputList.getItems().clear();
        ProgramState programState = this.program.getRepository().getProgramStateList().getFirst();
        for (Value output : programState.getOutput().values()) {
            this.outputList.getItems().add(output.toString());
        }
    }

    private void populateFileTable() {
        this.fileTableList.getItems().clear();
        ProgramState programState = this.program.getRepository().getProgramStateList().getFirst();
        for (String file : programState.getFileTable().keys()) {
            this.fileTableList.getItems().add(file);
        }
    }

    private void populateHeapTable() {
        this.heapTable.getItems().clear();
        for (ProgramState programState : this.program.getRepository().getProgramStateList()) {
            if (String.valueOf(programState.getId()).equals(this.selectedThread)) {
                for (Integer address : programState.getHeap().keys()) {
                    HeapTableEntry entry = new HeapTableEntry(address, programState.getHeap().get(address));
                    this.heapTable.getItems().add(entry);
                }
                break;
            }
        }
    }

    private void populateLockTable() {
        this.lockTable.getItems().clear();
        for (ProgramState programState : this.program.getRepository().getProgramStateList()) {
            for (Integer address : programState.getLockTable().keySet()) {
                LockTableEntry entry = new LockTableEntry(address, programState.getLockTable().get(address));
                this.lockTable.getItems().add(entry);
            }
            break;
        }
    }

    private void populateThreadCountText() {
        String threadCountText = "Thread Count: ";
        threadCountText += this.program.getRepository().getProgramStateList().size();
        this.threadCountText.setText(threadCountText);
    }

    public void switchToSelectWindow(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(GuiInterpreter.class.getResource("select-window.fxml"));

        Parent root = fxmlLoader.load();
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setMinWidth(800);
        stage.setMinHeight(500);

        stage.setTitle("Toy Language Interpreter - Select Window");
        stage.show();
    }

    public void oneStep() {
        List<ProgramState> programStateList = this.program.removeCompletedPrograms(this.program.getRepository().getProgramStateList());

        if(programStateList.isEmpty()) {
            this.program.getExecutor().shutdownNow();
            return;
        }

        this.program.getRepository().getHeap().setContent(
                this.program.garbageCollector(
                        this.program.getAddrFromSymbolTable(this.program.getRepository().getSymbolTable().values()),
                        this.program.getRepository().getHeap().getContent()
                )
        );
        this.program.oneStepForAllPrograms(programStateList);

        try {
            this.updateWindow();
        } catch (DictionaryException e) {
            throw new RuntimeException(e);
        }

        programStateList = this.program.removeCompletedPrograms(this.program.getRepository().getProgramStateList());
        this.program.getRepository().setProgramStateList(programStateList);
    }

    public void allSteps() {
        while(!this.program.getRepository().getProgramStateList().isEmpty()) {
            this.oneStep();
        }
    }
}
