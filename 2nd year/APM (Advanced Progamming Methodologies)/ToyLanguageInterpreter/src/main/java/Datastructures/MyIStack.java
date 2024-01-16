package Datastructures;

import Exceptions.StackException;

import java.util.Collection;

public interface MyIStack<T> {
    T top() throws StackException;
    void push(T element);
    T pop() throws StackException;
    int size();
    boolean isEmpty();
    Collection<T> reversed();
}
