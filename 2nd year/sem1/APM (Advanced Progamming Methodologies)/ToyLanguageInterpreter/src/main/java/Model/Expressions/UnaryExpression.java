package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Model.Types.BoolType;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.BoolValue;
import Model.Values.IntValue;
import Model.Values.Value;

import java.util.HashMap;
import java.util.Map;
import java.util.function.UnaryOperator;

public class UnaryExpression implements Expression {
    private final Expression expression;
    private final String operator;
    private static final Map<String, UnaryOperator<Boolean>> booleanOperators = new HashMap<>();
    private static final Map<String, UnaryOperator<Integer>> integerOperators = new HashMap<>();

    public UnaryExpression(Expression expression, String operator) {
        this.expression = expression;
        this.operator = operator;
        booleanOperators.put("!", a -> !a);
        integerOperators.put("--", a -> a - 1);
        integerOperators.put("++", a -> a + 1);
    }
    @Override
    public Value eval(MyIDictionary<String, Value> table, MyIHeap heap) throws ExpressionException {
        Value value = this.expression.eval(table, heap);
        if(value.getType().equals(new BoolType())) {
            return new BoolValue(booleanOperators.get(this.operator).apply(((BoolValue) value).getValue()));
        } else if(value.getType().equals(new IntType())) {
            return new IntValue(integerOperators.get(this.operator).apply(((IntValue) value).getValue()));
        } else {
            throw new ExpressionException("Expression " + this.expression + " is not of type bool or int.");
        }
    }

    @Override
    public Type typeCheck(MyIDictionary<String, Type> typeEnvironment) throws ExpressionException {
        if(!booleanOperators.containsKey(this.operator) && !integerOperators.containsKey(this.operator)) {
            throw new ExpressionException("Operator " + this.operator + " is not a valid unary operator.");
        }
        Type type = this.expression.typeCheck(typeEnvironment);
        if(type.equals(new BoolType())) {
            return new BoolType();
        } else if(type.equals(new IntType())) {
            return new IntType();
        } else {
            throw new ExpressionException("Expression " + this.expression + " is not of type bool or int.");
        }
    }

    @Override
    public Expression deepCopy() throws ExpressionException {
        return new UnaryExpression(this.expression.deepCopy(), this.operator);
    }

    @Override
    public String toString() {
        return this.operator + this.expression.toString();
    }
}
