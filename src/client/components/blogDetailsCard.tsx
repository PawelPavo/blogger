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
        <div className="row justify-content-md-center">
            <div className="col-md-8">
                <div className="card shadow">
                    <div className="card-header text-center">
                        <div className="row">
                            <div className="col-2">
                                {blogs.image_url && <img src={blogs.image_url} className="img-thumbnail" width="100" height="100" />}
                            </div>
                            <div className="col-8">
                                <h4 className="mt-3">{blogs.title}</h4>
                                <h6 className="card-title text-center text-muted mt-2">Written by: {blogs.name}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <ReactMarkdown source={blogs.content} />
                        <p className="text-muted text-center ">{moment(blogs.created_at).format('MMM Do YYYY')}</p>
                        <p className="text-monospace badge badge-pill badge-success shadow" >{blogs.tag_name}</p>
                        <div className="d-flex justify-content-end">
                            <Link to="/" className="btn btn-primary m-1 shadow-sm">Back To All Blogs</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailsCard;