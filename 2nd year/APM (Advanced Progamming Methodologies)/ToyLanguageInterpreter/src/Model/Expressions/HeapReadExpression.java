package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Model.Types.ReferenceType;
import Model.Values.ReferenceValue;
import Model.Values.Value;

public class HeapReadExpression implements Expression {
    private final Expression expression;

    public HeapReadExpression(Expression expression) {
        this.expression = expression;
    }

    @Override
    public Value eval(MyIDictionary<String, Value> table, MyIHeap heap) throws ExpressionException {
        Value value = this.expression.eval(table, heap);
        if(!value.getType().equals(new ReferenceType(null))) {
            throw new ExpressionException("Expression " + this.expression.toString() + " is not of type reference.");
        }

        ReferenceValue referenceValue = (ReferenceValue) value;
        if(!heap.search(referenceValue.getAddress())) {
            throw new ExpressionException("Address " + referenceValue.getAddress() + " is not in the heap.");
        }

        return heap.get(referenceValue.getAddress());
    }

    @Override
    public Expression deepCopy() throws ExpressionException {
        return null;
    }

    @Override
    public String toString() {
        return "rH(" + this.expression.toString() + ")";
    }
}
