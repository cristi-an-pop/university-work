package Datastructures;

import Exceptions.StackException;

import java.util.*;

public class MyStack<Type> implements MyIStack<Type> {
    private final Stack<Type> stack = new Stack<>();

    @Override
    public Type top() throws StackException {
        if (this.stack.isEmpty()) {
            throw new StackException("Stack is empty.");
        }
        return this.stack.peek();
    }

    @Override
    public void push(Type element) {
        this.stack.push(element);
    }

    @Override
    public Type pop() throws StackException {
        if (this.stack.isEmpty()) {
            throw new StackException("Stack is empty.");
        }
        return this.stack.pop();
    }

    @Override
    public int size() {
        return this.stack.size();
    }

    @Override
    public boolean isEmpty() {
        return this.stack.isEmpty();
    }

    @Override
    public Collection<Type> reversed() {
        List<Type> reversed = new ArrayList<>(this.stack);
        Collections.reverse(reversed);
        return reversed;
    }

    public String toString() {
        return this.stack.toString();
    }
}
