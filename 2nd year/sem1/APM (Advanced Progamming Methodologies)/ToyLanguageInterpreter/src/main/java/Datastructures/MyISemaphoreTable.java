package Datastructures;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public interface MyISemaphoreTable {
    int add(int key, Tuple<Integer, List<Integer>, Integer> value);
    Tuple<Integer, List<Integer>, Integer> get(int key);
    boolean search(int key);
    void update(int key, Tuple<Integer, List<Integer>, Integer> value);
    Map<Integer, Tuple<Integer, List<Integer>, Integer>> getMap();
    void setMap(Map<Integer, Tuple<Integer, List<Integer>, Integer>> map);
    Set<Integer> keys();
}
