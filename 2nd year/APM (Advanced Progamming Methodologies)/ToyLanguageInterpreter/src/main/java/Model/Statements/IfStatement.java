package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.BoolType;
import Model.Types.Type;
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
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type typeExpression = this.expression.typeCheck(typeEnvironment);
            if (!typeExpression.equals(new BoolType())) {
                throw new StatementException("The condition of IF has not the type bool.");
            }
            this.thenStatement.typeCheck(typeEnvironment.deepCopy());
            this.elseStatement.typeCheck(typeEnvironment.deepCopy());
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return typeEnvironment;
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
        return "IF(" + this.expression.toString() + ") THEN (" + this.thenStatement + ") ELSE (" + this.elseStatement + ")";
    }
}
