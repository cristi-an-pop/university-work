package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.Expressions.UnaryExpression;
import Model.ProgramState.ProgramState;
import Model.Types.BoolType;
import Model.Types.Type;
import Model.Values.Value;

public class RepeatUntilStatement implements Statement {
    private final Statement innerStatement;
    private final Expression condition;

    public RepeatUntilStatement(Statement innerStatement, Expression condition) {
        this.innerStatement = innerStatement;
        this.condition = condition;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> executionStack = state.getExecutionStack();
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();

        try {
            Value conditionValue = this.condition.eval(symbolTable, heap);
            if (!conditionValue.getType().equals(new BoolType())) {
                throw new StatementException("Condition is not a boolean!");
            }
        } catch (ExpressionException e) {
            throw new StatementException("Stop condition could not be evaluated.");
        }
        Expression invertedCondition = new UnaryExpression(this.condition, "!");
        executionStack.push(new WhileStatement(invertedCondition, this.innerStatement));

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type conditionType = this.condition.typeCheck(typeEnvironment);
            if (!conditionType.equals(new BoolType())) {
                throw new StatementException("Condition is not a boolean!");
            }
            this.innerStatement.typeCheck(typeEnvironment.deepCopy());
        } catch (ExpressionException e) {
            throw new StatementException("Stop condition could not be evaluated.");
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new RepeatUntilStatement(this.innerStatement.deepCopy(), this.condition.deepCopy());
    }

    @Override
    public String toString() {
        return "repeat " + this.innerStatement.toString() + " until " + this.condition.toString();
    }
}
