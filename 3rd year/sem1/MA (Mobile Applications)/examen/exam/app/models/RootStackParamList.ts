import { Book } from './Book';

export type RootStackParamList = {
    ListScreen: undefined;
    CreateScreen: undefined;
    UpdateScreen: {
      book: Book;
      onDelete: () => void;
      onPress: () => void;
    };
    DetailsScreen: {
      book: Book;
    };
    AnalyticsScreen: undefined;
    ReadingScreen: undefined;
}
