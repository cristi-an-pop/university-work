; (b+c+d)-(a+a)
; ex: a = 10, b = 25, c = 30, d = 15
; (25+30+15)-(10+10) = 50
bits 32 ; assembling for the 32 bits architecture

; declare the EntryPoint (a label defining the very first instruction of the program)
global start        

; declare external functions needed by our program
extern exit               ; tell nasm that exit exists even if we won't be defining it
import exit msvcrt.dll    ; exit is a function that ends the calling process. It is defined in msvcrt.dll
                          ; msvcrt.dll contains exit, printf and all the other important C-runtime specific functions

; our data is declared here (the variables needed by our program)
segment data use32 class=data
    ; ...
    a db 10
    b db 25
    c db 30
    d db 15
; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov AL, [b] ; AL <- b
        add AL, [c] ; AL <- b+c
        add AL, [d] ; AL <- b+c+d
        mov AH, [a] ; AH <- a
        add AH, [a] ; AH <- a+a
        sub AL, AH ; AL <- AL-AH = (b+c+d)-(a+a)
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
