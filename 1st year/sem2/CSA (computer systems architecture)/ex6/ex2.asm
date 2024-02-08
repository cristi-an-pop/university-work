;A text file is given. Read the content of the file, 
;determine the special character with the highest frequency and 
;display the character along with its frequency on the screen. 
;The name of text file is defined in the data segment.

bits 32 ; assembling for the 32 bits architecture

; declare the EntryPoint (a label defining the very first instruction of the program)
global start        

; declare external functions needed by our program
extern exit, fopen, fclose, fread, printf               ; tell nasm that exit exists even if we won't be defining it
import exit msvcrt.dll
import fclose msvcrt.dll
import fopen msvcrt.dll
import fread msvcrt.dll

import printf msvcrt.dll    ; exit is a function that ends the calling process. It is defined in msvcrt.dll
                          ; msvcrt.dll contains exit, printf and all the other important C-runtime specific functions

; our data is declared here (the variables needed by our program)
segment data use32 class=data
    
    file_name db "input.txt", 0
    read_mode db "r", 0
    first_special_character db "!"
    last_special_character db "@"
    write_mode db "w", 0
    file_stream dd 0
    read_text dd 0
    highest_freq dd 0
    char dd 0
    format db "The character %c appears: %d times", 0
    read_content resb 1000
    
; our code starts here
segment code use32 class=code
    start:
        ; fopen
        push read_mode
        push file_name
        call [fopen]
        add esp, 4*2
        
        ; error checking
        cmp eax, 0
        je end_this 
        
        mov [file_stream], eax
        
        read_file:
            push dword [file_stream]
            push dword 1000
            push dword 1
            push read_content
            call [fread]
            add esp, 4*4
            
            add dword[read_text], eax
        
        cmp eax, 0 
        jne read_file ; if eax != 0 then the file is not fully read
        
        mov esi, read_content
        mov ecx, [read_text]
        this_loop:
            push ecx
            
            lodsb
            cmp al, [first_special_character]
            jb end_loop
            cmp al, [last_special_character]
            jg end_loop
            mov ebx, 0
            mov edi, read_content
            mov ecx, [read_text]
            count:
                scasb
                jne dont_count
                add ebx, 1
                
                dont_count:
            loop count
            cmp dword [char], ebx
            jg end_loop ;change the char and the frequency
            mov [highest_freq], al
            mov [char], ebx
            end_loop:
            pop ecx
        loop this_loop
    
        ; print
        push dword [char]
        push dword [highest_freq]
        push format
        call [printf]
        end_this:
        
        push    dword 0      ; push the parameter for exit onto the stack
        call    [exit]       ; call exit to terminate the program