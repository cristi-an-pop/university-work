package Model.Statements;

import Datastructures.*;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

import java.util.List;

public class ReleaseStatement implements Statement {
    private final String variableName;

    public ReleaseStatement(String variableName) {
        this.variableName = variableName;
    }
    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyISyncTable semaphoreTable = state.getSemaphoreTable();

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined.");
        }
        Value val;
        try {
            val = symbolTable.get(this.variableName);
            if(!val.getType().equals(new IntType())) {
                throw new StatementException("Variable " + this.variableName + " is not of type int.");
            }
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }

        int address = ((IntValue) val).getValue();
        if(!semaphoreTable.search(address)) {
            throw new StatementException("Semaphore " + address + " is not defined.");
        }

        Pair<Integer, List<Integer>> pair = (Pair<Integer, List<Integer>>) semaphoreTable.get(address);
        if(pair.getSecond().contains(state.getId())) {
            pair.getSecond().remove(state.getId());
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new ReleaseStatement(this.variableName);
    }

    @Override
    public String toString() {
        return "release(" + this.variableName + ")";
    }
}
