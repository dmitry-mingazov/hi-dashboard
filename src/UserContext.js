import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const CustomContext = props => {

    const [isTokenSet, tokenIsSet] = useState(false);
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently.apply().then(token => {
                // console.log(token);
                console.log('token-ready');
                axios.interceptors.request.use(config => {
                    config.headers.Authorization = `Bearer ${token}`;
                    return config;
                });
                tokenIsSet(true);
            });
        }
    });

    return (
        <UserProvider
            value={{user, isTokenSet, isAuthenticated, isLoading, }}
        >
            {props.children}
        </UserProvider>
    )
}

export { UserConsumer, CustomContext, UserContext }