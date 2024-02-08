package Model.ProgramState;

import Datastructures.*;
import Exceptions.MyException;
import Model.Statements.Statement;
import Model.Values.Value;

import java.io.BufferedReader;
import java.util.*;

public class ProgramState {
    private final MyIStack<Statement> executionStack;
    private final MyIDictionary<String, Value> symbolTable;
    private final MyIDictionary<String, BufferedReader> fileTable;
    private final MyIHeap heap;
    private final MyIList<Value> output;
    private final MyILockTable lockTable;
    private final MyISyncTable semaphoreTable;
    private final MyISyncTable barrierTable;
    private final MyISyncTable latchTable;
    private final int id;
    private static final SortedSet<Integer> ids = new TreeSet<>();
    private final Statement originalProgram;

    public ProgramState(MyIStack<Statement> executionStack, MyIDictionary<String, Value> symbolTable, MyIHeap heap,
                        MyIDictionary<String, BufferedReader> fileTable, MyIList<Value> output, MyILockTable lockTable,
                        MyISyncTable semaphoreTable, MyISyncTable barrierTable, MyISyncTable latchTable, Statement originalProgram) throws MyException {
        this.executionStack = executionStack;
        this.symbolTable = symbolTable;
        this.heap = heap;
        this.fileTable = fileTable;
        this.output = output;
        this.lockTable = lockTable;
        this.semaphoreTable = semaphoreTable;
        this.barrierTable = barrierTable;
        this.latchTable = latchTable;
        this.originalProgram = originalProgram.deepCopy();
        this.id = ProgramState.generateNewId();
        executionStack.push(originalProgram);
    }

    public ProgramState oneStep() throws MyException {
        if (this.executionStack.isEmpty()) {
            throw new MyException("Execution stack is empty!");
        }
        Statement currentStatement = this.executionStack.pop();
        return currentStatement.execute(this);
    }

    private static int generateNewId() {
        Random random = new Random();
        int id;
        synchronized (ProgramState.ids) {
            do {
                id = random.nextInt(1000);
            } while (ProgramState.ids.contains(id));
            ProgramState.ids.add(id);
        }
        return id;
    }

    public boolean isNotCompleted() {
        return !this.executionStack.isEmpty();
    }

    @Override
    public String toString() {
        return "Program ID: " + this.id + "\n" +
                "Execution Stack:\n" + this.executionStack.toString() + "\n" +
                "Symbol Table:\n" + this.symbolTable.toString() + "\n" +
                "Output:\n" + this.output.toString() + "\n" +
                "File Table:\n" + this.fileTable.toString() + "\n" +
                "Heap:\n" + this.heap.toString() + "\n" +
                "Lock Table:\n" + this.lockTable.toString() + "\n" +
                "Semaphore Table:\n" + this.semaphoreTable.toString() + "\n" +
                "Barrier Table:\n" + this.barrierTable.toString() + "\n" +
                "Latch Table:\n" + this.latchTable.toString() + "\n";
    }

    public MyIStack<Statement> getExecutionStack() {
        return this.executionStack;
    }

    public MyIDictionary<String, Value> getSymbolTable() {
        return this.symbolTable;
    }

    public MyIList<Value> getOutput() {
        return this.output;
    }

    public MyILockTable getLockTable() {
        return this.lockTable;
    }

    public Statement getOriginalProgram() {
        return this.originalProgram;
    }

    public MyIDictionary<String, BufferedReader> getFileTable() {
        return this.fileTable;
    }

    public MyIHeap getHeap() {
        return this.heap;
    }

    public int getId() {
        return this.id;
    }

    public void setLockTable(MyILockTable lockTable) {
        this.lockTable.setMap(lockTable.getMap());
    }

    public MyISyncTable getSemaphoreTable() {
        return this.semaphoreTable;
    }

    public MyISyncTable getBarrierTable() {
        return this.barrierTable;
    }

    public MyISyncTable getLatchTable() {
        return this.latchTable;
    }

}
