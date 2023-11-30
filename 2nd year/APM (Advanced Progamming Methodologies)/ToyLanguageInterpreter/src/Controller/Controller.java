package Controller;

import Datastructures.MyIHeap;
import Datastructures.MyIStack;
import Exceptions.MyException;
import Model.ProgramState.ProgramState;
import Model.Statements.Statement;
import Model.Values.ReferenceValue;
import Model.Values.Value;
import Repository.IRepository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Controller {
    public boolean debugFlag;
    private final IRepository repository;

    public Controller(IRepository repository) {
        this.repository = repository;
        this.debugFlag = false;
    }

    public ProgramState oneStep(ProgramState programState) throws MyException {
        MyIStack<Statement> stack = programState.getExecutionStack();
        if (stack.isEmpty()) {
            throw new MyException("Execution stack is empty!");
        }
        Statement currentStatement = stack.pop();
        return currentStatement.execute(programState);
    }

    public void allSteps() throws MyException {
        ProgramState programState = this.repository.getCurrentProgram();
        System.out.println(programState);
        this.repository.logProgramStateExecution();
        while (!programState.getExecutionStack().isEmpty()) {
            this.oneStep(programState);
            this.repository.logProgramStateExecution();
            programState.getHeap().setContent(this.unsafeGarbageCollector(this.getAddrFromSymbolTable(programState.getSymbolTable().values()), programState.getHeap()));
            if(debugFlag) {
                System.out.println(programState);
            }
            this.repository.logProgramStateExecution();
        }
    }

    Map<Integer, Value> unsafeGarbageCollector(List<Integer> symbolTableAddr, MyIHeap heap) {
        return heap.entrySet().stream()
                .filter(e -> {
                    for(Value value : heap.values()) {
                        if(value instanceof ReferenceValue referenceValue) {
                            if(referenceValue.getAddress() == e.getKey()) {
                                return true;
                            }
                        }
                    }
                    return symbolTableAddr.contains(e.getKey());
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    List<Integer> getAddrFromSymbolTable(Collection<Value> symbolTableValues) {
        return symbolTableValues.stream()
                .filter(v -> v instanceof ReferenceValue)
                .map(v -> {
                    ReferenceValue v1 = (ReferenceValue) v;
                    return v1.getAddress();
                })
                .collect(Collectors.toList());
    }

    public String getProgramOutput() {
        return this.repository.getCurrentProgram().getOutput().toString();
    }

    public void toggleDebugFlag() {
        this.debugFlag = !this.debugFlag;
    }

    public void setProgram(ProgramState program) {
        this.repository.add(program);
    }

    public void setLogFilePath(String logFilePath) {
        this.repository.setLogFilePath(logFilePath);
    }

}
