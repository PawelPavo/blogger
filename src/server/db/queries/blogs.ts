import {Query} from '../index';

interface BlogsT {
    id: number;
    title: string;
    content: string;
    image_url: string;
    authorid: number;
    created_at: Date;
}

const all = () => Query<BlogsT[]>('SELECT * FROM blogs')

const one = (id: string) => Query<BlogsT[]>('SELECT * FROM blogs WHERE id = ?', [id])

export default {
    all,
    one,
}