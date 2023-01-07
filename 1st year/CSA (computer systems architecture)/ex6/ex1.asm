;Read two numbers a and b (base 10) from the keyboard and calculate: (a+b)/(a-b). 
;The quotient will be stored in a variable called "result" (defined in the data segment). 
;The values are considered in signed representation.

bits 32 ; assembling for the 32 bits architecture

; declare the EntryPoint (a label defining the very first instruction of the program)
global start        

; declare external functions needed by our program
extern exit, printf, scanf     
import exit msvcrt.dll    ; exit is a function that ends the calling process. It is defined in msvcrt.dll
import printf msvcrt.dll
import scanf msvcrt.dll
                          ; msvcrt.dll contains exit, printf and all the other important C-runtime specific functions

; our data is declared here (the variables needed by our program)
segment data use32 class=data
    a dw 0
    b dw 0
    result dw 0
    
    format db "%d", 0
; our code starts here
segment code use32 class=code
    start:
        ;read a
        push dword a
        push dword format
        call [scanf]
        add esp, 4*2
        
        ;read b
        push dword b
        push dword format
        call [scanf]
        add esp, 4*2
        
        ;(a+b)/(a-b)
        mov ax, [a]
        add ax, [b]
        
        mov bx, [a]
        sub bx, [b]
        
        cmp bx, 0  ;check if a and b are equal
        je end     ;jump to end if a and b are equal
        
        idiv bx
        
        mov [result], bx
        
        end:
        ; exit(0)
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program
