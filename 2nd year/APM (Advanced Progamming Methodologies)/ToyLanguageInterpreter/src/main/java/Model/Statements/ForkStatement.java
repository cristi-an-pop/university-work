package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIStack;
import Datastructures.MyStack;
import Exceptions.ExpressionException;
import Exceptions.MyException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.Type;
import Model.Values.Value;

public class ForkStatement implements Statement {
    private final Statement statement;

    public ForkStatement(Statement statement) {
        this.statement = statement;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> newExecutionStack = new MyStack<>();
        MyIDictionary<String, Value> newSymbolTable = state.getSymbolTable().deepCopy();

        ProgramState newProgramState;
        try {
            newProgramState = new ProgramState(newExecutionStack, newSymbolTable, state.getHeap(),
                    state.getFileTable(), state.getOutput(), this.statement);
        } catch (MyException e) {
            throw new RuntimeException(e);
        }

        return newProgramState;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        this.statement.typeCheck(typeEnvironment.deepCopy());
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new ForkStatement(this.statement.deepCopy());
    }

    @Override
    public String toString() {
        return "fork(" + this.statement + ")";
    }
}
