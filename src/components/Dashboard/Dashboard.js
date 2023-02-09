import React, { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import AuthContext from '../context/AuthProvider';

function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const {auth,setAuth} = useContext(AuthContext);

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogResponse = await fetch(`http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/user/${auth.userId}/blogs?pageNumber=0&pageSize=4&sortBy=title`)
            const blogResponseJson = await blogResponse.json();
            return blogResponseJson.blogs;
        }

        fetchBlogs().then((blogs) => {
            console.log('blogs', blogs);
            setBlogs(blogs);
        });
    }, []);


    return (
        <Container>
            {blogs.length ?
                blogs.map((blog, blogIndex) => {
                    return <div key={blog.blogId}>
                        <div>Category: {blog.category.categoryTitle}</div>
                        <div>Title: {blog.title}</div>
                        <div>Author: {blog.user.firstName}</div>
                        <div>Content: {blog.content}</div>
                        <div>Date: {blog.bloggedDate}</div>
                        <div>Comment: {blog.comments.length === 0 ? "No comments avaialble yet" : blog.comments}</div>
                        <hr />
                    </div>
                })
                :
                <div>No blogs available</div>
            }
        </Container>
    )
}

export default Dashboard