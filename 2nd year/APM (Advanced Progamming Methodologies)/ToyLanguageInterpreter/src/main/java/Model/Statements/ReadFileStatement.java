package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.DictionaryException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.StringType;
import Model.Types.Type;
import Model.Values.IntValue;
import Model.Values.StringValue;
import Model.Values.Value;
import Model.Types.IntType;

import java.io.BufferedReader;

public class ReadFileStatement implements Statement {
    private final Expression expression;
    private final String variableName;

    public ReadFileStatement(Expression expression, String variableName) {
        this.expression = expression;
        this.variableName = variableName;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIDictionary<String, BufferedReader> fileTable = state.getFileTable();
        MyIHeap heap = state.getHeap();

        Value value;
        try {
            value = this.expression.eval(symbolTable, heap);
        } catch(Exception e) {
            throw new StatementException(e.getMessage());
        }

        if(value.getType().equals(new StringType())) {
            StringValue stringValue = (StringValue) value;
            if(!fileTable.search(stringValue.getValue())) {
                throw new StatementException("File " + stringValue + " is not open.");
            }
            else {
                BufferedReader bufferedReader;
                try {
                    bufferedReader = fileTable.get(stringValue.getValue());
                } catch(DictionaryException e) {
                    throw new StatementException(e.getMessage());
                }
                String line;
                try {
                    line = bufferedReader.readLine();
                } catch(Exception e) {
                    throw new StatementException(e.getMessage());
                }
                if(line == null) {
                    IntType intType = new IntType();
                    symbolTable.add(this.variableName, intType.defaultValue());
                }
                else {
                    symbolTable.add(this.variableName, new IntValue(Integer.parseInt(line)));
                }
            }
        }
        else {
            throw new StatementException("Expression " + this.expression + " is not of type string.");
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        Type expressionType;
        try {
            expressionType = this.expression.typeCheck(typeEnvironment);
        } catch(Exception e) {
            throw new StatementException(e.getMessage());
        }
        if(expressionType.equals(new StringType())) {
            Type variableType;
            try {
                variableType = typeEnvironment.get(this.variableName);
            } catch(DictionaryException e) {
                throw new StatementException(e.getMessage());
            }
            if(variableType.equals(new IntType())) {
                return typeEnvironment;
            }
            else {
                throw new StatementException("The variable " + this.variableName + " is not of type int.");
            }
        } else {
            throw new StatementException("The expression of openRFile is not of type string.");
        }
    }

    @Override
    public Statement deepCopy() throws StatementException {
        try {
            return new ReadFileStatement(this.expression.deepCopy(), this.variableName);
        } catch(Exception e) {
            throw new StatementException(e.getMessage());
        }
    }

    @Override
    public String toString() {
        return "readFile(" + this.expression + ", " + this.variableName + ")";
    }
}
