package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Exceptions.DictionaryException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.ProgramState.ProgramState;
import Model.Types.Type;
import Model.Values.Value;

public class AssignmentStatement implements Statement {
    private final String variableName;
    private final Expression expression;

    public AssignmentStatement(String variableName, Expression expression) {
        this.variableName = variableName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();

        if(symbolTable.search(this.variableName)) {
            Value value;
            try {
                value = this.expression.eval(symbolTable, heap);
            } catch(ExpressionException e) {
                throw new StatementException(e.getMessage());
            }
            Type variableType;
            try {
                variableType = (symbolTable.get(this.variableName).getType());
            } catch(DictionaryException e) {
                throw new StatementException(e.getMessage());
            }
            if(value.getType().equals(variableType)) {
                try {
                    symbolTable.update(this.variableName, value);
                } catch(DictionaryException e) {
                    throw new StatementException(e.getMessage());
                }
            }
            else
            {
                throw new StatementException("Declared type of variable " + this.variableName + " and type of the assigned expression do not match.");
            }
        }
        else {
            throw new StatementException("The used variable " + this.variableName + " was not declared before.");
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type typeId = typeEnvironment.get(this.variableName);
            Type typeExpression = this.expression.typeCheck(typeEnvironment);
            if (!typeId.equals(typeExpression)) {
                throw new StatementException("Declared type of variable " + this.variableName +
                        " and type of the assigned expression do not match.");
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        } catch (DictionaryException e) {
            throw new RuntimeException(e);
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException {
        try {
            return new AssignmentStatement(this.variableName, this.expression.deepCopy());
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
    }

    public String toString() {
        return this.variableName + "=" + this.expression;
    }
}
