import * as React from 'react';
import { useState } from 'react';
import { IBlogs } from '../utils/interfaces';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface AdminProps { }

const Admin: React.FC<AdminProps> = () => {

    const [blogs, setBlogs] = useState<IBlogs[]>([])

    const getBlogs = async () => {
        try {
            let r = await fetch('/api/blogs');
            let blogs = await r.json();
            setBlogs(blogs);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogs();
    }, []);

    const deleteBlog = async (id: number) => {
        try {
            await fetch(`/api/blogs/${id}`, {
                method: 'DELETE'
            });
            getBlogs();
            alert('Blog Successfully Deleted')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="row justify-content-center my-4">
            <article className="col-md-8">
            <h2 className="row mt-3 justify-content-center">Admin Options</h2>
                <ul className="list-group mt-5 rounded">
                    {blogs.map(blog => (
                        <li key={`blog-${blog.id}`} className="list-group-item d-flex align-items-center justify-content-between m-3 shadow-sm">
                            <span>{blog.image_url && <img src={blog.image_url} className="img-thumbnail" width="75" height="75" />}</span>
                            <span>{blog.title}</span>
                            <div>
                                <Link to={`/${blog.id}/edit`} className="btn btn-warning btn-small mx-1">Edit</Link>
                                <button
                                    onClick={() => deleteBlog(blog.id)} className="btn btn-danger btn-small mx-1">X</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}

export default Admin;