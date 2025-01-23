%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define YYDEBUG 1

char production_buffer[2048] = "";
void append_production(const char* prod);
%}

%token LET
%token INT
%token FLOAT
%token BOOL
%token ARRAY
%token OF
%token IF
%token THEN
%token ELSE
%token WHILE
%token NUMBER
%token DO
%token FOR
%token END
%token INPUT
%token OUTPUT
%token RETURN
%token FUNC
%token AND
%token OR

%token ID
%token CONST

%token COLON
%token SEMI_COLON
%token COMMA
%token OPEN_CURLY
%token CLOSE_CURLY
%token OPEN_BRACKET
%token CLOSE_BRACKET
%token OPEN_PAREN
%token CLOSE_PAREN

%left '+' '-' '*' '/'

%token PLUS
%token MINUS
%token MUL
%token DIV

%token ASSIGN
%token LT
%token GT
%token LE
%token GE
%token EQ
%token NE


%start program

%%

program: LET stmt_list END {
            append_production("program -> LET stmt_list END");
        }
       ;

declaration: ID COLON type SEMI_COLON {
                append_production("declaration: ID COLON type SEMI_COLON");
            }
            ;

type: INT {
        append_production("type: INT");
    }
    | BOOL {
        append_production("type: BOOL");
    }
    | FLOAT {
        append_production("type: FLOAT");
    }
    | typeTemp {
        append_production("type: typeTemp");
    }
    ;

typeTemp: /*Empty*/ | ARRAY OPEN_BRACKET CONST CLOSE_BRACKET OF type {
            append_production("typeTemp: ARRAY OPEN_BRACKET CONST CLOSE_BRACKET OF type");
        }
        ;
stmt_list: stmt stmt_temp {
            append_production("stmt_list: stmt stmt_temp");
         }
         ;

stmt_temp: /*Empty*/ | stmt_list {
            append_production("stmt_temp: stmt_list");
          }
          ;

stmt: simple_stmt { 
        append_production("stmt: simple_stmt");
      }
    | compl_stmt {
        append_production("stmt: compl_stmt");
      }
    ;

simple_stmt: assign_stmt {
                append_production("simple_stmt: assign_stmt");
            }
           | declaration {
                append_production("simple_stmt: declaration");
           }
           ;

assign_stmt: ID ASSIGN expression SEMI_COLON {
                append_production("assign_stmt: ID ASSIGN expression SEMI_COLON");
            }
            | IndexedIdentifier ASSIGN expression SEMI_COLON {
                append_production("assign_stmt: IndexedIdentifier ASSIGN expression SEMI_COLON");
            }
            | ID ASSIGN OPEN_CURLY assign_stmt_temp CLOSE_CURLY SEMI_COLON {
                append_production("assign_stmt: ID ASSIGN OPEN_CURLY assign_stmt_temp CLOSE_CURLY SEMI_COLON");
            }
            ;

assign_stmt_temp: CONST { 
                    append_production("assign_stmt_temp: CONST");
                }
                | CONST COMMA assign_stmt_temp {
                    append_production("assign_stmt_temp: CONST COMMA assign_stmt_temp");
                }
                | /*Empty*/ {
                    append_production("assign_stmt_temp: Empty");
                }
                ;

compl_stmt: if_stmt {
                append_production("compl_stmt: if_stmt");
            }
          | while_stmt {
                append_production("compl_stmt: while_stmt");
            }
          | io_stmt {
                append_production("compl_stmt: io_stmt");
            }
          ;

if_stmt: IF boolean_condition THEN stmt_list END {
            append_production("if_stmt: IF boolean_condition THEN stmt_list END");
        }
       | IF boolean_condition THEN stmt_list ELSE stmt_list END {
            append_production("if_stmt: IF boolean_condition THEN stmt_list ELSE stmt_list END");
        }
       ;

while_stmt: WHILE boolean_condition DO stmt_list END {
                append_production("while_stmt: WHILE boolean_condition DO stmt_list END");
            }
          ;

io_stmt: output_stmt {
            append_production("io_stmt: output_stmt");
        }
       | input_stmt {
            append_production("io_stmt: input_stmt");
        }
       ;

output_stmt: OUTPUT OPEN_PAREN expression CLOSE_PAREN SEMI_COLON {
                append_production("output_stmt: OUTPUT OPEN_PAREN expression CLOSE_PAREN SEMI_COLON");
            }
           ;

input_stmt: INPUT OPEN_PAREN ID CLOSE_PAREN SEMI_COLON {
                append_production("input_stmt: INPUT OPEN_PAREN ID CLOSE_PAREN SEMI_COLON");
            }
           ;

expression: arithmetic2 arithmetic1 {
                append_production("expression: arithmetic2 arithmetic1");
            }
          ;

arithmetic1 : PLUS arithmetic2 arithmetic1 {
                append_production("arithmetic1: PLUS arithmetic2 arithmetic1");
            }
            | MINUS arithmetic2 arithmetic1 {
                append_production("arithmetic1: MINUS arithmetic2 arithmetic1");
            }
            | /*Empty*/ {
                append_production("arithmetic1: Empty");
            }
            ;

arithmetic2 : multiply2 multiply1 {
                append_production("arithmetic2: multiply2 multiply1");
            }
            ;

multiply1 : MUL multiply2 multiply1 {
                append_production("multiply1: MUL multiply2 multiply1");
            }
          | DIV multiply2 multiply1 {
                append_production("multiply1: DIV multiply2 multiply1");
            }
          | /*Empty*/ {
                append_production("multiply1: Empty");
            }
	      ;

multiply2 : OPEN_PAREN expression CLOSE_PAREN {
                append_production("multiply2: OPEN_PAREN expression CLOSE_PAREN");
            }
          | CONST {
                append_production("multiply2: CONST");
            } 
          | IndexedIdentifier {
                append_production("multiply2: IndexedIdentifier");
            } 
          | ID {
                append_production("multiply2: ID");
            }
	      ;

IndexedIdentifier : ID OPEN_BRACKET CONST CLOSE_BRACKET {
                    append_production("IndexedIdentifier: ID OPEN_BRACKET CONST CLOSE_BRACKET");
                  }
                  | ID OPEN_BRACKET ID CLOSE_BRACKET {
                    append_production("IndexedIdentifier: ID OPEN_BRACKET ID CLOSE_BRACKET");
                  }
		          ;

condition: expression LT expression {
            append_production("condition: expression LT expression");
          }
         | expression LE expression {
            append_production("condition: expression LE expression");
          }
         | expression GT expression {
            append_production("condition: expression GT expression");
          }
         | expression GE expression {
            append_production("condition: expression GE expression");
          }
         | expression EQ expression {
            append_production("condition: expression EQ expression");
          }
         | expression NE expression {
            append_production("condition: expression NE expression");
          }
         ;

boolean_condition: condition boolean_condition_temp {
                    append_production("boolean_condition: condition boolean_condition_temp");
                  }
                  ;

boolean_condition_temp: /*Empty*/ {
                        append_production("boolean_condition_temp: Empty");
                    }
                    | AND boolean_condition {
                        append_production("boolean_condition_temp: AND boolean_condition");
                    }
                    | OR boolean_condition {
                        append_production("boolean_condition_temp: OR boolean_condition");
                    }
                    ;

%%

void append_production(const char* prod) {
    if (strlen(production_buffer) + strlen(prod) + 2 < sizeof(production_buffer)) {
        strcat(production_buffer, prod);
        strcat(production_buffer, "\n");
    }
}

void yyerror(char *s)
{	
	printf("%s\n",s);
}

extern FILE *yyin;

int main(int argc, char **argv) {
    if (argc > 1) yyin : fopen(argv[1], "r");
    if (argc > 2 && strcmp(argv[2], "-d")) yydebug = 1;
    if (!yyparse()) {
        fprintf(stderr, "Parsing completed successfully.\n");
        fprintf(stderr, "Productions:\n%s", production_buffer);
    }
    return 0;
}
