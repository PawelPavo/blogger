import * as React from 'react';
import { IBlogs } from '../utils/interfaces'
import BlogCard from '../components/blogCard';
import { useState, useEffect } from 'react';



export interface HomeProps { }

const Home: React.SFC<HomeProps> = () => {

    const [blogs, setBlogs] = useState<IBlogs[]>([]);

    useEffect(() => {
        (async () => {
            try {
                let res = await fetch('/api/blogs');
                let blogs = await res.json();
                setBlogs(blogs);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    return (
        <div className="container">
             <h1 className="text-center text-primary mt-5" >All Blogs</h1>
            <div>
                <section className="row mt-3">
                    {blogs.map(blog => (
                        <BlogCard key={`blog-${blog.id}`} blog={blog} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Home;