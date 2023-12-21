package Datastructures;

import Exceptions.DictionaryException;

import java.util.ArrayList;

public interface MyIDictionary<K, V> {
    void add(K key, V value);
    void remove(K key) throws DictionaryException;
    V get(K key) throws DictionaryException;
    void update(K key, V value) throws DictionaryException;
    boolean search(K key);

    ArrayList<V> values();

    MyIDictionary<K, V> deepCopy();
}
