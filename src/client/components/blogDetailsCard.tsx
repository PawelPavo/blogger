import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { IBlogs } from '../utils/interfaces';
import ReactMarkdown from 'react-markdown';;


export interface BlogDetailsCardProps {
    blogs: IBlogs,
}

const BlogDetailsCard: React.SFC<BlogDetailsCardProps> = ({ blogs }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-header text-center">
                            <h4 className="mt-3">{blogs.title}</h4>
                            <h6 className="card-title text-muted mt-2">Written by: {blogs.name}</h6>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-5">
                                {blogs.image_url && <img src={blogs.image_url} />}
                            </div>
                            <div className="col">
                                <div className="card overflow-auto" style={{ maxHeight: '302px' }}>
                                    <ReactMarkdown source={blogs.content} />
                                </div>
                            </div>
                            <p className="text-muted text-center mt-3">{moment(blogs.created_at).format('MMM Do YYYY')}</p>
                            <p className="text-monospace badge badge-pill badge-success shadow" >{blogs.tag_name}</p>
                            <div className="d-flex justify-content-center">
                                <Link to="/" className="btn btn-primary m-1 shadow-sm">Back To All Blogs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default BlogDetailsCard;