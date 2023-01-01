;A byte string S of length l is given. Obtain the string D of length l-1 so that 
;the elements of D represent the difference between every two consecutive elements of S.
;Example:
;S: 1, 2, 4, 6, 10, 20, 25
;D: 1, 2, 2, 4, 10, 5


bits 32 ; assembling for the 32 bits architecture

; declare the EntryPoint (a label defining the very first instruction of the program)
global start        

; declare external functions needed by our program
extern exit               ; tell nasm that exit exists even if we won't be defining it
import exit msvcrt.dll    ; exit is a function that ends the calling process. It is defined in msvcrt.dll
                          ; msvcrt.dll contains exit, printf and all the other important C-runtime specific functions

; our data is declared here (the variables needed by our program)
segment data use32 class=data
    s db 1, 2, 4, 6, 10, 20, 25
    l equ $-s
    d resb l-1

; our code starts here
segment code use32 class=code
    start:
        mov ecx, l-1
        mov esi, 0
        jecxz End
        
        Repeat:
            mov al, [s+esi+1]
            mov bl, [s+esi]
            sub al, bl
            mov [d+esi], al
            inc esi
        loop Repeat
        
        End:
    
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
