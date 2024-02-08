; a,b-byte; c-word; e-doubleword; x-qword - UNSIGNED
; (a-b+c*128)/(a+b)+e-x
; a = 10, b = 12, c = 5, e = 2, x = 20
; (10-12+5*128)/(10+12)+2-20 = 11
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
    b db 12
    c dw 5
    e dd 2
    x dq 20
; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov AL, [a] ; AL <- a
        sub AL, [b] ; AL <- AL - b = a-b
        mov CX, 0
        mov CH, -1
        mov CL, AL
        mov AX, [c] ; AX <- c
        mov BX, 128
        mul BX ; AX <- AX*BX = c*128
        add AX, CX ; AX <- AX+CX = a-b+c*128
        mov BL, [a]
        add BL, [b]
        div BL ; AL <- AL / BL
        mov BX, [e]
        add AX, BX ; AX <- AX + BX = (a-b+c*128)/(a+b)+e
        mov EDX, 0
        mov BX, AX
        mov EAX, 0
        mov AX, BX
        sub EAX, [x]
        sbb EDX, [x+4] ; (a-b+c*128)/(a+b)+e-x
        
        
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
