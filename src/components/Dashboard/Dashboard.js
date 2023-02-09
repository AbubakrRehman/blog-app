import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import AuthContext from '../context/AuthProvider';

function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const { auth, setAuth } = useContext(AuthContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [categories, setCategories] = useState([]);

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


        const fetchCategories = async () => {
            const categoriesResponse = await fetch(`http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/categories`)
            const categoriesResponseJson = await categoriesResponse.json();
            return categoriesResponseJson;
        }

        fetchCategories().then((categories) => {
            console.log("categories", categories);
            setCategories(categories);
        })


    }, []);


    const handleSelectChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setSelectedCategoryId(value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/user/${auth.userId}/category/${selectedCategoryId}/blogs`)
            .then((res) => res.json())
            .then((jsonRes) => console.log(jsonRes))
            .catch((err)=>{
                console.log("Internal Server Error");
            })

    }



    return (
        <Container>
            <div>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
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

            </div>
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