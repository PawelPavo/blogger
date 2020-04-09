import {Query} from '../index';
import type {BlogsT} from '../models'


const all = () => Query<BlogsT[]>(`SELECT 
blogs.*, authors.name, tags.name as tag_name
FROM
blogs
    JOIN
authors ON authors.id = blogs.authorid
LEFT JOIN blogTags ON blogTags.blogid = blogs.id
LEFT JOIN tags ON tags.id = blogTags.tagid
ORDER BY blogs.created_at DESC`)

const one = (id: string) => Query<BlogsT[]>(`SELECT 
blogs.*, authors.name, tags.name as tag_name
FROM
blogs
    JOIN
authors ON authors.id = blogs.authorid
LEFT JOIN blogTags ON blogTags.blogid = blogs.id
LEFT JOIN tags ON tags.id = blogTags.tagid WHERE blogs.id = ?
ORDER BY blogs.created_at DESC `, [id])

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