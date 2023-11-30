package Repository;

import Exceptions.MyException;
import Model.ProgramState.ProgramState;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class Repository implements IRepository {
    private final List<ProgramState> programStateList = new ArrayList<>();
    private String logFilePath;
    private int currentProgramIndex = -1;

    public Repository(ProgramState initialProgram, String logFilePath) {
        this.programStateList.add(initialProgram);
        this.logFilePath = logFilePath;
    }

    @Override
    public void add(ProgramState programState) {
        this.programStateList.add(programState);
        this.currentProgramIndex++;
    }

    @Override
    public ProgramState get(int index) {
        return this.programStateList.get(index);
    }

    @Override
    public void set(int index, ProgramState programState) {
        this.programStateList.set(index, programState);
    }

    @Override
    public int size() {
        return this.programStateList.size();
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
    public void logProgramStateExecution() throws MyException {
        try(PrintWriter logFile = new PrintWriter(new BufferedWriter(new FileWriter(this.logFilePath, true)))) {
            logFile.println(this.programStateList.get(this.currentProgramIndex));
        } catch(IOException e) {
            throw new MyException("Could not open log file!");
        }
    }

    @Override
    public void setLogFilePath(String logFilePath) {
        this.logFilePath = logFilePath;
    }

    @Override
    public ProgramState getCurrentProgram() {
        return this.programStateList.get(this.currentProgramIndex);
    }
}
