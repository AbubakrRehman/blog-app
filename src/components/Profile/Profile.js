import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import AuthContext from '../context/AuthProvider';
import { fetchWithBase } from '../utility/api_call'

function Profile() {
    const { auth, setAuth } = useContext(AuthContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        fetchWithBase(`/users/${auth.userId}`)
            .then((user) => {
                console.log(user);
                setUser(user);
            })


    }, [])

    return (
        <Container>
            {
                Object.keys(user).length?
                <div>
                    <div>UserId: {user.userId}</div>
                    <div>firstName: {user.firstName}</div>
                    <div>lastName: {user.lastName}</div>
                    <div>email: {user.email}</div>
                    <div>password:{user.password}</div>
                </div>
                :
                "Sorry"
            }
        </Container>
    )
}

export default Profile