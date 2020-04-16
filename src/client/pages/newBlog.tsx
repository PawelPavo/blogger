import * as React from 'react';
import { useState, useEffect } from 'react';
import { ITags } from '../utils/interfaces';
import { RouteComponentProps } from 'react-router';
import ReactMarkdown from 'react-markdown';


export interface NewBlogProps extends RouteComponentProps { };



const NewBlog: React.SFC<NewBlogProps> = props => {

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [newTag, setNewTag] = useState('0');
    const [tags, setTags] = useState<ITags[]>([]);
    const get_random = function (list: any) {
        return list[Math.floor((Math.random() * list.length))];
    }

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
                body: JSON.stringify({
                    title, content, authorid: 3, tagid: newTag, image_url:
                        get_random([
                            'https://i.picsum.photos/id/0/200/200.jpg',
                            'https://i.picsum.photos/id/119/200/200.jpg',
                            'https://i.picsum.photos/id/180/200/200.jpg',
                            'https://i.picsum.photos/id/20/200/200.jpg',
                            'https://i.picsum.photos/id/201/200/200.jpg',
                            'https://i.picsum.photos/id/266/200/200.jpg',
                            'https://i.picsum.photos/id/370/200/200.jpg',
                            'https://i.picsum.photos/id/445/200/200.jpg',
                        ])
                })
            });
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid">
            <section className="row mt-5 justify-content-center">
                <div className="col-md-12">
                    <form className="form-group p-3 border border-primary shadow">
                        <h1 className="mb-3 text-primary text-center">New Blog</h1>
                        <input className="form-control mb-5" type="text" placeholder="Enter title ..."
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                        <select className="form-control"
                            value={newTag}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTag(e.target.value)}>
                            <option value="0" disabled>Choose a tag ...</option>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        <div className="row form-group mt-5">
                            <div className="col-md-6">
                                <textarea className="form-control" rows={12} placeholder="Enter text ..."
                                    value={content}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="col-md-6 d-none d-sm-block d-print-block">
                                <div className="card shadow overflow-auto" style={{ maxHeight: '302px' }}>
                                    <ReactMarkdown source={content} />
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-6 text-muted text-center">
                                <small>*Markdown is supported</small>
                            </div>
                            <div className="col-md-6 text-muted text-center">
                                <small className="d-none d-sm-block d-print-block">*Markdown Preview</small>
                            </div>
                        </div>
                        <button onClick={handleClick} type="button" className="btn btn-outline-primary btn-lg btn-block mt-3">Create New Blog</button>
                    </form>
                </div>
            </section>

        </div>
    )
}


export default NewBlog;