package Datastructures;

import Exceptions.DictionaryException;

import java.util.Collection;
import java.util.Set;

public interface MyIDictionary<K, V> {
    void add(K key, V value);
    void remove(K key) throws DictionaryException;
    V get(K key) throws DictionaryException;
    void update(K key, V value) throws DictionaryException;
    boolean search(K key);
    boolean isEmpty();

    MyIDictionary<K, V> deepCopy();

    Set<K> keys();

    Collection<V> values();
}
