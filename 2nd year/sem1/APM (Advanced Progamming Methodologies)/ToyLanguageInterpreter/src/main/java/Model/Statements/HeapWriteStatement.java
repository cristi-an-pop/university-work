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

public class HeapWriteStatement implements Statement {

    private final String variableName;
    private final Expression expression;

    public HeapWriteStatement(String variableName, Expression expression) {
        this.variableName = variableName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined.");
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

        ReferenceValue referenceValue = (ReferenceValue) value;

        if(!heap.search(referenceValue.getAddress())) {
            throw new StatementException("Address " + referenceValue.getAddress() + " is not in the heap.");
        }

        try {
            Value expressionValue = this.expression.eval(symbolTable, heap);
            if(!expressionValue.getType().equals(referenceValue.getLocationType())) {
                throw new StatementException("Expression " + this.expression + " is not of type " + referenceValue.getLocationType().toString() + ".");
            }

            heap.update(referenceValue.getAddress(), expressionValue);
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type type = typeEnvironment.get(this.variableName);
            if (!type.equals(new ReferenceType(null))) {
                throw new StatementException("Variable " + this.variableName + " is not a reference type.");
            }
            Type expressionType = this.expression.typeCheck(typeEnvironment);
            if (!expressionType.equals(((ReferenceType) type).getInner())) {
                throw new StatementException("Expression " + this.expression + " is not of type " +
                        ((ReferenceType) type).getInner() + ".");
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        } catch (DictionaryException e) {
            throw new RuntimeException(e);
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new HeapWriteStatement(this.variableName, this.expression.deepCopy());
    }

    @Override
    public String toString() {
        return "wH(" + this.variableName + ", " + this.expression + ")";
    }
}
