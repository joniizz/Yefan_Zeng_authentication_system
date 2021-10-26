import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
//navbar shows on every pages
const Navbar = () => {
    //useState to keep track of the status of the users 
    //authentication false ->render to login&signup links
    //ref:https://reactjs.org/docs/conditional-rendering.html
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token') !== null){
            setIsAuth(true);
        }
    }, []);
    return (
        <nav>
            <h1>Django React Authentication System</h1>
            <ul>
                {isAuth === true ?(
                    <Fragment>
                        {''}
                        <ul>
                            <a href='/dashboard'>Dashboard</a>
                        </ul>
                        <ul>
                            <a href='/Logout'>Logout</a>
                        </ul>
                    </Fragment>
                ) : (
                    <Fragment>
                        {''}
                        <ul >
                            
                            <a href='/login' >Login</a>
                        </ul>
                        {''}
                        <ul >
                            <a href='/Signup' >Signup</a>
                        </ul>
                    </Fragment>
                )}
            </ul>
        </nav>
    );
};
export default Navbar;
