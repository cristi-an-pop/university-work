package Model.Statements;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;

public interface Statement {
    ProgramState execute(ProgramState state) throws StatementException;
    Statement deepCopy() throws StatementException, ExpressionException;
}
