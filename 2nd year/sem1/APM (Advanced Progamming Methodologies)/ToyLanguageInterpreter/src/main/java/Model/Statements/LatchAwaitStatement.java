package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIStack;
import Datastructures.MyISyncTable;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

public class LatchAwaitStatement implements Statement {
    private final String variableName;

    public LatchAwaitStatement(String variableName) {
        this.variableName = variableName;
    }
    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyISyncTable latchTable = state.getLatchTable();

        if (!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined");
        }

        Value variableValue;
        try {
            variableValue = symbolTable.get(this.variableName);
            if (!variableValue.getType().equals(new IntType())) {
                throw new StatementException("Variable " + this.variableName + " is not of type int");
            }
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }

        int address = ((IntValue) variableValue).getValue();
        if (!latchTable.search(address)) {
            throw new StatementException("Address " + address + " is not defined in the latch table");
        }

        int count = (Integer) latchTable.get(address);
        if (count != 0) {
            stack.push(this);
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new LatchAwaitStatement(this.variableName);
    }

    @Override
    public String toString() {
        return "awaitLatch(" + this.variableName + ")";
    }
}
