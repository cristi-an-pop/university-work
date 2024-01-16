package Repository;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.MyException;
import Model.ProgramState.ProgramState;
import Model.Values.Value;

import java.util.List;

public interface IRepository {
    List<ProgramState> getProgramStateList();
    void setProgramStateList(List<ProgramState> programStateList);
    void logProgramStateExecution(ProgramState programState) throws MyException;

    public MyIHeap getHeap();

    public MyIDictionary<String, Value> getSymbolTable();
}
