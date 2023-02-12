import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { fetchWithBase, fetchWithBaseAndTokenPost } from '../utility/api_call';

function BlogItem() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [comment, setComment] = useState("");
     const { auth, setAuth } = useContext(AuthContext);
     const [_, set_] = useState(null);

    useEffect(() => {
        console.log("hai bhai idhar....");
        fetchWithBase(`/blogs/${blogId}`)
            .then((blog) => {
                console.log("blog dekho", blog);
                setBlog(blog);

            })
            .catch((err) => {
                console.log("error hai", err);
            })

    }, [_])

   

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWithBaseAndTokenPost(`/blogs/${blog.blogId}/comments`, auth.token, {comment:comment})
            .then((jsonRes) => {
                console.log(jsonRes);
                setComment("");
                set_("");
            })
            .catch((err) => {
                console.log("Internal Server Error");
            })

    }


    return (
        <Container>
            {
                Object.keys(blog).length ?
                    <div >
                        <div>Category: {blog.category.categoryTitle}</div>
                        <div>Title: {blog.title}</div>
                        <div>Author: {blog.user.firstName}</div>
                        <div>Content: {blog.content}</div>
                        <div>Date: {blog.bloggedDate}</div>
                        <h2>Comments</h2>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                           
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control onChange={(e) => setComment(e.target.value)} value={comment} name="comment" placeholder="Enter comment" as="textarea" rows={3} />
                            </Form.Group>
                         
                            <Button type="submit">Submit</Button>
                        </Form>
                        <hr />
                        {
                            blog.comments.length === 0 ? <div>"No comments avaialble yet" </div>
                                :
                                <div>
                                    {blog.comments.map((comment, commentIndex) => {
                                        return <div key={comment.commentId}> {comment.comment}</div>
                                    })}
                                </div>
                        }

                        <hr />
                    </div>
                    :
                    <div>...Loding</div>
            }
        </Container>
    )
}

export default BlogItem