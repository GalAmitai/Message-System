import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {

    constructor(props) {
        super(props);
        var token = localStorage.getItem('gal_token');
        var user_id = localStorage.getItem('gal_user_id');

        this.state = {
            isAuth: token ? true : false,
            token: token ? token : null,
            user_id: user_id ? user_id : null
        };
    }

    set = (boolean, token, user_id) => {
        this.setState({
            isAuth: boolean,
            token: token,
            user_id: user_id
        });
    }

    setIsAuth = (boolean) => {
        this.setState({ isAuth: boolean });
    }

    setToken = (token) => {
        this.setState({ token });
    }

    setUserId = (user_id) => {
        this.setState({ user_id });
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state,
                set: this.set,
                setIsAuth: this.setIsAuth,
                setToken: this.setToken,
                setUserId: this.setUserId
                }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;