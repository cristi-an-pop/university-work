package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.ReferenceType;
import Model.Types.Type;
import Model.Values.ReferenceValue;
import Model.Values.Value;

public class HeapAllocationStatement implements Statement {
    private final String variableName;
    private final Expression expression;

    public HeapAllocationStatement(String variableName, Expression expression) {
        this.variableName = variableName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " was not declared.");
        }
        Value value;
        try {
            value = symbolTable.get(this.variableName);
        } catch(DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        if(!value.getType().equals(new ReferenceType(null))) {
            throw new StatementException("Variable " + this.variableName + " is not of type reference.");
        }

        try {
            Value expressionValue = this.expression.eval(symbolTable, heap);
            ReferenceValue referenceValue = (ReferenceValue) value;
            if(!expressionValue.getType().equals(referenceValue.getLocationType())) {
                throw new StatementException("Declared type of variable " + this.variableName + " and type of expression do not match.");
            }

            int address = heap.add(expressionValue);
            try {
                symbolTable.update(this.variableName, new ReferenceValue(address, expressionValue.getType()));
            } catch (DictionaryException e) {
                throw new StatementException(e.getMessage());
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        Type variableType;
        try {
            variableType = typeEnvironment.get(this.variableName);
        } catch(DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        Type expressionType;
        try {
            expressionType = this.expression.typeCheck(typeEnvironment);
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        if(!variableType.equals(new ReferenceType(expressionType))) {
            throw new StatementException("Declared type of variable " + this.variableName + " and type of expression do not match.");
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new HeapAllocationStatement(this.variableName, this.expression.deepCopy());
    }

    @Override
    public String toString() {
        return "new(" + this.variableName + ", " + this.expression + ")";
    }
}
