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

public class LockStatement implements Statement {
    private final String variableName;

    public LockStatement(String variableName) {
        this.variableName = variableName;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyILockTable lockTable = state.getLockTable();
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

        int address = ((IntValue) value).getValue();

        if(!lockTable.search(address)) {
            throw new StatementException("Address " + address + " is not in the lock table.");
        }

        if(lockTable.get(address) == -1) {
            lockTable.update(address, state.getId());
            state.setLockTable(lockTable);
        } else {
            state.getExecutionStack().push(this);
        }

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        Type variableType;
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
        return new LockStatement(this.variableName);
    }

    @Override
    public String toString() {
        return "lock(" + this.variableName + ")";
    }
}
