import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import AuthContext from '../context/AuthProvider';
import { fetchWithBase, fetchWithBaseAndTokenPost } from "../utility/api_call.js"

function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const { auth, setAuth } = useContext(AuthContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        content: ""
    });
    const [_, set_] = useState(null);

    useEffect(() => {




        fetchWithBase(`/user/${auth.userId}/blogs?pageNumber=0&pageSize=20&sortBy=blogId&sortDir=asc`)
            .then((blogs) => {
                console.log('blogs: ', blogs.blogs);
                setBlogs(blogs.blogs);
            })


        fetchWithBase("/categories")
            .then((categories) => {
                console.log('categories', categories);
                setCategories(categories);
            })


    }, [_]);


    const handleSelectChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setSelectedCategoryId(value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWithBaseAndTokenPost(`/user/${auth.userId}/category/${selectedCategoryId}/blogs`, auth.token, formValues)
            .then((jsonRes) => {
                console.log(jsonRes);
                set_("");
            })
            .catch((err) => {
                console.log("Internal Server Error");
            })

    }


    const handleFormInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const tempFormValues = { ...formValues, [name]: value };
        setFormValues(tempFormValues);
    }

    return (
        <Container>
            <div>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(e) => handleFormInputChange(e)} value={formValues.title} name="title" type="text" placeholder="Enter title for blog" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Blog</Form.Label>
                        <Form.Control onChange={(e) => handleFormInputChange(e)} value={formValues.content} name="content" placeholder="Enter blog" as="textarea" rows={3} />
                    </Form.Group>
                    <div>
                        <div>Category</div>
                        <div>
                            <select onChange={(e) => handleSelectChange(e)}>
                                <option value={0}>Select</option>
                                {
                                    categories.map((category, categoryId) => {
                                        return <option key={category.categoryId} value={category.categoryId}> {category.categoryTitle}</option>

                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
                <hr />
            </div>
            {blogs.length ?
                blogs.map((blog, blogIndex) => {
                    return <div key={blog.blogId}>
                        <div>Category: {blog.category.categoryTitle}</div>
                        <div>Title: {blog.title}</div>
                        <div>Author: {blog.user.firstName}</div>
                        <div>Content: {blog.content}</div>
                        <div>Date: {blog.bloggedDate}</div>
                        <div>Comment: {blog.comments.length === 0 ? "No comments avaialble yet" : JSON.stringify(blog.comments)}</div>
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