package Model.Statements;

import Datastructures.MyIDictionary;
import Exceptions.StatementException;
import Model.ProgramState.ProgramState;
import Model.Types.Type;
import Model.Values.Value;

public class VarDeclStatement implements Statement {
    String variableName;
    Type type;

    public VarDeclStatement(String variableName, Type type) {
        this.variableName = variableName;
        this.type = type;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        if (symbolTable.search(this.variableName)) {
            throw new StatementException("Variable " + this.variableName + " is already defined.");
        } else {
            symbolTable.add(this.variableName, this.type.defaultValue());
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        typeEnvironment.add(this.variableName, this.type);
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() {
        return new VarDeclStatement(this.variableName, (Type) this.type.deepCopy());
    }

    public String toString() {
        return this.type + " " + this.variableName;
    }
}
