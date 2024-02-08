; a,b,c - byte
; d - word
; (100*a+d+5-75*b)/(c-5)
; ex: a = 50, b = 2, c = 30, d = 300
; (100*50+300+5-75*2)/(30-5) = 206
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
    b db 2
    c db 30
    d dw 300
; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov AX, 100
        mul byte[a] ; AX <- AX*100 (a*100)
        add AX, [d] ; AX <- a*100+d
        add AX, 5 ; AX <- a*100+d+5
        mov BX, AX
        mov AX, 75 ; AX <- 75
        mul byte[b] ; AX <- AX * b = 75*b
        sub BX, AX ; BX <- BX - AX = (100*a+d+5-75*b)
        mov AX, BX ; AX <- BX
        mov BL, [c] ; BL <- c
        sub BL, 5 ; BL <- BL-5 = c-5
        div BL ; AL <- AX / BL = (100*a+d+5-75*b)/(c-5)

        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
