package ExampleGenerator;

import Datastructures.MyDictionary;
import Datastructures.MyIDictionary;
import Exceptions.MyException;
import Exceptions.StatementException;
import Model.Expressions.HeapReadExpression;
import Model.Expressions.ValueExpression;
import Model.Expressions.VarExpression;
import Model.Statements.*;
import Model.Types.IntType;
import Model.Types.ReferenceType;
import Model.Types.Type;
import Model.Values.IntValue;

import java.util.Arrays;
import java.util.List;

public class ExampleGenerator {
    public static List<Statement> getExamples() {
        List<Statement> examples = Arrays.asList(
                ExampleGenerator.getExample6()
        );

        for (Statement example : examples) {
            MyIDictionary<String, Type> typeEnvironment = new MyDictionary<>();
        }

        return examples;
    }

    private static Statement buildExample(Statement... statements) {
        if (statements.length == 0) {
            return new NopStatement();
        } else if (statements.length == 1) {
            return statements[0];
        }

        Statement example = new CompoundStatement(statements[0], statements[1]);
        for (int i = 2; i < statements.length; i++) {
            example = new CompoundStatement(example, statements[i]);
        }

        return example;
    }

    private static Statement getExample6() {
//    Heap handling example
        Statement declaringV = new VarDeclStatement("v", new ReferenceType(new IntType()));
        Statement allocatingV = new HeapAllocationStatement("v", new ValueExpression(new IntValue(20)));
        Statement declaringA = new VarDeclStatement("a", new ReferenceType(new ReferenceType(new IntType())));
        Statement allocatingA = new HeapAllocationStatement("a", new VarExpression("v"));
        Statement allocatingV2 = new HeapAllocationStatement("v", new ValueExpression(new IntValue(30)));
        Statement printingA = new PrintStatement(new HeapReadExpression(new HeapReadExpression(new VarExpression("a"))));
        Statement declaringG = new VarDeclStatement("g", new ReferenceType(new IntType()));
        Statement allocatingG = new HeapAllocationStatement("g", new ValueExpression(new IntValue(5)));
        Statement allocatingG2 = new HeapAllocationStatement("g", new ValueExpression(new IntValue(10)));
        Statement printingG = new PrintStatement(new HeapReadExpression(new VarExpression("g")));

        return ExampleGenerator.buildExample(declaringV, allocatingV, declaringA, allocatingA,
                allocatingV2, printingA, declaringG, allocatingG, allocatingG2, printingG);
    }
}

