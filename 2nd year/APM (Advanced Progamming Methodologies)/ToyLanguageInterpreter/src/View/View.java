package View;

import Controller.Controller;
import Exceptions.MyException;
import GeneratedPrograms.GeneratedPrograms;

import java.util.Objects;
import java.util.Scanner;

public class View {
    private final Controller controller;
    private static final Scanner scanner = new Scanner(System.in);

    public View(Controller controller) {
        this.controller = controller;
    }

    public void run() {
        this.setLogFilePath();
        int option;
        while(true) {
            View.printOptions();
            try {
                option = View.getOption();
                switch(option) {
                    case 1:
                        this.chooseProgram();
                        this.runProgram();
                    case 2:
                        System.out.println("Program output:\n" + this.controller.getProgramOutput() + "\n");
                        break;
                    case 3:
                        this.controller.toggleDebugFlag();
                        System.out.println("Now debug flag is " + this.controller.debugFlag);
                        break;
                    case 0:
                        System.out.println("Quitting...");
                        return;
                    default:
                        System.out.println("Invalid option!");

                }
            } catch (Exception e) {
                System.out.println("Something went wrong! " + e.getMessage());
                View.scanner.nextLine();
            }
        }
    }

    private void chooseProgram() throws MyException {
        System.out.print("Please enter the program number (0 to 3): ");
        int chosenProgram = Integer.parseInt(View.scanner.nextLine());
        switch (chosenProgram) {
            case 0:
                this.controller.setProgram(GeneratedPrograms.getProgram0());
                break;
            case 1:
                this.controller.setProgram(GeneratedPrograms.getProgram1());
                break;

            case 2:
                this.controller.setProgram(GeneratedPrograms.getProgram2());
                break;

            case 3:
                this.controller.setProgram(GeneratedPrograms.getProgram4());
                break;

            default:
                System.out.println("\nInvalid program number!");
        }
    }

    private void runProgram() {
        try {
            this.controller.allSteps();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private void setLogFilePath() {
        System.out.println("Type File Path for logs: ");
        String path = View.scanner.next();
        if(Objects.equals(path, "")) {
            path = "./logs/out.txt";
        }
        this.controller.setLogFilePath(path);
        System.out.println("Log File Path set to " + path);
    }

    private static void printOptions() {
        System.out.println("1. Choose program and run");
        System.out.println("2. Print program output");
        System.out.println("3. Toggle debug flag");
        System.out.println("0. Exit");
    }

    private static int getOption() {
        System.out.print("Please enter an option: ");
        int option = Integer.parseInt(View.scanner.nextLine());
        return option;
    }
}
