import Controller from '../interfaces/controller.interface';
import { Request, Response, Router } from 'express';

interface Book {
    id: string;
    title: string;
    author: string;
}

class ItemController implements Controller {
    public path = '/api/books';
    public router = Router();
    private books: Book[] = [];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getBook);
        this.router.put(`${this.path}/:id`, this.updateBook);
        this.router.delete(`${this.path}/:id`, this.deleteBook);
        this.router.post(this.path, this.addBook);
        this.router.get(this.path, this.getAllBooks);
    }

    private addBook = async (request: Request, response: Response) => {
        const { id, title, author } = request.body;
        if (!id || !title || !author) {
            response.status(400).send('Error: id, title, or author not specified.');
            return;
        }

        if (this.books.some(book => book.id === id)) {
            response.status(400).send(`Error: Book with id "${id}" already exists.`);
            return;
        }

        this.books.push({ id, title, author });
        response.status(201).send('Book added.');
    }

    private getAllBooks = async (request: Request, response: Response) => {
        response.status(200).json(this.books);
    }

    private getBook = async (request: Request, response: Response) => {
        const { id } = request.params;
        const book = this.books.find(book => book.id === id);

        if (!book) {
            response.status(404).send(`Book with id "${id}" was not found.`);
            return;
        }

        response.status(200).json(book);
    }

    private updateBook = async (request: Request, response: Response) => {
        const { id } = request.params;
        const bookIndex = this.books.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            response.status(404).send(`Book with id "${id}" was not found.`);
            return;
        }

        const { title, author } = request.body;
        if (!title && !author) {
            response.status(400).send('Error: title or author must be specified.');
            return;
        }

        if (title) this.books[bookIndex].title = title;
        if (author) this.books[bookIndex].author = author;

        response.status(200).send(`Book "${id}" successfully updated.`);
    }

    private deleteBook = async (request: Request, response: Response) => {
        const { id } = request.params;
        const bookIndex = this.books.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            response.status(404).send(`Book with id "${id}" was not found.`);
            return;
        }

        this.books.splice(bookIndex, 1);
        response.status(200).send(`Book with id "${id}" removed.`);
    }
}

export default ItemController;
