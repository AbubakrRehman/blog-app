import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
function Admin() {

    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

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

    return (
        <Container>
            <div>
            <h1>Categories</h1>
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