package Datastructures;

import java.util.Map;
import java.util.Set;

public interface MyILockTable {
    int add();

    int remove(Integer key);

    int get(Integer key);

    void update(Integer key, Integer value);

    boolean search(Integer key);

    int size();

    boolean isEmpty();

    Set<Integer> keySet();

    void setMap(Map<Integer, Integer> map);

    Map<Integer, Integer> getMap();
}
