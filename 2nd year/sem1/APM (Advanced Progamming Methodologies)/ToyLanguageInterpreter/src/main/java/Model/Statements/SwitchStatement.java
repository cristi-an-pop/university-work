package Model.Statements;

import Datastructures.MyIDictionary;
import Datastructures.MyIHeap;
import Datastructures.MyIStack;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Model.Expressions.Expression;
import Model.Expressions.RelationalExpression;
import Model.ProgramState.ProgramState;
import Model.Types.Type;
import Model.Values.Value;

import java.util.ArrayList;
import java.util.List;

public class SwitchStatement implements Statement {
    private final Expression condition;
    private final List<Expression> caseExpressions;
    private final List<Statement> caseStatements;

    public SwitchStatement(Expression condition, List<Expression> caseExpressions, List<Statement> caseStatements) {
        this.condition = condition;
        this.caseExpressions = caseExpressions;
        this.caseStatements = caseStatements;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatementException {
        MyIStack<Statement> stack = state.getExecutionStack();
        MyIDictionary<String, Value> symbolTable = state.getSymbolTable();
        MyIHeap heap = state.getHeap();

        try {
            Value conditionValue = this.condition.eval(symbolTable, heap);
            for(Expression caseExpression : caseExpressions) {
                Value caseExpressionValue = caseExpression.eval(symbolTable, heap);
                if(!conditionValue.getType().equals(caseExpressionValue.getType())) {
                    throw new StatementException("Condition value " + conditionValue + " and case expression value " + caseExpressionValue + " are not of the same type.");
                }
            }
        } catch(ExpressionException e) {
            throw new StatementException(e.getMessage());
        }

        Statement ifStatement = new IfStatement(
                new RelationalExpression(this.condition, this.caseExpressions.get(this.caseExpressions.size() - 1), 5),
                this.caseStatements.get(this.caseStatements.size() - 2),
                this.caseStatements.get(this.caseStatements.size() - 1)
        );

        for(int i = this.caseExpressions.size() - 2; i >= 0; i--) {
            ifStatement = new IfStatement(
                    new RelationalExpression(this.condition, this.caseExpressions.get(i), 5),
                    this.caseStatements.get(i),
                    ifStatement
            );
        }

        stack.push(ifStatement);

        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnvironment) throws StatementException {
        try {
            Type conditionType = this.condition.typeCheck(typeEnvironment);
            for(Expression caseExpression : caseExpressions) {
                Type caseExpressionType = caseExpression.typeCheck(typeEnvironment);
                if(!conditionType.equals(caseExpressionType)) {
                    throw new StatementException("Condition type " + conditionType + " and case expression type " + caseExpressionType + " are not of the same type.");
                }
            }
        } catch (ExpressionException e) {
            throw new StatementException(e.getMessage());
        }
        for(Statement caseStatement : caseStatements) {
            caseStatement.typeCheck(typeEnvironment.deepCopy());
        }
        return typeEnvironment;
    }

    @Override
    public Statement deepCopy() throws StatementException, ExpressionException {
        List<Expression> newCaseExpressions = new ArrayList<>();
        for (Expression expression : caseExpressions) {
            newCaseExpressions.add(expression.deepCopy());
        }
        List<Statement> newCaseStatements = new ArrayList<>();
        for (Statement statement : caseStatements) {
            newCaseStatements.add(statement.deepCopy());
        }

        return new SwitchStatement(condition.deepCopy(), newCaseExpressions, newCaseStatements);
    }

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("switch(").append(this.condition).append(") {");
        for(int i = 0; i < this.caseExpressions.size(); i++) {
            stringBuilder.append(" case ").append(this.caseExpressions.get(i)).append(": ").append(this.caseStatements.get(i)).append(";");
        }
        stringBuilder.append("}");
        return stringBuilder.toString();
    }
}
