package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.Type;

public class ForStatement implements Statement {
    private final Statement initialization;
    private final Expression condition;
    private final Statement increment;
    private final Statement statement;

    public ForStatement(Statement initialization, Expression condition, Statement increment, Statement statement) {
        this.initialization = initialization;
        this.condition = condition;
        this.increment = increment;
        this.statement = statement;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();

        stack.push(new WhileStatement(this.condition, new CompoundStatement(this.statement, this.increment)));
        stack.push(this.initialization);

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            this.initialization.typeCheck(typeEnvironment.deepCopy());
            this.condition.typeCheck(typeEnvironment.deepCopy());
            this.increment.typeCheck(typeEnvironment.deepCopy());
            this.statement.typeCheck(typeEnvironment.deepCopy());
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new ForStatement(this.initialization.deepCopy(), this.condition.deepCopy(), this.increment.deepCopy(), this.statement.deepCopy());
    }

    public String toString() {
        return "for(" + this.initialization + "; " + this.condition + "; " + this.increment + ") " + this.statement;
    }
}
