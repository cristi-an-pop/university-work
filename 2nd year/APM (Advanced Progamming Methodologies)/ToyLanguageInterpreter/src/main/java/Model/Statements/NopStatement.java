package Model.Statements;

import Datastructures.MyIDictionary;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.Type;

public class NopStatement implements Statement {
    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() {
        return new NopStatement();
    }

    public String toString() {
        return "nop";
    }
}
