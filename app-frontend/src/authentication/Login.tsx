import {Card, Form, InputGroup} from "react-bootstrap";
import {Button} from "../components/Button.tsx";
import "../css/input-field-border.css"
import "../css/login-container.css"
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import type {loginData} from "../interace/registerData.ts";
import {LoginAPI} from "../api/LoginApi.ts";
import {decodeJwtPayload} from "../utils/jwtUtils.ts";

export const Login = () => {

    const [showPass, setShowPass] = useState(false)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLoginPayload = async (e) => {
        e.preventDefault()

        const loginPayload: loginData = {
            mail: mail,
            password: password
        }
        try {
            const {token} = await LoginAPI(loginPayload);
            const decodedPayload = decodeJwtPayload(token)
            console.log(decodedPayload)
            localStorage.setItem('JWT', token);
            localStorage.setItem('authId', `${decodedPayload["authId"]}`)
            localStorage.setItem('role', `${decodedPayload['role']}`)
            navigate("/welcome");

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Card className="shadow-pronounced rounded-5 login-hover-lift" style={{width: '30rem'}}>
            <Card.Body className="p-4 p-md-5">
                <h3 className="text-center mb-4">Log In</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="form-control-black-focus"
                            onChange={e => setMail(e.target.value)}
                        />
                    </Form.Group>
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

                    <Button className="align-items-center justify-content-center" onclick={handleLoginPayload}>
                        Submit
                    </Button>

                </Form>
                {<NavLink to="/register">Don't have an account yet ?</NavLink>}
            </Card.Body>
        </Card>

    )

}