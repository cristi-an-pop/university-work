# Parser Implementation Documentation

## Overview

This repository contains a **parser implementation** that processes inputs based on a specified grammar and generates parsing results. The parser is tested using two sets of input files:

1. **g1.txt + seq.txt** — for grammar `g1.txt` and sequence `seq.txt`.
2. **g2.txt + PIF.out** — for grammar `g2.txt` and PIF (Program Internal Form) tokens generated in **Lab 3**.

The parser generates two output files based on these inputs:

- **out1.txt** — Result of parsing when input is from `g1.txt` (sequence of tokens from `seq.txt`).
- **out2.txt** — Result of parsing when input is from `g2.txt` (Program Internal Form from `PIF.out`).

## Requirements

### Input Files

1. **g1.txt**: A file containing the grammar for the parser in a specified format (e.g., production rules).
2. **g2.txt**: Another grammar file used for the second sequence of tests.
3. **seq.txt**: A sequence of tokens (textual) that needs to be parsed based on `g1.txt`.
4. **PIF.out**: A file containing the Program Internal Form (PIF), output from the previous lab, used as input for parsing in the second test case.

### Output Files

- **out1.txt**: Contains the result of parsing the sequence of tokens from `seq.txt` using the grammar in `g1.txt`.
- **out2.txt**: Contains the result of parsing the Program Internal Form (PIF) tokens from `PIF.out` using the grammar in `g2.txt`.

## Key Functionalities

- **Scanner**: Tokenizes the input and generates a list of **Program Internal Form** (PIF) tokens from the source code.
- **Parser**: Uses a stack-based approach to parse input tokens based on a given grammar. It handles both nonterminal and terminal symbols, expanding nonterminals and verifying the syntax of the sequence.

## Parser Workflow

1. **Initialize Grammar**:
   - The parser first reads the grammar from the `g1.txt` or `g2.txt` file, depending on which test case is being run.

2. **Tokenization**:
   - For the first case (with `seq.txt`), the sequence of tokens is read and processed.
   - For the second case (with `PIF.out`), the Program Internal Form (PIF) is read and converted into a list of tokens for parsing.

3. **Parsing Process**:
   - The parser uses an **LL parsing approach** with a stack-based method:
     - If the top of the stack is a nonterminal, it is expanded using a production rule.
     - If it's a terminal, the token is matched with the current input.
     - If a mismatch is found, backtracking is performed, and the parser attempts to find another valid production rule.
     - If the parsing is successful, a success message is logged, otherwise, an error message with the token position is written to the output file.

4. **Error Handling**:
   - If an error occurs during parsing (such as a syntax error or no valid production rule), an error message with details about the position of the failed token in the input sequence is logged.
   
5. **Output**:
   - The result is written to `out1.txt` or `out2.txt` depending on the test case.
