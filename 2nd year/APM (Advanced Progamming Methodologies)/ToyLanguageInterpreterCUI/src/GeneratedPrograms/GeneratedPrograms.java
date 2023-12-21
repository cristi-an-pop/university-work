package GeneratedPrograms;

import Datastructures.*;
import Exceptions.MyException;
import Model.Expressions.ArithmeticExpression;
import Model.Expressions.ValueExpression;
import Model.Expressions.VarExpression;
import Model.ProgramState.ProgramState;
import Model.Statements.*;
import Model.Types.BoolType;
import Model.Types.IntType;
import Model.Types.StringType;
import Model.Values.BoolValue;
import Model.Values.IntValue;
import Model.Values.StringValue;
import Model.Values.Value;

import java.io.BufferedReader;

public class GeneratedPrograms {
    public static ProgramState getProgram0() throws MyException {
        Statement statement = new CompoundStatement(
                new CompoundStatement(new VarDeclStatement("a", new IntType()),
                        new AssignmentStatement("a", new ValueExpression(new IntValue(1)))),
                new CompoundStatement(new AssignmentStatement("a", new ArithmeticExpression(new VarExpression("a"),
                        new ValueExpression(new IntValue(2)), 1)),
                        new PrintStatement(new VarExpression("a")))
        );
        MyIStack<Statement> stack = new MyStack<>();
        MyIDictionary<String, Value> symbolTable = new MyDictionary<>();
        MyIList<Value> output = new MyList<>();
        MyIDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
        MyIHeap heap = new MyHeap();

        ProgramState program;
        try {
            program = new ProgramState(stack, symbolTable, heap, fileTable, output, statement);
        } catch (MyException e) {
            throw new MyException(e.getMessage());
        }
        return program;
    }

    public static ProgramState getProgram1() throws MyException {
        Statement statement = new CompoundStatement(new VarDeclStatement("v", new IntType()),
                new CompoundStatement(new AssignmentStatement("v",
                        new ValueExpression(new IntValue(2))), new PrintStatement(new VarExpression("v"))));

        MyIStack<Statement> stack = new MyStack<>();
        MyIDictionary<String, Value> symbolTable = new MyDictionary<>();
        MyIList<Value> output = new MyList<>();
        MyIDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
        MyIHeap heap = new MyHeap();

        ProgramState program;
        try {
            program = new ProgramState(stack, symbolTable, heap, fileTable, output, statement);
        } catch (MyException e) {
            throw new MyException(e.getMessage());
        }
        return program;
    }

    public static ProgramState getProgram2() throws MyException {
        Statement statement = new CompoundStatement(new VarDeclStatement("a", new IntType()),
                new CompoundStatement(new VarDeclStatement("b", new IntType()),
                        new CompoundStatement(new AssignmentStatement("a",
                                new ArithmeticExpression(new ValueExpression(new IntValue(2)),
                                        new ArithmeticExpression(new ValueExpression(new IntValue(3)),
                                                new ValueExpression(new IntValue(5)), 3), 1)),
                                new CompoundStatement(new AssignmentStatement("b",
                                        new ArithmeticExpression(new VarExpression("a"), new ValueExpression(new IntValue(1)), 1)),
                                        new PrintStatement(new VarExpression("b"))))));

        MyIStack<Statement> stack = new MyStack<>();
        MyIDictionary<String, Value> symbolTable = new MyDictionary<>();
        MyIList<Value> output = new MyList<>();
        MyIDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
        MyIHeap heap = new MyHeap();

        ProgramState program;
        try {
            program = new ProgramState(stack, symbolTable, heap, fileTable, output, statement);
        } catch (MyException e) {
            throw new MyException(e.getMessage());
        }
        return program;
    }

    public static ProgramState getProgram3() throws MyException {
        Statement statement = new CompoundStatement(new VarDeclStatement("a", new BoolType()),
                new CompoundStatement(new VarDeclStatement("v",
                        new IntType()), new CompoundStatement(new AssignmentStatement("a",
                        new ValueExpression(new BoolValue(true))),
                        new CompoundStatement(new IfStatement(new VarExpression("a"),
                                new AssignmentStatement("v", new ValueExpression(new IntValue(2))),
                                new AssignmentStatement("v", new ValueExpression(new IntValue(3)))),
                                new PrintStatement(new VarExpression("v"))))));

        MyIStack<Statement> stack = new MyStack<>();
        MyIDictionary<String, Value> symbolTable = new MyDictionary<>();
        MyIList<Value> output = new MyList<>();
        MyIDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
        MyIHeap heap = new MyHeap();

        ProgramState program;
        try {
            program = new ProgramState(stack, symbolTable, heap, fileTable, output, statement);
        } catch (MyException e) {
            throw new MyException(e.getMessage());
        }
        return program;
    }

    public static ProgramState getProgram4() throws MyException {
        Statement statement = new CompoundStatement(new VarDeclStatement("varf", new StringType()),
                new CompoundStatement(new AssignmentStatement("varf", new ValueExpression(new StringValue("D:\\ubb\\MAP\\ToyLanguageInterpreter\\src\\Model\\Statements\\test.in"))),
                        new CompoundStatement(new OpenReadFileStatement(new VarExpression("varf")),
                                new CompoundStatement(new VarDeclStatement("varc", new IntType()),
                                        new CompoundStatement(new ReadFileStatement(new VarExpression("varf"), "varc"),
                                                new CompoundStatement(new PrintStatement(new VarExpression("varc")),
                                                        new CompoundStatement(new ReadFileStatement(new VarExpression("varf"), "varc"),
                                                                new CompoundStatement(new PrintStatement(new VarExpression("varc")),
                                                                        new CloseReadFile(new VarExpression("varf"))))))))));

        MyIStack<Statement> stack = new MyStack<>();
        MyIDictionary<String, Value> symbolTable = new MyDictionary<>();
        MyIList<Value> output = new MyList<>();
        MyIDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
        MyIHeap heap = new MyHeap();

        ProgramState program;
        try {
            program = new ProgramState(stack, symbolTable, heap, fileTable, output, statement);
        } catch (MyException e) {
            throw new MyException(e.getMessage());
        }
        return program;
    }
}
