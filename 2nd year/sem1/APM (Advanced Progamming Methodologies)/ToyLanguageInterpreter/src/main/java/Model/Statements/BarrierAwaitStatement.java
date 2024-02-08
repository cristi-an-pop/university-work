package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIStack;
import Datastructures.MyISyncTable;
import Datastructures.Pair;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.IntType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.Value;

import java.util.List;

public class BarrierAwaitStatement implements Statement {
    private final String variableName;

    public BarrierAwaitStatement(String variableName) {
        this.variableName = variableName;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyISyncTable barrierTable = state.getBarrierTable();

        if(!symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is not defined.");
        }

        Value val = null;
        try {
            val = symbolTable.get(this.variableName);
        } catch (DictionaryException e) {
            throw new RuntimeException(e);
        }
        if(!val.getType().equals(new IntType())) {
            throw new StatementException("Variable " + this.variableName + " is not of type int.");
        }

        int address = ((IntValue) val).getValue();
        if(!barrierTable.search(address)) {
            throw new StatementException("Barrier " + address + " is not defined.");
        }

        Pair<Integer, List<Integer>> pair = (Pair<Integer, List<Integer>>) barrierTable.get(address);
        int NL = pair.getSecond().size();
        if(pair.getFirst() > NL) {
            if(!pair.getSecond().contains(state.getId())) {
                pair.getSecond().add(state.getId());
            }
            stack.push(this);
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        Type typeVariable;
        try {
            typeVariable = typeEnvironment.get(this.variableName);
        } catch (DictionaryException e) {
            throw new StatementException(e.getMessage());
        }
        if(!typeVariable.equals(new IntType())) {
            throw new StatementException("Variable " + this.variableName + " is not of type int.");
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        return new BarrierAwaitStatement(this.variableName);
    }

    @Override
    public String toString() {
        return "await(" + this.variableName + ")";
    }
}
