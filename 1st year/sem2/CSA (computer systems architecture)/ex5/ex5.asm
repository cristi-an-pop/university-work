;A list of doublewords is given. Starting from the low part of the doubleword, obtain the doubleword made of the 
;high even bytes of the low words of each doubleword from the given list. If there are not enough bytes, 
;the remaining bytes of the doubleword will be filled with the byte FFh.

;Example:
;Input: 12345678h, 1A2C3C4Dh, 98FCDD76h, 12783A2Bh
;Output: FF3A3C56h

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
    s dd 12345678h, 1A2C3C4Dh, 98FC3C76h, 12783A2Bh, 432342FDh
    len equ ($-s)
    d dd 0

; our code starts here
segment code use32 class=code
    start:
        ; ...
        mov esi, s+len-4
        mov ecx, len/4
        mov ebx, -1
        std ;set direction flag to 1
        
        jecxz end
        repeat:
            lodsd
            test ah, 1 ;checks if al is even
            
            jnz odd
            shl ebx, 8
            add bl, ah
            odd:
        loop repeat
        
        
        end:
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
