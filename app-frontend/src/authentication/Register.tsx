import {Card, Form, InputGroup} from "react-bootstrap";
import {Button} from "../components/Button.tsx";
import "../css/input-field-border.css"
import "../css/login-container.css"
import {useState,} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterAPI} from "../api/RegisterApi.ts";
import type {registerData} from "../interace/registerData.ts";
import {decodeJwtPayload} from "../utils/jwtUtils.ts";

export const Register = () => {
    const [showPass, setShowPass] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleReturnLogin = () => {
        navigate("/login")
    }

    const handleRegisterPayload = async (e) => {
        e.preventDefault()

        const registrationPayload: registerData = {
            firstName: firstName,
            lastName: lastName,
            mail: mail,
            password: password
        }

        try {

            const {token} = await RegisterAPI(registrationPayload);
            const decodedPayload = decodeJwtPayload(token)
            console.log(decodedPayload)
            localStorage.setItem('JWT', token);
            navigate("/welcome");

        } catch (error) {
            console.error(error);

        }
    }
    return (

        <Card className="shadow-pronounced rounded-5 login-hover-lift position-relative" style={{width: '30rem'}}>
            <Button
                className="position-absolute top-0 start-0 m-3 btn-light rounded-4 p-2"
                onclick={handleReturnLogin}
            >
                &#x2190;
            </Button>
            <Card.Body className="p-4 p-md-5">
                <h3 className="text-center mb-4">Register</h3>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ex: John"
                        className="form-control-black-focus"
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex: Doe"
                            className="form-control-black-focus"
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="form-control-black-focus"
                            onChange={e => setMail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type={showPass ? "text" : "password"}
                            placeholder="Enter password"
                            className="form-control-black-focus"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button className="form-check-black" onclick={() => {
                            setShowPass(!showPass)
                        }}>
                            Check password
                        </Button>


                    </InputGroup>


                    <Button className="align-items-center justify-content-center"
                            onclick={e => handleRegisterPayload(e)}>
                        Submit
                    </Button>

                </Form>

            </Card.Body>
        </Card>

    )

}
