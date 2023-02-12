import React, { useContext, useState } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import AuthContext from '../context/AuthProvider';
import { useNavigate,useLocation } from "react-router-dom";
import { fetchWithBasePost } from '../utility/api_call';

function LogIn() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location=useLocation();


    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    });


    const handleFormInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const tempFormValues = { ...formValues, [name]: value };
        setFormValues(tempFormValues);
    }

    const loginCall = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        };

        const res = await fetch("http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/auth/login", requestOptions);
        const jsonResponse = await res.json();
        return jsonResponse;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const loginResponse = await fetchWithBasePost("/auth/login",formValues);
            console.log(loginResponse);
            if (!loginResponse.statusCode) {
                console.log(loginResponse);
                setAuth(loginResponse);
                navigate("/dashboard",{state:location,replace:true});
            }else{
                console.log(loginResponse.message);
                alert(loginResponse.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
        <div>{JSON.stringify(location)}</div>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={formValues.username} name="username" onChange={(e) => handleFormInputChange(e)} type="email" placeholder="Enter email" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={formValues.password} name="password" onChange={(e) => handleFormInputChange(e)} type="text" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default LogIn