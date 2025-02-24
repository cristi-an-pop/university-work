import { create } from 'zustand';
import { Book } from '../models/Book';
import Repository from '../repository/Repository';
import WebSocketService from '../services/WebSocketService';
import Toast from 'react-native-toast-message';

const wsService = WebSocketService.getInstance();

type BookStore = {
    books: Book[];
    booksGet: Book[];
    loading: boolean;
    isOffline: boolean;
    topRatedBooks: { title: string, author: string, avgRating: number, reviewCount: number }[];
    setBooks: (books: Book[]) => void;
    setBooks2: (books: Book[]) => void;
    setLoading: (loading: boolean) => void;
    setOffline: (offline: boolean) => void;
    addBook: (book: Omit<Book, 'id'>) => void;
    updateBook: (book: Book) => void;
    fetchBooks: () => void;
    fetchBook: (id: number) => Promise<Book | null>;
    computeTopRatedBooks: () => void;
    handleWebSocketMessage: (message: any) => void;
    retryConnection: () => void;
};

export const useBookStore = create<BookStore>((set) => ({
    books: [],
    booksGet: [],
    loading: false,
    isOffline: false,
    topRatedBooks: [],
    setBooks: (books) => set({ books }),
    setBooks2: (books) => set({ booksGet: books }),
    setLoading: (loading) => set({ loading }),
    setOffline: (offline) => set({ isOffline: offline }),
    addBook: async (book) => {
        if (!wsService.isServerConnected()) {
            const newBook = { ...book, id: Date.now() };
            await Repository.createBookLocal(newBook);
            set((state) => ({ books: [...state.books, newBook ]}));
            return;
        }
        set({ loading: true });
        try {
            await Repository.createBook(book);
        } catch (error) {
            console.error('Error adding book:', error);
        } finally {
            set({ loading: false });
        }
    },
    updateBook: async (book) => {
        if (!wsService.isServerConnected()) {
            alert('You are offline. Cannot update books.');
            return;
        }
        set({ loading: true });
        try {
            await Repository.updateBook(book);
            await Repository.updateBookLocal(book);
            set((state) => ({ books: state.books.map(b => b.id === book.id ? book : b) }));
        } catch (error) {
            console.error('Error updating book:', error);
        } finally {
            set({ loading: false });
        }
    },
    fetchBooks: async () => {
        set({ loading: true });
        try {
            let localBooks = await Repository.getAllBooksLocal();
            let fetchedBooks = [];
            if (wsService.isServerConnected()) {
                fetchedBooks = await Repository.getAllBooks();
                const mergedBooks = [...localBooks];
                fetchedBooks.forEach(fetchedBook => {
                    const index = mergedBooks.findIndex(book => book.id === fetchedBook.id);
                    if (index !== -1) {
                        mergedBooks[index] = fetchedBook;
                    } else {
                        mergedBooks.push(fetchedBook);
                    }
                });
                await Promise.all(mergedBooks.map(book => Repository.createBookLocal(book)));
                set({ books: mergedBooks });
            } else {
                set({ books: localBooks });
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            set({ loading: false });
        }
    },
    fetchBook: async (id: number) => {
        set({ loading: true });
        try {
            const book = await Repository.getBook(id);
            set((state) => ({ booksGet: [...state.booksGet, book] }));
            return book;
        } catch (error) {
            console.error('Error fetching book:', error);
            return null;
        } finally {
            set({ loading: false });
        }
    },
    computeTopRatedBooks: async () => {
        const topRatedBooks = await Repository.getBooks2();
        const sortedTopRatedBooks = topRatedBooks
            .sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount)
            .slice(0, 5)
            .map(book => ({
                title: book.title,
                author: book.author,
                avgRating: book.avgRating,
                reviewCount: book.reviewCount,
            }));
    
        set({ topRatedBooks: sortedTopRatedBooks });
    },
    handleWebSocketMessage: async (message) => {
        const book = message;

        try {
            set((state) => ({ books: [...state.books, book] }));
            await Repository.createBookLocal(book);
            Toast.show({
                type: 'success',
                text1: `Book ${book.title} by ${book.author} added`,
                text2: `Rating: ${book.avgRating}, Reviews: ${book.reviewCount}`
            });
        } catch (error) {
            console.info('Error adding book to local database:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to add book to local database'
            });
        }
    },
    retryConnection: () => {
        wsService.connect();
    }
}));

wsService.setMessageHandler(useBookStore.getState().handleWebSocketMessage);

wsService.setConnectionHandler(() => {
    useBookStore.getState().setOffline(false);
    useBookStore.getState().fetchBooks();
});

wsService.setOfflineHandler(() => {
    useBookStore.getState().setOffline(true);
});