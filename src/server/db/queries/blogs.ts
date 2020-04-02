import {Query} from '../index';

interface BlogsT {
    id: number;
    title: string;
    content: string;
    image_url: string;
    authorid: number;
    created_at: Date;
}

const all = () => Query<BlogsT[]>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid ORDER BY created_at DESC')

const one = (id: string) => Query<BlogsT[]>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid WHERE blogs.id = ?', [id])

const insert = (title:string, content:string, authorid:number) => Query('INSERT INTO blogs (title, content, authorid) VALUES (?)',[[title, content, authorid]])

const update = (title: string, content: string, id:number) => Query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id])

const destroy = (id:number) => Query('DELETE FROM blogs WHERE id = ?', [id])

export default {
    all,
    one,
    insert,
    update,
    destroy,
}