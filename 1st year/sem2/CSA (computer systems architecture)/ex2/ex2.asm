; a - byte, b - word, c - double word, d - qword - Signed representation
; a-d+b+b+c
; a = 15, b = 30, c = 4, d = 5
; 15-5+30+30+4 = 74
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
    a db 15
    b dw 30
    c dd 4
    d dq 5

; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov AL, [a] ; AL <- a
        CBW ; AL -> AX
        CWDE ; AX -> EAX
        CDQ ; EAX -> EDX:EAX
        sub EAX, [d]        
        sbb EDX, [d+4] ; EDX:EAX <- a-d
        add EAX, [b]
        adc EDX, 0
        add EAX, [b]
        adc EDX, 0
        add EAX, [c]
        adc EDX, 0
        
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
