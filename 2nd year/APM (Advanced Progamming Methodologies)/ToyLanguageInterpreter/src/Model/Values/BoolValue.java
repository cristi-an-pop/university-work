package Model.Values;

import Model.Types.BoolType;
import Model.Types.Type;

public class BoolValue implements Value{
    boolean value;

    @Override
    public boolean equals(Object another) {
        if(another instanceof BoolValue) {
            return true;
        }
        else {
            return false;
        }
    }
    public BoolValue(boolean v) {
        this.value = v;
    }

    public boolean getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return "" + this.value;
    }

    @Override
    public Value deepCopy() {
        return new BoolValue(this.value);
    }

    @Override
    public Type getType() {
        return new BoolType();
    }
}
