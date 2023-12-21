package Datastructures;

import Exceptions.StackException;

public interface MyIStack<T> {
    T top() throws StackException;
    void push(T element);
    T pop() throws StackException;
    int size();
    boolean isEmpty();
}
