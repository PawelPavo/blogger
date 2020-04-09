export interface IBlogs {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    authorid: number;
    created_at: Date;
    name: string;
    tag_name?: string
};

export interface IAuthors {
    id: number;
    name: string;
    email: string;
    created_at: Date;
};

export interface ITags {
    id: number;
    name: string;
    created_at: Date;
};

