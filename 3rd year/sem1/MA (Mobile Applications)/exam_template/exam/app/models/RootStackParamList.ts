import { Item } from './Item';

export type RootStackParamList = {
    ItemList: undefined;
    Create: undefined;
    Update: {
      item: Item;
      onDelete: () => void;
      onPress: () => void;
    };
    Details: {
      item: Item;
    };
}
