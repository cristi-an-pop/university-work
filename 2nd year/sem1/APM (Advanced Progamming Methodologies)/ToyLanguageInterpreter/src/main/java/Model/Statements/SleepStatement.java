package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.Type;

public class SleepStatement implements Statement {
    private final int sleepTime;

    public SleepStatement(int sleepTime) {
        this.sleepTime = sleepTime;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();
        if(this.sleepTime > 0) {
            stack.push(new SleepStatement(this.sleepTime - 1));
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new SleepStatement(this.sleepTime);
    }

    public String toString() {
        return "sleep(" + this.sleepTime + ")";
    }
}
