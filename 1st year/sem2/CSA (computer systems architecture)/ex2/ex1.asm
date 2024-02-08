; a - byte, b - word, c - double word, d - qword - Unsigned representation
; (d+d-b)+(c-a)+d
; a = 10, b = 300, c = 1000, d = 1000
; (1000+1000-300)+(1000-10)+1000 = 3690
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
    b dw 300
    c dd 1000
    d dq 1000

; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov AL, [a] ; AL <- a
        mov EAX, [d] 
        mov EDX, [d+4] ; EDX:EAX <- d
        add EAX, [d] 
        adc EDX, [d+4] ; EDX:EAX <- d+d
        sub EAX, dword[b] 
        sbb EDX, dword[b+4] ; EDX-EAX <- EDX:EAX - b = d+d-b
        mov EBX, EAX; ; EBX <- EAX = d+d-b
        mov ECX, [c] ; ECX <- c
        mov EAX, 0
        mov AL, [a] ; EAX <- a
        sub ECX, EAX ; ECX <- ECX - EAX = c-a
        add EBX, ECX ; EBX <- EBX + ECX = (d+d-b)+(c-a)
        adc EDX, 0
        mov EAX, EBX ; EAX <- EBX = (d+d-b)+(c-a)
        add EAX, [d] 
        adc EDX, [d+4] ; EDX:EAX <- (d+d-b)+(c-a)+d
        
        
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
