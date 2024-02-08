package Model.Statements;

import Datastructures.MyIDictionary;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

public class NewLockStatement implements Statement {
    private final String variableName;

    public NewLockStatement(String variableName) {
        this.variableName = variableName;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined in the symbol table.");
        }

        Value value = null;
        try {
            value = symbolTable.get(this.variableName);
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        if(!value.getType().equals(new IntType())) {
            throw new StatementException("Variable " + this.variableName + " is not of type int.");
        }

        int address = state.getLockTable().add();
        try {
            symbolTable.update(this.variableName, new IntValue(address));
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type variableType = typeEnvironment.get(this.variableName);
            if(!variableType.equals(new IntType())) {
                throw new StatementException("Variable " + this.variableName + " is not of type int.");
            }
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new NewLockStatement(this.variableName);
    }

    @Override
    public String toString() {
        return "newLock(" + this.variableName + ")";
    }
}
