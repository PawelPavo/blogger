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

export default {
    all
}