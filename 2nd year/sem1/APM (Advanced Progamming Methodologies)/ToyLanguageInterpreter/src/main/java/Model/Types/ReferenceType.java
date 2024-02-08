package Model.Types;

import Model.Values.ReferenceValue;
import Model.Values.Value;

public class ReferenceType implements Type {
    Type inner;

    public ReferenceType(Type inner) {
        this.inner = inner;
    }

    public Type getInner() {
        return this.inner;
    }

    @Override
    public boolean equals(Object another) {
        if(another == null) {
            return false;
        } else if(another == this) {
            return true;
        }

        return another instanceof ReferenceType;
    }

    @Override
    public Value defaultValue() {
        return new ReferenceValue(0, this.inner);
    }

    @Override
    public Object deepCopy() {
        return new ReferenceType((Type) this.inner.deepCopy());
    }

    @Override
    public String toString() {
        return "Ref(" + this.inner.toString() + ")";
    }
}
