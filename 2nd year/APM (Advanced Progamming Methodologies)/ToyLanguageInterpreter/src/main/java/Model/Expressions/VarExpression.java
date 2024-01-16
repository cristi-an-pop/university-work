package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Model.Types.Type;
import Model.Values.Value;

public class VarExpression implements Expression {
    String id;

    public VarExpression(String id) {
        this.id = id;
    }

    @Override
    public Value eval(MyIDictionary<String, Value> table, MyIHeap heap) throws ExpressionException {
        try {
            return table.get(this.id);
        } catch (DictionaryException e) {
            throw new ExpressionException(e.getMessage());
        }
    }

    @Override
    public Type typeCheck(MyIDictionary<String, Type> typeEnvironment) throws ExpressionException {
        try {
            return typeEnvironment.get(this.id);
        } catch (DictionaryException e) {
            throw new ExpressionException(e.getMessage());
        }
    }

    @Override
    public Expression deepCopy() {
        return new VarExpression(this.id);
    }

    public String toString() {
        return this.id;
    }
}
