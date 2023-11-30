package Model.ProgramState;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Datastructures.MyIList;
import Datastructures.MyIStack;
import Exceptions.MyException;
import Exceptions.StatementException;
import Model.Statements.Statement;
import Model.Values.Value;

import java.io.BufferedReader;

public class ProgramState {
    private final MyIStack<Statement> executionStack;
    private final MyIDictionary<String, Value> symbolTable;
    private final MyIDictionary<String, BufferedReader> fileTable;
    private final MyIHeap heap;
    private final MyIList<Value> output;
    Statement originalProgram;

    public ProgramState(MyIStack<Statement> executionStack, MyIDictionary<String, Value> symbolTable, MyIHeap heap,
                        MyIDictionary<String, BufferedReader> fileTable, MyIList<Value> output,
                        Statement originalProgram) throws MyException {
        this.executionStack = executionStack;
        this.symbolTable = symbolTable;
        this.heap = heap;
        this.fileTable = fileTable;
        this.output = output;
        try {
            this.originalProgram = originalProgram.deepCopy();
        } catch (StatementException e) {
            throw new MyException(e.getMessage());
        }
        executionStack.push(originalProgram);
    }

    public String toString() {
        return "Execution Stack:\n" + this.executionStack.toString() +
                "\nSymbol Table:\n" + this.symbolTable.toString() +
                "\nOutput:\n" + this.output.toString() +
                "\nFile Table:\n" + this.fileTable.toString() +
                "\nHeap:\n" + this.heap.toString() + "\n";
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

    public Statement getOriginalProgram() {
        return this.originalProgram;
    }

    public MyIDictionary<String, BufferedReader> getFileTable() {
        return this.fileTable;
    }

    public MyIHeap getHeap() {
        return this.heap;
    }

    public void setOriginalProgram(Statement originalProgram) {
        this.originalProgram = originalProgram;
    }
}
