import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import AuthContext from '../context/AuthProvider';
import { fetchWithBaseAndTokenPost } from '../utility/api_call';
function Admin() {

    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const [_, set_] = useState(null);

    useEffect(() => {
        // const fetchUsers = async () => {
        //     const UsersResponse = await fetch(`http://blogapp-env.eba-zrcpsce5.ap-south-1.elasticbeanstalk.com/api/users`)
        //     const UsersResponseJson = await UsersResponse.json();
        //     return UsersResponseJson;
        // }

        const fetchCategories = async () => {
            const categoriesResponse = await fetch(`http://blogapp-env.eba-zrcpsce5.ap-south-1.elasticbeanstalk.com/api/categories`)
            const categoriesResponseJson = await categoriesResponse.json();
            return categoriesResponseJson;
        }
        fetchCategories().then((categories) => {
            console.log('categories', categories);
            setCategories(categories);
        });


        // fetchUsers().then((users) => {
        //     console.log('users', users);
        //     setUsers(users);
        // });


    }, [])

    const handleSubmitCategory = (e) => {
        e.preventDefault();
        fetchWithBaseAndTokenPost(`/categories`, auth.token, {category:category})
            .then((jsonRes) => {
                console.log(jsonRes);
                setCategory("");
                set_("");
            })
            .catch((err) => {
                console.log("Internal Server Error");
            })

    }

    return (
        <Container>
            <div>
                <h1>Categories</h1>
                <Form onSubmit={(e) => handleSubmitCategory(e)}>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control onChange={(e) => setCategory(e.target.value)} value={category} name="comment" placeholder="Enter category" type="text" />
                    </Form.Group>

                    <Button type="submit">Submit</Button>
                </Form>
                <hr/>
                {categories.map((category, categoryIndex) => {
                    return <div key={category.categoryId}>
                        <div>Category: {category.categoryTitle}</div>
                        <div>Description: {category.categoryDescription}</div>

                        <Button>View</Button>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                        <hr />

                    </div>
                })}

            </div>
            {/* <div>
            <h1>Users</h1>
                {users.map((user, userIndex) => {
                    return <div key={user.userId}>
                        <div>FirstName: {user.firstName}</div>
                        <div>LastName: {user.lastName}</div>
                        <div>Roles: {JSON.stringify(user.roles)}</div>
                        <div>About: {user.about}</div>
                        <Button>View</Button>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                        <hr />
                    </div>
                })}

            </div> */}
        </Container>
    )
}

export default Admin