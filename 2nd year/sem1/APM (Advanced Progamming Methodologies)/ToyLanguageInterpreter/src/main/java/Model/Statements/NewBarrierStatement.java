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

public class NewBarrierStatement implements Statement {
    private final String variableName;
    private final Expression expression;

    public NewBarrierStatement(String variableName, Expression expression) {
        this.variableName = variableName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();
        MyISyncTable barrierTable = state.getBarrierTable();

        Value valExp;
        try {
            valExp = this.expression.eval(symbolTable, heap);
            if (!valExp.getType().equals(new IntType())) {
                throw new StatementException("Expression " + this.expression + " is not of type int!");
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined!");
        }

        Value val = null;
        try {
            val = symbolTable.get(this.variableName);
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        if(!val.getType().equals(new IntType())) {
            throw new StatementException("Variable " + this.variableName + " is not of type int!");
        }

        int value = ((IntValue) valExp).getValue();
        Pair<Integer, List<Integer>> pair = new Pair<>(value, new ArrayList<>());
        int address = barrierTable.add(pair);
        try {
            symbolTable.update(this.variableName, new IntValue(address));
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        Type typeVariable;
        try {
            typeVariable = typeEnvironment.get(this.variableName);
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        if(!typeVariable.equals(new IntType())) {
            throw new StatementException("Variable " + this.variableName + " is not of type int!");
        }

        Type typeExpression;
        try {
            typeExpression = this.expression.typeCheck(typeEnvironment);
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        if(!typeExpression.equals(new IntType())) {
            throw new StatementException("Expression " + this.expression + " is not of type int!");
        }

        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new NewBarrierStatement(this.variableName, this.expression.deepCopy());
    }

    @Override
    public String toString() {
        return "newBarrier(" + this.variableName + ", " + this.expression + ")";
    }
}
