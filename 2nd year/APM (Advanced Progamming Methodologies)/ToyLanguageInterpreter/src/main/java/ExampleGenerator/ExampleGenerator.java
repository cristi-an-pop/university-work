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
                ExampleGenerator.getExample6(),
                ExampleGenerator.getExample7(),
                ExampleGenerator.getExample8(),
                ExampleGenerator.getExample9(),
                ExampleGenerator.getExample10(),
                ExampleGenerator.getExample11(),
                ExampleGenerator.getExample12(),
                ExampleGenerator.getExample13(),
                ExampleGenerator.getExample14()
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

    private static Statement getExample7() {
//    While statement example
        Statement declaringV = new VarDeclStatement("v", new IntType());
        Statement assigningV = new AssignmentStatement("v", new ValueExpression(new IntValue(4)));
        Statement printingV = new PrintStatement(new VarExpression("v"));
        Statement decrementingV = new AssignmentStatement("v", new ArithmeticExpression(
                new VarExpression("v"), new ValueExpression(new IntValue(1)), 2));
        Statement whileStatement = new WhileStatement(new RelationalExpression(
                new VarExpression("v"), new ValueExpression(new IntValue(0)), 3),
                new CompoundStatement(printingV, decrementingV));

        return ExampleGenerator.buildExample(declaringV, assigningV, whileStatement);
    }

    private static Statement getExample8() {
        //v=0;
        //(repeat (fork(print(v);v=v-1);v=v+1) until v==3);
        //x=1;y=2;z=3;w=4;
        //print(v*10)
        Statement declaringV = new VarDeclStatement("v", new IntType());
        Statement assigningV = new AssignmentStatement("v", new ValueExpression(new IntValue(0)));
        Statement declaringX = new VarDeclStatement("x", new IntType());
        Statement declaringY = new VarDeclStatement("y", new IntType());
        Statement declaringZ = new VarDeclStatement("z", new IntType());
        Statement declaringW = new VarDeclStatement("w", new IntType());
        Statement assigningX = new AssignmentStatement("x", new ValueExpression(new IntValue(1)));
        Statement assigningY = new AssignmentStatement("y", new ValueExpression(new IntValue(2)));
        Statement assigningZ = new AssignmentStatement("z", new ValueExpression(new IntValue(3)));
        Statement assigningW = new AssignmentStatement("w", new ValueExpression(new IntValue(4)));
        Statement repeatUntil = new RepeatUntilStatement(new CompoundStatement(new ForkStatement(new CompoundStatement(
                new PrintStatement(new VarExpression("v")), new AssignmentStatement("v", new ArithmeticExpression(
                        new VarExpression("v"), new ValueExpression(new IntValue(1)), 2)))), new AssignmentStatement(
                "v", new ArithmeticExpression(new VarExpression("v"), new ValueExpression(new IntValue(1)), 1))),
                new RelationalExpression(new VarExpression("v"), new ValueExpression(new IntValue(3)), 5));
        Statement printV = new PrintStatement(new ArithmeticExpression(new VarExpression("v"), new ValueExpression(new IntValue(10)), 3));

        return ExampleGenerator.buildExample(declaringV, assigningV, declaringX, declaringY, declaringZ, declaringW,
                assigningX, assigningY, assigningZ, assigningW, repeatUntil, printV);
    }

    private static Statement getExample9() {
        //for v=0;v<3;v=v+1 print(v)
        Statement declaringV = new VarDeclStatement("v", new IntType());
        Statement assigningV = new AssignmentStatement("v", new ValueExpression(new IntValue(0)));
        Statement forStatement = new ForStatement(new AssignmentStatement("v", new ValueExpression(new IntValue(0))),
                new RelationalExpression(new VarExpression("v"), new ValueExpression(new IntValue(3)), 2),
                new AssignmentStatement("v", new ArithmeticExpression(new VarExpression("v"), new ValueExpression(new IntValue(1)), 1)),
                new PrintStatement(new VarExpression("v")));

        return ExampleGenerator.buildExample(declaringV, assigningV, forStatement);
    }

    private static Statement getExample10() {
        //bool b;
        //int c;
        //b=true;
        //c=b?100:200;
        //print(c);
        //c= (false)?100:200;
        //print(c);

        Statement declaringB = new VarDeclStatement("b", new BoolType());
        Statement declaringC = new VarDeclStatement("c", new IntType());
        Statement assigningB = new AssignmentStatement("b", new ValueExpression(new BoolValue(true)));
        Statement assigningC = new ConditionalAssignmentStatement("c", new VarExpression("b"),
                new ValueExpression(new IntValue(100)), new ValueExpression(new IntValue(200)));
        Statement printingC = new PrintStatement(new VarExpression("c"));
        Statement assigningC2 = new ConditionalAssignmentStatement("c", new ValueExpression(new BoolValue(false)),
                new ValueExpression(new IntValue(100)), new ValueExpression(new IntValue(200)));
        Statement printingC2 = new PrintStatement(new VarExpression("c"));

        return ExampleGenerator.buildExample(declaringB, declaringC, assigningB, assigningC, printingC, assigningC2, printingC2);
    }

    private static Statement getExample11() {
        //a=1;b=2;c=5;
        //(switch(a*10)
        //(case (b*c) : print(a);print(b))
        //(case (10) : print(100);print(200))
        //(default : print(300)));
        //print(300)

        Statement declaringA = new VarDeclStatement("a", new IntType());
        Statement declaringB = new VarDeclStatement("b", new IntType());
        Statement declaringC = new VarDeclStatement("c", new IntType());
        Statement assigningA = new AssignmentStatement("a", new ValueExpression(new IntValue(1)));
        Statement assigningB = new AssignmentStatement("b", new ValueExpression(new IntValue(2)));
        Statement assigningC = new AssignmentStatement("c", new ValueExpression(new IntValue(5)));
        Statement SwitchStatement = new SwitchStatement(
                new ArithmeticExpression(new VarExpression("a"), new ValueExpression(new IntValue(10)), 3),
                new ArrayList<>(Arrays.asList(
                        new ArithmeticExpression(new VarExpression("b"), new VarExpression("c"), 3),
                        new ValueExpression(new IntValue(10))
                )),
                new ArrayList<>(Arrays.asList(
                        new CompoundStatement(new PrintStatement(new VarExpression("a")), new PrintStatement(new VarExpression("b"))),
                        new CompoundStatement(new PrintStatement(new ValueExpression(new IntValue(100))), new PrintStatement(new ValueExpression(new IntValue(200)))),
                        new PrintStatement(new ValueExpression(new IntValue(300)))
                ))
        );
        Statement printing300 = new PrintStatement(new ValueExpression(new IntValue(300)));

        return ExampleGenerator.buildExample(declaringA, declaringB, declaringC, assigningA, assigningB, assigningC, SwitchStatement, printing300);
    }

    private static Statement getExample12() {
        //v=10;
        //(fork(v=v-1;v=v-1;print(v)); sleep(10);print(v*10)
        Statement declaringV = new VarDeclStatement("v", new IntType());
        Statement assigningV = new AssignmentStatement("v", new ValueExpression(new IntValue(10)));
        Statement fork = new ForkStatement(
                new CompoundStatement(
                        new AssignmentStatement("v", new ArithmeticExpression(new VarExpression("v"), new ValueExpression(new IntValue(1)), 2)),
                        new CompoundStatement(
                                new AssignmentStatement("v", new ArithmeticExpression(new VarExpression("v"), new ValueExpression(new IntValue(1)), 2)),
                                new PrintStatement(new VarExpression("v"))
                        )
                )
        );
        Statement sleep = new SleepStatement(10);
        Statement printV = new PrintStatement(new ArithmeticExpression(new VarExpression("v"), new ValueExpression(new IntValue(10)), 3));

        return ExampleGenerator.buildExample(declaringV, assigningV, fork, sleep, printV);
    }

    private static Statement getExample13() {
        //Ref int v1; Ref int v2; int x; int q;
        //new(v1,20);new(v2,30);newLock(x);
        //fork(
        //fork(
        //lock(x);wh(v1,rh(v1)-1);unlock(x)
        //);
        //lock(x);wh(v1,rh(v1)*10);unlock(x)
        //);newLock(q);
        //fork(
        //fork(lock(q);wh(v2,rh(v2)+5);unlock(q));
        //lock(q);wh(v2,rh(v2)*10);unlock(q)
        //
        //);
        //nop;nop;nop;nop;
        //lock(x); print(rh(v1)); unlock(x);
        //lock(q); print(rh(v2)); unlock(q);

        Statement declaringV1 = new VarDeclStatement("v1", new ReferenceType(new IntType()));
        Statement declaringV2 = new VarDeclStatement("v2", new ReferenceType(new IntType()));
        Statement declaringX = new VarDeclStatement("x", new IntType());
        Statement declaringQ = new VarDeclStatement("q", new IntType());
        Statement allocatingV1 = new HeapAllocationStatement("v1", new ValueExpression(new IntValue(20)));
        Statement allocatingV2 = new HeapAllocationStatement("v2", new ValueExpression(new IntValue(30)));
        Statement allocatingX = new NewLockStatement("x");
        Statement fork1 = new ForkStatement(
                new CompoundStatement(
                        new ForkStatement(
                                new CompoundStatement(
                                        new LockStatement("x"),
                                        new CompoundStatement(
                                                new HeapWriteStatement("v1", new ArithmeticExpression(new HeapReadExpression(new VarExpression("v1")), new ValueExpression(new IntValue(1)), 2)),
                                                new UnlockStatement("x")
                                        )
                                )
                        ),
                        new CompoundStatement(
                                new LockStatement("x"),
                                new CompoundStatement(
                                        new HeapWriteStatement("v1", new ArithmeticExpression(new HeapReadExpression(new VarExpression("v1")), new ValueExpression(new IntValue(10)), 3)),
                                        new UnlockStatement("x")
                                )
                        )
                )
        );
        Statement allocatingQ = new NewLockStatement("q");
        Statement fork2 = new ForkStatement(
                new CompoundStatement(
                        new ForkStatement(
                                new CompoundStatement(
                                        new LockStatement("q"),
                                        new CompoundStatement(
                                                new HeapWriteStatement("v2", new ArithmeticExpression(new HeapReadExpression(new VarExpression("v2")), new ValueExpression(new IntValue(5)), 3)),
                                                new UnlockStatement("q")
                                        )
                                )
                        ),
                        new CompoundStatement(
                                new LockStatement("q"),
                                new CompoundStatement(
                                        new HeapWriteStatement("v2", new ArithmeticExpression(new HeapReadExpression(new VarExpression("v2")), new ValueExpression(new IntValue(10)), 3)),
                                        new UnlockStatement("q")
                                )
                        )
                )
        );
        Statement nop1 = new NopStatement();
        Statement nop2 = new NopStatement();
        Statement nop3 = new NopStatement();
        Statement nop4 = new NopStatement();
        Statement lockX = new LockStatement("x");
        Statement printV1 = new PrintStatement(new HeapReadExpression(new VarExpression("v1")));
        Statement unlockX = new UnlockStatement("x");
        Statement lockQ = new LockStatement("q");
        Statement printV2 = new PrintStatement(new HeapReadExpression(new VarExpression("v2")));
        Statement unlockQ = new UnlockStatement("q");

        return ExampleGenerator.buildExample(declaringV1, declaringV2, declaringX, declaringQ, allocatingV1, allocatingV2, allocatingX, fork1, allocatingQ, fork2, nop1, nop2, nop3, nop4, lockX, printV1, unlockX, lockQ, printV2, unlockQ);
    }

    private static Statement getExample14() {
//    Lock example
        Statement declaringV1 = new VarDeclStatement("v1", new ReferenceType(new IntType()));
        Statement declaringV2 = new VarDeclStatement("v2", new ReferenceType(new IntType()));
        Statement declaringX = new VarDeclStatement("x", new IntType());
        Statement declaringQ = new VarDeclStatement("q", new IntType());
        Statement allocatingV1 = new HeapAllocationStatement("v1", new ValueExpression(new IntValue(20)));
        Statement allocatingV2 = new HeapAllocationStatement("v2", new ValueExpression(new IntValue(30)));

        Statement newLockX = new NewLockStatement("x");
        Statement lockX = new LockStatement("x");
        Statement unlockX = new UnlockStatement("x");
        Expression readHeapV1 = new HeapReadExpression(new VarExpression("v1"));
        Statement fork1 = new ForkStatement(
                new CompoundStatement(
                        new ForkStatement(
                                new CompoundStatement(
                                        lockX,
                                        new CompoundStatement(
                                                new HeapWriteStatement("v1", new ArithmeticExpression(
                                                        readHeapV1, new ValueExpression(new IntValue(1)), 2)),
                                                unlockX
                                        )
                                )
                        ),
                        new CompoundStatement(
                                lockX,
                                new CompoundStatement(
                                        new HeapWriteStatement("v1", new ArithmeticExpression(
                                                readHeapV1, new ValueExpression(new IntValue(10)), 3)),
                                        unlockX
                                )
                        )
                )
        );

        Statement newLockQ = new NewLockStatement("q");
        Statement lockQ = new LockStatement("q");
        Statement unlockQ = new UnlockStatement("q");
        Expression readHeapV2 = new HeapReadExpression(new VarExpression("v2"));
        Statement fork2 = new ForkStatement(
                new CompoundStatement(
                        new ForkStatement(
                                new CompoundStatement(
                                        lockQ,
                                        new CompoundStatement(
                                                new HeapWriteStatement("v2", new ArithmeticExpression(
                                                        readHeapV2, new ValueExpression(new IntValue(5)), 1)),
                                                unlockQ
                                        )
                                )
                        ),
                        new CompoundStatement(
                                lockQ,
                                new CompoundStatement(
                                        new HeapWriteStatement("v2", new ArithmeticExpression(
                                                readHeapV2, new ValueExpression(new IntValue(10)), 3)),
                                        unlockQ
                                )
                        )
                )
        );
        Statement nop = new NopStatement();
        Statement printV1 = new PrintStatement(readHeapV1);
        Statement printV2 = new PrintStatement(readHeapV2);

        return ExampleGenerator.buildExample(
                declaringV1, declaringV2, declaringX, declaringQ, allocatingV1, allocatingV2,
                newLockX, fork1, newLockQ, fork2,
                nop, nop, nop, nop,
                lockX, printV1, unlockX,
                lockQ, printV2, unlockQ
        );
    }

}

