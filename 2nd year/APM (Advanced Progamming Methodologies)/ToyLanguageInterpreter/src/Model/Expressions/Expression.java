package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Model.Values.Value;

public interface Expression {
    Value eval(MyIDictionary<String, Value> table, MyIHeap heap) throws ExpressionException;
    Expression deepCopy() throws ExpressionException;
}
