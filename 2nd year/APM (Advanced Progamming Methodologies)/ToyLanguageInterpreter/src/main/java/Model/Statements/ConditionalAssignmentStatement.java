package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.BoolType;
import Model.Types.Type;

public class ConditionalAssignmentStatement implements Statement {
    private final String variableName;
    private final Expression condition;
    private final Expression trueExpression;
    private final Expression falseExpression;

    public ConditionalAssignmentStatement(String variableName, Expression condition, Expression trueExpression, Expression falseExpression) {
        this.variableName = variableName;
        this.condition = condition;
        this.trueExpression = trueExpression;
        this.falseExpression = falseExpression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();

        stack.push(new IfStatement(
                this.condition,
                new AssignmentStatement(this.variableName, this.trueExpression),
                new AssignmentStatement(this.variableName, this.falseExpression)
        ));

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type conditionType = this.condition.typeCheck(typeEnvironment);
            if(!conditionType.equals(new BoolType())) {
                throw new StatementException("Condition is not a boolean!");
            }
            Type trueExpressionType = this.trueExpression.typeCheck(typeEnvironment);
            Type falseExpressionType = this.falseExpression.typeCheck(typeEnvironment);
            if(!trueExpressionType.equals(falseExpressionType)) {
                throw new StatementException("True expression and false expression are not of the same type!");
            }
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new ConditionalAssignmentStatement(this.variableName, this.condition.deepCopy(), this.trueExpression.deepCopy(), this.falseExpression.deepCopy());
    }

    @Override
    public String toString() {
        return this.variableName + " = " + this.condition + " ? " + this.trueExpression + " : " + this.falseExpression;
    }
}
