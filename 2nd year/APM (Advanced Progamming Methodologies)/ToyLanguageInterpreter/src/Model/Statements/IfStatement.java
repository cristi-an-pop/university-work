package Model.Statements;

import Datastructures.MyIHeap;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Values.BoolValue;

public class IfStatement implements Statement {
    private final Expression expression;
    private final Statement thenStatement;
    private final Statement elseStatement;

    public IfStatement(Expression expression, Statement thenStatement, Statement elseStatement) {
        this.expression = expression;
        this.thenStatement = thenStatement;
        this.elseStatement = elseStatement;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();
        MyIHeap heap = state.getHeap();
        BoolValue condition;
        try {
            condition = (BoolValue) this.expression.eval(state.getSymbolTable(), heap);
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        if (condition.getValue()) {
            stack.push(this.thenStatement);
        } else {
            stack.push(this.elseStatement);
        }
        return state;
    }

    @Override
    public Statement deepCopy() throws StatementException {
        try {
            return new IfStatement(this.expression.deepCopy(), this.thenStatement.deepCopy(), this.elseStatement.deepCopy());
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
    }

    public String toString() {
        return "IF(" + this.expression.toString() + ") THEN (" + this.thenStatement.toString() + ") ELSE (" + this.elseStatement.toString() + ")";
    }
}
