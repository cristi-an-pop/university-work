package Datastructures;

import Exceptions.DictionaryException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MyDictionary<K, V> implements MyIDictionary<K, V> {
    private final Map<K, V> map = new HashMap<>();
    @Override
    public void add(K key, V value) {
        this.map.put(key, value);
    }

    @Override
    public void remove(K key) throws DictionaryException {
        if (!this.map.containsKey(key)) {
            throw new DictionaryException("Key does not exist.");
        }
        this.map.remove(key);
    }

    @Override
    public V get(K key) throws DictionaryException {
        if (!this.map.containsKey(key)) {
            throw new DictionaryException("Key does not exist.");
        }
        return this.map.get(key);
    }

    @Override
    public void update(K key, V value) throws DictionaryException {
        if (!this.map.containsKey(key)) {
            throw new DictionaryException("Key does not exist.");
        }
        this.map.put(key, value);
    }

    @Override
    public boolean search(K key) {
        return this.map.containsKey(key);
    }

    @Override
    public ArrayList<V> values() {
        return new ArrayList<>(this.map.values());
    }

    @Override
    public MyIDictionary<K, V> deepCopy() {
        MyIDictionary<K, V> copy = new MyDictionary<>();
        for (K key : this.map.keySet()) {
            copy.add(key, this.map.get(key));
        }
        return copy;
    }

    @Override
    public String toString() {
        return this.map.toString();
    }
}
