; a,b,c,d-byte
; e,f,g,h-word
; 2*(a+b)-e
; ex: a = 50, b = 10, e = 150
; 2*(50+10)-150 = -30
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
    a db 50
    b db 10
    e dw 150
; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov AX, [a]
        add AX, [b]
        mov BL, 2
        mul BL
        mov BX, [e]
        sub AX, BX

        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
