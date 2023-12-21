package Datastructures;

import Model.Values.Value;

import java.util.Collection;
import java.util.Map;

public interface MyIHeap {

    int add(Value value);

    Value get(Integer key);

    void update(Integer key, Value value);

    boolean search(Integer key);

    Collection<Value> values();

    void setContent(Map<Integer, Value> integerValueMap);

    Map<Integer, Value> getContent();
}
