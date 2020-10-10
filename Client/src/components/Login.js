import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router'
import config from './../configuration/config';
import axios from 'axios';

const Login = () => {

    const contextType = AuthContext;
    const [isAuth, setIsAuth] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setError] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        if(!username || !password) {
            setError(1);
            setErrorMessage('Missing Information..');
        } else {
            setError(0);
            axios.post(`${config.server.api_baseurl}/auth/login`, {username, password}).then(res => {
                if(res.data.isAuth == true) {
                    // Store in REDUX & Redirect to home
                    localStorage.setItem("gal_token", res.data.token);
                    localStorage.setItem("gal_user_id", res.data.user.id);
                    setIsAuth(res.data);
                } else {
                    throw 'err';
                }
            }).catch(res => {
                setError(1);
                setErrorMessage('Wrong Credentials');
            });
        }
    }
    return (
        <AuthContext.Consumer>{(context) => {
            if (context.isAuth || isAuth.token) {
                if(isAuth.token) {
                    context.set(isAuth.isAuth, isAuth.token, isAuth.user.id);
                }
                return <Redirect to="/" />
            }
            return (
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                            </Header>
                        <Form size='large' onSubmit={handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Button color='teal' fluid size='large'>
                                    Login
                                    </Button>
                            </Segment>
                        </Form>
                        <Message negative style={{display: hasError ? 'block' : 'none'}}>
                            {errorMessage}
                        </Message>
                    </Grid.Column>
                </Grid>
            )
        }}
        </AuthContext.Consumer>
    )
}

export default Login;