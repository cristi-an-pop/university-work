package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Model.Types.Type;
import Model.Values.Value;

public interface Expression {
    Value eval(MyIDictionary<String, Value> table, MyIHeap heap) throws ExpressionException;
    Type typeCheck(MyIDictionary<String, Type> typeEnvironment) throws ExpressionException;
    Expression deepCopy() throws ExpressionException;
}
