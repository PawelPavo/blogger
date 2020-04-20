import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IBlogs } from '../utils/interfaces';
import BlogDetailsCard from '../components/blogDetailsCard'

export interface DetailsProps extends RouteComponentProps<{ id: string }> { }

const Details: React.SFC<DetailsProps> = props => {

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

    useEffect(() => {
        (async () => {
            let blogid = props.match.params.id;
            console.log(blogid)
            try {
                let res = await fetch(`/api/blogs/${blogid}`);
                let blog = await res.json()
                setBlog(blog)
            } catch (error) {
                console.log({ error: 'This is shit' })
            }
        })()
    }, [props.match.params.id]);

    return (
        <div className="container">
            <div className="mt-5">
                <BlogDetailsCard blogs={blog} />
            </div>
        </div>
    )

}


export default Details;