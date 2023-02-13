import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Container, Form, InputGroup } from 'reactstrap';
import { fetchWithBase, fetchWithBaseAndTokenDelete, fetchWithBaseDelete } from "../utility/api_call.js";
import { Button } from 'react-bootstrap';
import AuthContext from '../context/AuthProvider.js';
function Home() {
    const location = useLocation();
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const [_, set_] = useState(null);


    useEffect(() => {
        fetchWithBase("/blogs?pageNumber=0&pageSize=10&sortBy=blogId&sortDir=asc").then((blogs) => {
            console.log('blogs', blogs.blogs);
            setBlogs(blogs.blogs);
        })

        fetchWithBase("/categories").then((categories) => {
            console.log('categories', categories);
            setCategories(categories);
        })

    }, [_])


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

    const handleDeleteButtonClick = (e,blogId) => {
        fetchWithBaseAndTokenDelete(`/blogs/${blogId}`,auth.token)
            .then((deleteResult) => {
                console.log('Search Result', deleteResult);
                set_("");
            })
    }



    return (
        <Container>
            <div>
                <input placeholder="Search by blog title" type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                <Button onClick={(e) => handleSearchButtonClick(e, searchKeyword)}> Search </Button>
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
            <hr />

            {blogs.length ?
                blogs.map((blog, blogIndex) => {
                    return <div key={blog.blogId}>
                       
                        <div>Title: {blog.title}</div>
                       
                        <div>Content: {blog.content}</div>
                     
                        <NavLink className="btn btn-success" to={`/${blog.blogId}`}  key={blog.blogId}>Read More</NavLink>
                        {Object.keys(auth).length && auth.userId === blog.user.userId ?
                            <div>
                                <Button onClick={(e) =>  handleDeleteButtonClick(e,blog.blogId)}>Delete</Button>
                                <span>  </span>
                                <Button onClick={(e) => console.log("Hello!!")}>Edit</Button>
                            </div>
                            :
                            ""
                        }
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