import * as React from 'react';
import { useState, useEffect } from 'react';
import { ITags } from '../utils/interfaces';
import { RouteComponentProps } from 'react-router';


export interface NewBlogProps extends RouteComponentProps { };

const NewBlog: React.SFC<NewBlogProps> = props => {

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [newTag, setNewTag] = useState('0');
    const [tags, setTags] = useState<ITags[]>([]);

    useEffect(() => {
        (async () => {
            try {
                let res = await fetch('/api/tags');
                let tags = await res.json();
                setTags(tags);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await fetch('/api/blogs', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({title, content, authorid: 3,tagid: newTag})
            });
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="row mt-5 justify-content-center">
            <div className="col-md-10">
                <form className="form-group p-3 border border-primary shadow text-center">
                    <h1 className="mb-5 text-primary">New Blog</h1>
                    <input className="form-control mb-5" type="text" placeholder="Enter title ..."
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <select className="form-control"
                        value={newTag}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTag(e.target.value)}>
                        <option value="0" disabled>Choose a Tag ...</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                    <div className="form-group mt-5">
                        <textarea className="form-control" placeholder="Enter your blog ..."
                            value={content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button onClick={handleClick} type="button" className="btn btn-outline-primary btn-lg btn-block mt-5">Create New Blog</button>
                </form>
            </div>
        </section>
    )
}


export default NewBlog;