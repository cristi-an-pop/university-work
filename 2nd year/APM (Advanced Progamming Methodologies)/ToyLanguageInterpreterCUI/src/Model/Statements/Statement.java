package Model.Statements;

import Datastructures.MyIDictionary;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.Type;

public interface Statement {
    ProgramState execute(ProgramState state) throws StatementException;
    MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException;
    Statement deepCopy() throws StatementException, ExpressionException;
}
