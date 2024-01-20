package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyILockTable;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

public class UnlockStatement implements Statement {
    private final String variableName;

    public UnlockStatement(String variableName) {
        this.variableName = variableName;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyILockTable lockTable = state.getLockTable();

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
            throw new StatementException("Variable " + this.variableName + " is not of type int. UNLOCK");
        }

        int address = ((IntValue) value).getValue();
        if(!lockTable.search(address)) {
            throw new StatementException("Address " + address + " is not in the lock table.");
        }

        if(lockTable.get(address) == state.getId()) {
            lockTable.update(address, -1);
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        Type variableType = null;
        try {
            variableType = typeEnvironment.get(this.variableName);
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        if(!variableType.equals(new IntType())) {
            throw new StatementException("Variable " + this.variableName + " is not of type int.");
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new UnlockStatement(this.variableName);
    }

    @Override
    public String toString() {
        return "unlock(" + this.variableName + ")";
    }
}
