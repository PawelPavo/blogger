import * as React from 'react';
import { useState, useEffect } from 'react';
import { ITags, IBlogs } from '../utils/interfaces';
import { RouteComponentProps } from 'react-router';

export interface EditProps extends RouteComponentProps<{ id: string }> { }

const Edit: React.SFC<EditProps> = props => {

    const [blog, setBlog] = useState<IBlogs>({
        id: 0,
        title: '',
        content: '',
        image_url: '',
        authorid: 0,
        created_at: new Date(),
        name: '',
        tag_name: ''
    });
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<ITags[]>([]);

    useEffect(() => {
        (async () => {
            let blogid = props.match.params.id;
            try {
                let res = await fetch(`/api/blogs/${blogid}`);
                let blog = await res.json()
                console.log(res)
                setBlog(blog)
                setTitle(blog.title);
                setContent(blog.content);
                let tagres = await fetch('/api/tags');
                let tags = await tagres.json();
                setTags(tags);
            } catch (error) {
                console.log({ error: 'This is shit' })
            }
        })()
    }, [props.match.params.id]);


    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let blogid = props.match.params.id;
        try {
            await fetch(`/api/blogs/${blogid}`, {
                method: 'PUT',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({title, content})
            });
        } catch (error) {
            console.log(error);
        }
        props.history.push('/');
    }

    return (
        <section className="row mt-5 justify-content-center">
            <div className="col-md-10">
                <form className="form-group p-3 border border-primary shadow text-center">
                    <h1 className="mb-5 text-primary">Edit Blog</h1>
                    <input className="form-control mb-5" type="text" placeholder="Enter title ..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {/* <select className="form-control"
                        value={blog.tag_name}
                        onChange={null}>
                        <option value="0" disabled>Choose a Tag ...</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select> */}
                    <div className="form-group mt-5">
                        <textarea className="form-control" placeholder="Enter your blog ..."
                            value={content}
                            onChange={e => setContent(e.target.value)}

                        ></textarea>
                    </div>
                    <button onClick={handleClick} type="button" className="btn btn-outline-primary btn-lg btn-block mt-5">Submit Changes</button>
                </form>
            </div>
        </section>
    )
}

export default Edit;