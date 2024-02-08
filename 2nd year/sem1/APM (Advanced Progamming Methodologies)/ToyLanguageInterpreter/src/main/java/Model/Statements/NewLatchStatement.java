package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Datastructures.MyISyncTable;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

public class NewLatchStatement implements Statement {
    private final String variableName;
    private final Expression expression;

    public NewLatchStatement(String variableName, Expression expression) {
        this.variableName = variableName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();
        MyISyncTable latchTable = state.getLatchTable();

        Value value;
        try {
            value = this.expression.eval(symbolTable, heap);
            if (!value.getType().equals(new IntType())) {
                throw new StatementException("Expression " + this.expression + " is not of type int");
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }

        if (!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined");
        }

        try {
            Value variableValue = symbolTable.get(this.variableName);
            if (!variableValue.getType().equals(new IntType())) {
                throw new StatementException("Variable " + this.variableName + " is not of type int");
            }
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }

        int number = ((IntValue) value).getValue();
        int address = latchTable.add(number);

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
        return new NewLatchStatement(this.variableName, this.expression.deepCopy());
    }

    @Override
    public String toString() {
        return "newLatch(" + this.variableName + ", " + this.expression.toString() + ")";
    }
}
