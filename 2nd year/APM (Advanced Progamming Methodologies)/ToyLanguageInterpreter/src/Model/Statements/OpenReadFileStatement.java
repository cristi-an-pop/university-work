package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.StringType;
import Model.Values.StringValue;
import Model.Values.Value;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class OpenReadFileStatement implements Statement {
    private final Expression expression;

    public OpenReadFileStatement(Expression expression) {
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIDictionary<String, BufferedReader> fileTable = state.getFileTable();
        MyIHeap heap = state.getHeap();

        Value value;
        try {
            value = this.expression.eval(symbolTable, heap);
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }

        if(value.getType().equals(new StringType())) {
            StringValue stringValue = (StringValue) value;
            if(fileTable.search(stringValue.getValue())) {
                throw new StatementException("File " + stringValue + " is already open.");
            }
            else {
                BufferedReader bufferedReader;
                try {
                    bufferedReader = new BufferedReader(new FileReader(stringValue.getValue()));
                } catch(IOException e) {
                    throw new StatementException(e.getMessage() + " ok ");
                }
                fileTable.add(stringValue.getValue(), bufferedReader);
            }
        }
        else {
            throw new StatementException("Expression " + this.expression.toString() + " is not of type string.");
        }
        return state;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        try {
            return new OpenReadFileStatement(this.expression.deepCopy());
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
    }

    @Override
    public String toString() {
        return "openRFile(" + this.expression.toString() + ")";
    }
}
