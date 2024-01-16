package Model.Values;

import Model.Types.StringType;
import Model.Types.Type;

public class StringValue implements Value{

    private final String value;

    @Override
    public boolean equals(Object another) {
        if(another instanceof StringValue) {
            return true;
        }
        else {
            return false;
        }
    }

    public StringValue(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public Type getType() {
        return new StringType();
    }

    @Override
    public Value deepCopy() {
        return new StringValue(this.value);
    }

    @Override
    public String toString() {
        return String.format("\"%s\"", this.value);
    }
}
