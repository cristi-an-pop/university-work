; a,b-byte; c-word; e-doubleword; x-qword - SIGNED
; (a-b+c*128)/(a+b)+e-x
; a = 10, b = 12, c = 1, e = 2, x = 20
; (10-12+1*128)/(10+12)+2-20 = -13
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
    c dw 1
    e dd 2
    x dq 20
; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov BL, [a] ; BL <- a
        sub BL, byte[b] ; BL <- AL - b = a-b
        mov AX, [c]
        mov CL, 128
        imul CL ; AX <- AX*CL = c*128
        mov CX, AX ; CX <- AX
        mov AL, BL ; AL <- BL
        CBW ; AL -> AX
        add AX, CX ; AX <- AX + CX = a-b+c*128
        mov BL, [a]
        add BL, byte[b] ; AL <- a+b-byte
        div BL ; AL <- AX / BL = (a-b+c*128)/(a+b)
        CBW ; takes the sign bit and extend it
        CWDE
        mov EDX, 0
        add EAX, [e]
        sub EAX, [x]
        sbb EDX, [x+4]
        
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
