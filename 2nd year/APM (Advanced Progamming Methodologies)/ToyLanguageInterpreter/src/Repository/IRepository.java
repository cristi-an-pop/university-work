package Repository;

import Exceptions.MyException;
import Model.ProgramState.ProgramState;

import java.util.List;

public interface IRepository {
    void add(ProgramState programState);

    ProgramState get(int index);

    void set(int index, ProgramState programState);

    int size();

    List<ProgramState> getProgramStateList();

    void logProgramStateExecution() throws MyException;

    void setLogFilePath(String logFilePath);

    ProgramState getCurrentProgram();
}
