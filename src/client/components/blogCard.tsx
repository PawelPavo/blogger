import * as React from 'react';
import { IBlogs } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import {FaEdit, } from 'react-icons/fa';

const BlogCard: React.SFC<BlogCardProps> = props => {

    return (
        <>
            <div className="col-md-4 my-3">
                <div className="card shadow">
                    {props.blog.image_url &&<img src={props.blog.image_url} className="card-img-top" alt="Image Broken"/>}
                    <h4 className="card-header text-center text-info"> {props.blog.title}</h4>
                    <div className="card-body">
                        <p className="card-title">By: {props.blog.name}</p>
                        <span className="badge badge-secondary badge-pill">{props.blog.tag_name}</span>
                    </div>

                    <div className="card-footer">
                        <div className="mt-3 text-center">
                            <Link className="btn btn-outline-info btn-sm" to={`${props.blog.id}/details`}><FaEdit /> View Blog</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface BlogCardProps {
    blog: IBlogs
}

export default BlogCard;