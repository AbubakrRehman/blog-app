import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Form, InputGroup } from 'reactstrap';
function Home() {
    const location = useLocation();
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");


    useEffect(() => {
        const fetchBlogs = async () => {
            const blogResponse = await fetch("http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/blogs?pageNumber=0&pageSize=10&sortBy=blogId&sortDir=asc")
            const blogResponseJson = await blogResponse.json();
            return blogResponseJson.blogs;
        }

        const fetchCategories = async () => {
            const categoriesResponse = await fetch("http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/categories")
            const categoriesResponseJson = await categoriesResponse.json();
            return categoriesResponseJson;
        }

        fetchBlogs().then((blogs) => {
            console.log('blogs', blogs);
            setBlogs(blogs);
        })

        fetchCategories().then((categories) => {
            console.log("categories", categories);
            setCategories(categories);
        })





    }, [])


    useEffect(() => {
        const fetchAllBlogsByCategoryId = async (selectedCategoryId) => {
            const blogResponse = await fetch(`http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/category/${selectedCategoryId}/blogs?pageNumber=0&pageSize=10&sortBy=title&sortDir=asc`)
            const blogResponseJson = await blogResponse.json();
            return blogResponseJson.blogs;
        }
        if (selectedCategoryId !== 0) {
            fetchAllBlogsByCategoryId(selectedCategoryId).then((blogs) => {
                console.log('AllBlogsByCategoryId', blogs);
                setBlogs(blogs);
            })
        }

    }, [selectedCategoryId])


    const handleSelectChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setSelectedCategoryId(value);

    }


    const handleSearchButtonClick = (e,searchKeyword) => {
        const searchApiCall = async (searchKeyword) => {
            const blogResponse = await fetch(`http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/blogs/search/${searchKeyword}`)
            const blogResponseJson = await blogResponse.json();
            return blogResponseJson;
        }

        searchApiCall(searchKeyword).then((searchResult) => {
            console.log('Search Result', searchResult);
            setBlogs(searchResult);
        })
        

    }

    return (
        <Container>
            <div>
                <input placeholder="Search by blog title" type="text" value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)}/>
                <Button onClick={(e)=>handleSearchButtonClick(e,searchKeyword)}> Search</Button>
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