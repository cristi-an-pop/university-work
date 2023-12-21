package Model.Values;

import Model.Types.Type;

public interface Value {
    Type getType();
    boolean equals(Object another);
    Value deepCopy();
}
