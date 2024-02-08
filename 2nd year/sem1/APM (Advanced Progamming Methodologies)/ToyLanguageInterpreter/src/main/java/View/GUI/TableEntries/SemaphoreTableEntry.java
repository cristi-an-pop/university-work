package View.GUI.TableEntries;

import Datastructures.Pair;
import javafx.beans.property.SimpleStringProperty;

import java.util.List;

public class SemaphoreTableEntry {
    private final int index;
    private final Pair<Integer, List<Integer>> value;

    public SemaphoreTableEntry(int index, Pair<Integer, List<Integer>> value) {
        this.index = index;
        this.value = value;
    }

    public int getIndex() {
        return this.index;
    }

    public Pair<Integer, List<Integer>> getValue() {
        return this.value;
    }

    public SimpleStringProperty indexProperty() {
        return new SimpleStringProperty(String.valueOf(this.index));
    }

    public SimpleStringProperty valueProperty() {
        return new SimpleStringProperty(String.valueOf(this.value));
    }
}
