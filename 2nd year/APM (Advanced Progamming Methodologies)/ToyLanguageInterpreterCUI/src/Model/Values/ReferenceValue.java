package Model.Values;

import Model.Types.ReferenceType;
import Model.Types.Type;

public class ReferenceValue implements Value{
    int address;
    Type locationType;

    public ReferenceValue(int address, Type locationType) {
        this.address = address;
        this.locationType = locationType;
    }

    public int getAddress() {
        return this.address;
    }

    public Type getLocationType() {
        return this.locationType;
    }

    @Override
    public boolean equals(Object another) {
        if(another instanceof ReferenceValue) {
            return this.address == ((ReferenceValue) another).getAddress() && this.locationType.equals(((ReferenceValue) another).getLocationType());
        }
        else {
            return false;
        }
    }

    @Override
    public Type getType() {
        return new ReferenceType(this.locationType);
    }

    @Override
    public Value deepCopy() {
        return new ReferenceValue(this.address, this.locationType);
    }

    @Override
    public String toString() {
        return "(" + this.address + ", " + this.locationType.toString() + ")";
    }
}