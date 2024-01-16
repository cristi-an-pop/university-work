package Model.Expressions;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Model.Types.BoolType;
import Model.Types.Type;
import Model.Values.BoolValue;
import Model.Values.Value;

import java.util.HashMap;
import java.util.function.BiPredicate;

public class LogicalExpression implements Expression {
    private final Expression e1;
    private final Expression e2;
    private static final HashMap<Integer, BiPredicate<Boolean, Boolean>> operators = new HashMap<>();
    private static final HashMap<Integer, String> operatorsString = new HashMap<>();
    private final int operator;

    public LogicalExpression(Expression e1, Expression e2, int operator) {
        operators.put(1, (a, b) -> a && b);
        operatorsString.put(1, "&&");
        operators.put(2, (a, b) -> a || b);
        operatorsString.put(2, "||");
        operators.put(3, (a, b) -> a ^ b);
        operatorsString.put(3, "^");
        this.e1 = e1;
        this.e2 = e2;
        this.operator = operator;
    }

    @Override
    public Value eval(MyIDictionary<String, Value> table, MyIHeap heap) throws ExpressionException {
        Value v1, v2;
        v1 = e1.eval(table, heap);
        if (v1.getType().equals(new BoolType())) {
            v2 = e2.eval(table, heap);
            if (v2.getType().equals(new BoolType())) {
                BoolValue b1 = (BoolValue) v1;
                BoolValue b2 = (BoolValue) v2;
                boolean n1, n2;
                n1 = b1.getValue();
                n2 = b2.getValue();
                return new BoolValue(LogicalExpression.operators.get(this.operator).test(n1, n2));
            } else {
                throw new ExpressionException("Second operand is not a boolean.");
            }
        } else {
            throw new ExpressionException("First operand is not a boolean.");
        }
    }

    @Override
    public Type typeCheck(MyIDictionary<String, Type> typeEnvironment) throws ExpressionException {
        Type type1, type2;
        type1 = this.e1.typeCheck(typeEnvironment);
        type2 = this.e2.typeCheck(typeEnvironment);
        if (type1.equals(new BoolType())) {
            if (type2.equals(new BoolType())) {
                return new BoolType();
            } else {
                throw new ExpressionException("Second operand is not a boolean.");
            }
        } else {
            throw new ExpressionException("First operand is not a boolean.");
        }
    }

    @Override
    public Expression deepCopy() throws ExpressionException {
        return new LogicalExpression(this.e1.deepCopy(), this.e2.deepCopy(), this.operator);
    }

    public String toString() {
        return this.e1.toString() + " " + LogicalExpression.operatorsString.get(this.operator) + " " + this.e2.toString();
    }
}
