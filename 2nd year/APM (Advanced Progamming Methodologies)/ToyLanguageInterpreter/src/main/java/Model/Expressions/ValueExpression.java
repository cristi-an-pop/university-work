package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Model.Types.Type;
import Model.Values.Value;

public class ValueExpression implements Expression {
    private final Value value;

    public ValueExpression(Value value) {
        this.value = value;
    }

    @Override
    public Value eval(MyIDictionary<String, Value> table, MyIHeap heap) {
        return this.value;
    }

    public Type typeCheck(MyIDictionary<String, Type> typeEnvironment) {
        return this.value.getType();
    }

    @Override
    public Expression deepCopy() {
        return new ValueExpression(this.value.deepCopy());
    }

    public String toString() {
        return this.value.toString();
    }
}
