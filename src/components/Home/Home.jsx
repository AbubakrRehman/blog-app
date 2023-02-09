import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Form, InputGroup } from 'reactstrap';
import { fetchWithBase } from "../utility/api_call.js"
function Home() {
    const location = useLocation();
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");


    useEffect(() => {
        fetchWithBase("/blogs?pageNumber=0&pageSize=10&sortBy=blogId&sortDir=asc").then((blogs) => {
            console.log('blogs', blogs.blogs);
            setBlogs(blogs.blogs);
        })

        fetchWithBase("/categories").then((categories) => {
            console.log('categories', categories);
            setCategories(categories);
        })

    }, [])


    useEffect(() => {
        if (selectedCategoryId !== 0) {
            fetchWithBase(`/category/${selectedCategoryId}/blogs?pageNumber=0&pageSize=10&sortBy=title&sortDir=asc`)
                .then((blogs) => {
                    console.log('AllBlogsByCategoryId', blogs.blogs);
                    setBlogs(blogs.blogs);
                })
        }

    }, [selectedCategoryId])


    const handleSelectChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setSelectedCategoryId(value);

    }


    const handleSearchButtonClick = (e, searchKeyword) => {
        fetchWithBase(`/blogs/search/${searchKeyword}`)
            .then((searchResultBlogs) => {
                console.log('Search Result', searchResultBlogs);
                setBlogs(searchResultBlogs);
            })
    }

    return (
        <Container>
            <div>
                <input placeholder="Search by blog title" type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                <Button onClick={(e) => handleSearchButtonClick(e, searchKeyword)}> Search</Button>
            </div>
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
            <hr/>

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

export default Home