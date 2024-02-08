package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Datastructures.MyIList;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.Type;
import Model.Values.Value;

public class PrintStatement implements Statement {
    private final Expression expression;

    public PrintStatement(Expression expression) {
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIList<Value> output = state.getOutput();
        MyIHeap heap = state.getHeap();
        Value value;
        try {
            value = this.expression.eval(state.getSymbolTable(), heap);
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        output.pushBack(value);
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            this.expression.typeCheck(typeEnvironment);
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        try {
            return new PrintStatement(this.expression.deepCopy());
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
    }

    @Override
    public String toString() {
        return "print(" + this.expression + ")";
    }
}
