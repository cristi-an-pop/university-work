package Model.Values;

import Model.Types.IntType;
import Model.Types.Type;

public class IntValue implements Value {
    int value;

    @Override
    public boolean equals(Object another) {
        if(another instanceof IntValue) {
            return true;
        }
        else {
            return false;
        }
    }
    public IntValue(int v) {
        this.value = v;
    }

    public int getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return "" + this.value;
    }

    @Override
    public Value deepCopy() {
        return new IntValue(this.value);
    }

    @Override
    public Type getType() {
        return new IntType();
    }
}
