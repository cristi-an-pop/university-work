package View.CLI;

import Datastructures.*;
import Exceptions.MyException;
import Model.ProgramState.ProgramState;
import Model.Statements.*;
import Model.Values.Value;
import Repository.IRepository;
import Repository.Repository;
import Controller.Controller;
import View.CLI.Commands.ExitCommand;
import View.CLI.Commands.RunExampleCommand;
import ExampleGenerator.ExampleGenerator;

import java.io.BufferedReader;
import java.util.List;

public class CliInterpreter {
    public static void main(String[] args) {
        TextMenu menu = new TextMenu();
        CliInterpreter.addCommands("src/main/java/logs/out.txt", menu);
        menu.show();
    }

    private static void addCommands(String logFilePath, TextMenu menu) {
        List<Statement> examples = ExampleGenerator.getExamples();
        for (int i = 0; i < examples.size(); i++) {
            Statement example = examples.get(i);

            MyIStack<Statement> exeStack = new MyStack<>();
            MyIDictionary<String, Value> symTable = new MyDictionary<>();
            MyIList<Value> out = new MyList<>();
            MyIDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
            MyIHeap heap = new MyHeap();
            MyILockTable lockTable = new MyLockTable();
            MyISyncTable semaphoreTable = new MySemaphoreTable();
            MyISyncTable barrierTable = new MyBarrierTable();
            MyISyncTable latchTable = new MyLatchTable();
            ProgramState programState;

            try {
                programState = new ProgramState(exeStack, symTable, heap, fileTable, out, lockTable, semaphoreTable, barrierTable, latchTable, example);
            } catch (MyException e) {
                throw new RuntimeException(e);
            }

            IRepository repository = new Repository(programState, logFilePath);
            Controller controller = new Controller(repository);

            menu.addCommand(new RunExampleCommand(String.valueOf(i + 1), "Run example", controller));
        }

        menu.addCommand(new ExitCommand());
    }
}
