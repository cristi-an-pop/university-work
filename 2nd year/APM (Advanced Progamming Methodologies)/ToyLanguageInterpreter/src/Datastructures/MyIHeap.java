package Datastructures;

import Model.Values.Value;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

public interface MyIHeap {

    int add(Value value);

    void remove(Integer key);

    Value get(Integer key);

    void update(Integer key, Value value);

    boolean search(Integer key);

    int size();

    boolean isEmpty();

    Set<Integer> keys();

    Collection<Value> values();

    Collection<Map.Entry<Integer, Value>> entrySet();

    void setContent(Map<Integer, Value> integerValueMap);
}
