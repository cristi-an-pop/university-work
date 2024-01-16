package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Model.Types.ReferenceType;
import Model.Types.Type;
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
            throw new ExpressionException("Expression " + this.expression + " is not of type reference.");
        }

        ReferenceValue referenceValue = (ReferenceValue) value;
        if(!heap.search(referenceValue.getAddress())) {
            throw new ExpressionException("Address " + referenceValue.getAddress() + " is not in the heap.");
        }

        return heap.get(referenceValue.getAddress());
    }

    @Override
    public Type typeCheck(MyIDictionary<String, Type> typeEnvironment) throws ExpressionException {
        Type type = this.expression.typeCheck(typeEnvironment);
        if(!type.equals(new ReferenceType(null))) {
            throw new ExpressionException("Expression " + this.expression + " is not of type reference.");
        }
        return ((ReferenceType) type).getInner();
    }

    @Override
    public Expression deepCopy() throws ExpressionException {
        return new HeapReadExpression(this.expression.deepCopy());
    }

    @Override
    public String toString() {
        return "rH(" + this.expression.toString() + ")";
    }
}
