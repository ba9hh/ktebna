import book from "../assets/book.png";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import book4 from "../assets/book4.png";
import book5 from "../assets/book5.png";
import book6 from "../assets/book6.png";
import book7 from "../assets/book7.png";
const BOOKS = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "Ezzedine jlidi",
        price: 12.99,
        location: "Gabès",
        rating: 4.5,
        category: "Classics",
        cover: book,
        badge: "For sale",
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Karim gharbi",
        price: 11.49,
        location: "Tunis",
        category: "Classics",
        cover: book1,
        rating: 4.5,

        badge: "For rent",
    },
    {
        id: 3,
        title: "1984",
        author: "Najla ben abdallah",
        price: 10.99,
        location: "Manouba",
        category: "Dystopian", rating: 4.5,

        cover: book2,
        badge: "For sale",
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Sami chaffei",
        price: 9.99,
        location: "Arianna", rating: 4.5,

        category: "Romance",
        cover: book3,
        badge: "For sale",
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "Nidhal saidi",
        price: 13.99, rating: 4.5,

        location: "Sfax",
        category: "Fantasy",
        cover: book4,
        badge: "For exchange",
    },
    {
        id: 6,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss", rating: 4.5,

        price: 14.49,
        location: "Tozeur",
        category: "Fantasy",
        cover: book5,
        badge: "For exchange",
    },
    {
        id: 7,
        title: "Sapiens",
        author: "Ahmed rebei",
        rating: 4.5,
        price: 16.99,
        location: "Kairouan",
        category: "Non‑fiction",
        cover: book6,
        badge: "For rent",
    },
    {
        id: 8,
        title: "Atomic Habits",
        author: "James Clear",
        price: 15.99,
        location: "Medenine", rating: 4.5,

        category: "Non‑fiction",
        cover: book7,
        badge: "For sale",
    },
];
export default BOOKS;