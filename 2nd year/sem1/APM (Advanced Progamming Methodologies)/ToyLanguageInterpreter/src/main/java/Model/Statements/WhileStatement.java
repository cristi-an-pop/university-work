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
import Model.Values.Value;

public class WhileStatement implements Statement {
    private final Expression expression;
    private final Statement statement;

    public WhileStatement(Expression expression, Statement statement) {
        this.expression = expression;
        this.statement = statement;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();

        try {
            Value value = this.expression.eval(symbolTable, heap);
            if(!value.getType().equals(new BoolType())) {
                throw new StatementException("Expression " + this.expression + " is not of type bool.");
            }
            BoolValue boolValue = (BoolValue) value;
            if(boolValue.getValue()) {
                stack.push(this);
                stack.push(this.statement);
            }
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type expressionType = this.expression.typeCheck(typeEnvironment);
            if (!expressionType.equals(new BoolType())) {
                throw new StatementException("Expression " + this.expression + " is not a boolean");
            }
            this.statement.typeCheck(typeEnvironment.deepCopy());
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new WhileStatement(this.expression.deepCopy(), this.statement.deepCopy());
    }

    @Override
    public String toString() {
        return "while(" + this.expression + ") { " + this.statement + " }";
    }
}
