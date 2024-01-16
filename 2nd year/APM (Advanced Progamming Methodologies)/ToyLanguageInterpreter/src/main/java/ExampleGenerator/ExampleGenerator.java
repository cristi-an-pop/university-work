package ExampleGenerator;

import Datastructures.MyDictionary;
import Datastructures.MyIDictionary;
import Exceptions.StatementException;
import Model.Expressions.*;
import Model.Statements.*;
import Model.Types.*;
import Model.Values.BoolValue;
import Model.Values.IntValue;
import Model.Values.StringValue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ExampleGenerator {
    public static List<Statement> getExamples() {
        ArrayList<Statement> examples = new ArrayList<>(Arrays.asList(
                ExampleGenerator.getExample1(),
                ExampleGenerator.getExample2(),
                ExampleGenerator.getExample3(),
                ExampleGenerator.getExample4(),
                ExampleGenerator.getExample5(),
                ExampleGenerator.getExample6()
        ));

        for (int i = 0; i < examples.size(); i++) {
            MyIDictionary<String, Type> typeEnvironment = new MyDictionary<>();
            Statement example = examples.get(i);
            try {
                example.typeCheck(typeEnvironment);
            } catch (StatementException e) {
                examples.remove(i);
                System.out.println(example + " is not valid!");
                System.out.println(e.getMessage());
            }
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

    private static Statement getExample1() {
        Statement declaringV = new VarDeclStatement("v", new IntType());
        Statement declaringA = new VarDeclStatement("a", new ReferenceType(new IntType()));
        Statement assigningV = new AssignmentStatement("v", new ValueExpression(new IntValue(10)));
        Statement allocatingA = new HeapAllocationStatement("a", new ValueExpression(new IntValue(22)));
        Statement writingA = new HeapWriteStatement("a", new ValueExpression(new IntValue(30)));
        Statement assigningV2 = new AssignmentStatement("v", new ValueExpression(new IntValue(32)));
        Statement printingV = new PrintStatement(new VarExpression("v"));
        Statement printingA = new PrintStatement(new HeapReadExpression(new VarExpression("a")));
        Statement fork = new ForkStatement(new CompoundStatement(writingA, new CompoundStatement(assigningV2,
                new CompoundStatement(printingV, printingA))));
        Statement printingV2 = new PrintStatement(new VarExpression("v"));
        Statement printingA2 = new PrintStatement(new HeapReadExpression(new VarExpression("a")));

        return ExampleGenerator.buildExample(declaringV, declaringA, assigningV, allocatingA, fork, printingV2, printingA2);
    }

    private static Statement getExample2() {
        Statement ifStatemnt = new IfStatement(new RelationalExpression(new ValueExpression(new IntValue(10)), new ValueExpression(new IntValue(2)), 1),
                new NopStatement(), new NopStatement());
        return ExampleGenerator.buildExample(ifStatemnt);
    }

    private static Statement getExample3() {
        Statement ifStatement = new IfStatement(new ArithmeticExpression(new ValueExpression(new IntValue(10)), new ValueExpression(new IntValue(2)), 1),
                new NopStatement(), new NopStatement());
        return ExampleGenerator.buildExample(ifStatement);
    }

    private static Statement getExample4() {
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

    private static Statement getExample5() {
        Statement declaringA = new VarDeclStatement("a", new BoolType());
        Statement declaringV = new VarDeclStatement("v", new IntType());
        Statement assigningA = new AssignmentStatement("a", new ValueExpression(new BoolValue(true)));
        Statement ifStatement = new IfStatement(new VarExpression("a"),
                new AssignmentStatement("v", new ValueExpression(new IntValue(2))),
                new AssignmentStatement("v", new ValueExpression(new IntValue(3))));
        Statement printingV = new PrintStatement(new VarExpression("v"));

        return ExampleGenerator.buildExample(declaringA, declaringV, assigningA, ifStatement, printingV);
    }

    private static Statement getExample6() {
        Statement declaringV = new VarDeclStatement("v", new StringType());
        Statement assigningV = new AssignmentStatement("v", new ValueExpression(new StringValue("D:\\ubb\\university-work\\2nd year\\APM (Advanced Progamming Methodologies)\\ToyLanguageInterpreter\\src\\main\\java\\IO\\test.in")));
        Statement openingFile = new OpenReadFileStatement(new VarExpression("v"));
        Statement declaringC = new VarDeclStatement("c", new IntType());
        Statement readingC = new ReadFileStatement(new VarExpression("v"), "c");
        Statement printingC = new PrintStatement(new VarExpression("c"));
        Statement closingFile = new CloseReadFileStatement(new VarExpression("v"));

        return ExampleGenerator.buildExample(declaringV, assigningV, openingFile, declaringC, readingC,
                printingC, readingC, printingC, closingFile);
    }

}

