import {Query} from '../index';

interface AuthorsT {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

// const all = () => Query<AuthorsT[]>('SELECT * FROM authors');

const all = () => Query<AuthorsT[]>('SELECT authors.*, blogs.title, blogs.content FROM authors JOIN blogs ON blogs.authorid = authors.id ORDER BY created_at DESC');

// const one = (id: string) => Query<AuthorsT[]>('SELECT * FROM authors WHERE id = ?', [id])

const one = (id:string) => Query<AuthorsT[]>('SELECT authors.*, blogs.title, blogs.content FROM authors JOIN blogs ON blogs.authorid = authors.id WHERE authors.id = ? ORDER BY created_at DESC', [id]);

const insert = (name: string, email: string) => Query<{insertId: number }>('INSERT INTO authors (name, email) VALUE (?)', [[name, email]]);

const update = (name: string, email:string, id:number) => Query('UPDATE authors SET name = ?, email = ? WHERE id = ?', [name, email, id]);

const destory = (id:number) => Query('DELETE FROM authors WHERE id = ?',[id])


export default {
    all,
    one,
    insert,
    update,
    destory,
}