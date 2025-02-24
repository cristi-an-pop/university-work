const Koa = require('koa');
const app = module.exports = new Koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(cors());
app.use(middleware);

function middleware(ctx, next) {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(`${start.toLocaleTimeString()} ${ctx.response.status} ${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
  });
}

const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian", status: "reading", reviewCount: 5, avgRating: 4.7 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", status: "completed", reviewCount: 10, avgRating: 4.9 },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", status: "reading", reviewCount: 8, avgRating: 4.5 },
  { id: 4, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", status: "planned", reviewCount: 6, avgRating: 4.2 },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", status: "completed", reviewCount: 15, avgRating: 4.8 },
  { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", status: "reading", reviewCount: 12, avgRating: 4.9 },
  { id: 7, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", status: "planned", reviewCount: 7, avgRating: 4.3 },
  { id: 8, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Coming-of-Age", status: "reading", reviewCount: 9, avgRating: 4.1 },
  { id: 9, title: "War and Peace", author: "Leo Tolstoy", genre: "Historical", status: "planned", reviewCount: 4, avgRating: 4.4 },
  { id: 10, title: "The Alchemist", author: "Paulo Coelho", genre: "Philosophical", status: "completed", reviewCount: 11, avgRating: 4.6 }
];


const reviews = []; 

const router = new Router();

router.get('/books', ctx => {
  ctx.response.body = books;
  ctx.response.status = 200;
});

router.get('/book/:id', ctx => {
  const { id } = ctx.params;
  const book = books.find(b => b.id == id);
  if (book) {
    ctx.response.body = book;
    ctx.response.status = 200;
  } else {
    ctx.response.body = { error: `Book with id ${id} not found` };
    ctx.response.status = 404;
  }
});

router.post('/book', ctx => {
  const { title, author, genre, status, reviewCount, avgRating } = ctx.request.body;

  if (title && author && genre && status) {
    const id = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const newBook = { id, title, author, genre, status, reviewCount, avgRating };
    books.push(newBook);

    broadcast(newBook);
    ctx.response.body = newBook;
    ctx.response.status = 201;
  } else {
    console.log(`Missing or invalid fields, title: ${title} author: ${author} genre: ${genre} status: ${status} review: ${reviewCount} rating: ${avgRating}`);
    ctx.response.body = { error: "Missing or invalid fields, title: ${title} author: ${author} genre: ${genre} status: ${status} review: ${reviewCount} rating: ${avgRating}" };
    ctx.response.status = 400;
  }
});

router.put('/book', ctx => {
  const { id, title, author, genre, status, reviewCount, avgRating } = ctx.request.body;

  const book = books.find(b => b.id == id);
  if (book && title && author && genre && status && reviewCount && avgRating) {
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.status = status;
    book.reviewCount = reviewCount;
    book.avgRating = avgRating;
    ctx.response.body = book;
    ctx.response.status = 200;
  } else {
    console.log(`Book not found or invalid fields, id: ${id} title: ${title} author: ${author} genre: ${genre} status: ${status} review: ${reviewCount} rating: ${avgRating}`);
    ctx.response.body = { error: "Book not found or invalid fields, id: ${id} title: ${title} author: ${author} genre: ${genre} status: ${status} review: ${reviewCount} rating: ${avgRating}" };
    ctx.response.status = 400;
  }
});

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

router.get('/allBooks', ctx => {
  ctx.response.body = books;
  ctx.response.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 2505;

server.listen(port, () => {
  console.log(`📚 Server running on port ${port}... 🚀`);
});
