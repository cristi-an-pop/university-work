package Model.Statements;

import Datastructures.*;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

import java.util.ArrayList;
import java.util.List;

public class NewSemaphoreStatement implements Statement {
    private final String variableName;
    private final Expression expression1;

    public NewSemaphoreStatement(String variableName, Expression expression1) {
        this.variableName = variableName;
        this.expression1 = expression1;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();
        MyISyncTable semaphoreTable = state.getSemaphoreTable();

        Value valueExp;
        try {
            valueExp = this.expression1.eval(symbolTable, heap);
            if(!valueExp.getType().equals(new IntType())) {
                throw new StatementException("Expression " + this.expression1 + " is not of type int.");
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined.");
        }

        Value value;
        try {
            value = symbolTable.get(this.variableName);
            if(!value.getType().equals(new IntType())) {
                throw new StatementException("Variable " + this.variableName + " is not of type int.");
            }
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }

        int intValue = ((IntValue) valueExp).getValue();
        Pair<Integer, List<Integer>> pair = new Pair<>(intValue, new ArrayList<>());
        int address = semaphoreTable.add(pair);
        try {
            symbolTable.update(this.variableName, new IntValue(address));
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new NewSemaphoreStatement(this.variableName, this.expression1.deepCopy());
    }

    @Override
    public String toString() {
        return "newSemaphore(" + this.variableName + ", " + this.expression1 + ")";
    }

}
