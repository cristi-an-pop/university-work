package Repository;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.MyException;
import Model.ProgramState.ProgramState;
import Model.Values.Value;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class Repository implements IRepository {
    private final List<ProgramState> programStateList = new ArrayList<>();
    private final String logFilePath;

    public Repository(ProgramState initialProgram, String logFilePath) {
        this.programStateList.add(initialProgram);
        this.logFilePath = logFilePath;
    }

    @Override
    public List<ProgramState> getProgramStateList() {
        return List.copyOf(this.programStateList);
    }

    @Override
    public void setProgramStateList(List<ProgramState> programStateList) {
        this.programStateList.clear();
        this.programStateList.addAll(programStateList);
    }

    @Override
    public void logProgramStateExecution(ProgramState programState) throws MyException {
        try(PrintWriter logFile = new PrintWriter(new BufferedWriter(new FileWriter(this.logFilePath, true)))) {
            logFile.println(programState);
        } catch(IOException e) {
            throw new MyException("Could not open log file!");
        }
    }

    @Override
    public MyIHeap getHeap() {
        return this.programStateList.getFirst().getHeap();
    }

    @Override
    public MyIDictionary<String, Value> getSymbolTable() {
        return this.programStateList.getFirst().getSymbolTable();
    }


}
