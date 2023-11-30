package Model.Statements;

import Exceptions.StatementException;
import Model.ProgramState.ProgramState;

public class NopStatement implements Statement {
    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        return state;
    }

    @Override
    public Statement deepCopy() {
        return new NopStatement();
    }

    public String toString() {
        return "nop";
    }
}
