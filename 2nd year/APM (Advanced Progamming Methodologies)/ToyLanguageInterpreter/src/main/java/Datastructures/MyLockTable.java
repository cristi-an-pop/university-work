package Datastructures;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class MyLockTable implements MyILockTable {
    private final Map<Integer, Integer> lockTable = new ConcurrentHashMap<>();
    private int nextFreeAddress = 1;

    private void moveNextFreeAddress() {
        while(this.lockTable.containsKey(this.nextFreeAddress)) {
            this.nextFreeAddress++;
        }
    }
    @Override
    public int add() {
        this.lockTable.put(this.nextFreeAddress, -1);
        int address = this.nextFreeAddress;
        this.moveNextFreeAddress();
        return address;
    }

    @Override
    public int remove(Integer key) {
        return this.lockTable.remove(key);
    }

    @Override
    public int get(Integer key) {
        return this.lockTable.get(key);
    }

    @Override
    public void update(Integer key, Integer value) {
        this.lockTable.put(key, value);
    }

    @Override
    public boolean search(Integer key) {
        return this.lockTable.containsKey(key);
    }

    @Override
    public int size() {
        return this.lockTable.size();
    }

    @Override
    public boolean isEmpty() {
        return this.lockTable.isEmpty();
    }

    @Override
    public Set<Integer> keySet() {
        return this.lockTable.keySet();
    }

    @Override
    public void setMap(Map<Integer, Integer> map) {
        this.lockTable.clear();
        this.lockTable.putAll(map);
    }

    @Override
    public Map<Integer, Integer> getMap() {
        Map<Integer, Integer> map = new ConcurrentHashMap<>();
        map.putAll(this.lockTable);
        return map;
    }

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        for (Integer key : this.lockTable.keySet()) {
            stringBuilder.append(key.toString()).append(" -> ").append(this.lockTable.get(key).toString()).append("\n");
        }
        return stringBuilder.toString();
    }
}
