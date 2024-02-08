;Given the word A and the byte B, compute the doubleword C as follows:
;the bits 0-3 of C are the same as the bits 6-9 of A
;the bits 4-5 of C have the value 1
;the bits 6-7 of C are the same as the bits 1-2 of B
;the bits 8-23 of C are the same as the bits of A
;the bits 24-31 of C are the same as the bits of B

;C = 0011 0111 0000 1101 1110 0100 1111 0111b

bits 32 ; assembling for the 32 bits architecture

; declare the EntryPoint (a label defining the very first instruction of the program)
global start        

; declare external functions needed by our program
extern exit               ; tell nasm that exit exists even if we won't be defining it
import exit msvcrt.dll    ; exit is a function that ends the calling process. It is defined in msvcrt.dll
                          ; msvcrt.dll contains exit, printf and all the other important C-runtime specific functions

; our data is declared here (the variables needed by our program)
segment data use32 class=data
    a dw 110111100100b ;3556d
    b db 110111b ;55d
    c dd 0

; our code starts here
segment code use32 class=code
    start:
        ;we make the bits 0-3 of C the same as the bits 6-9 of A
        ;we compute the result in ECX
        
        mov ECX, 0
        mov EAX, 0
        
        mov AX, [a] ;we isolate bits 6-9 of A
        and AX, 0000001111000000b
        ror AX, 6
        or ECX, EAX
        
        or ECX, 00000000000000000000000000110000b ;we force the value of bits 4-5 of the result to the value 1
        
        mov BL, [b] ;we isolate bits 1-2 of B
        and BL, 00000110b
        rol BL, 5
        or ECX, EBX
        
        mov AX, [a] ;the bits 8-23 of C will be the same as the bits of A
        rol EAX, 8
        or ECX, EAX
        
        mov BL, [b] ;the bits 24-31 of C will be the same as the bits of B
        mov BH, 0
        rol EBX, 24
        or ECX, EBX
        
        mov [c], ECX
        
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
