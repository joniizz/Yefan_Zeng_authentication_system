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
            <h1>Django react Auth</h1>
            <ul>
                {isAuth === true ?(
                    <Fragment>
                        {''}
                        <li>
                            <Link to='/dashbaord'>Dashbaord</Link>
                        </li>
                        <li>
                            <Link to='/Logout'>Logout</Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        {''}
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/Signup'>Signup</Link>
                        </li>
                    </Fragment>
                )}
            </ul>
        </nav>
    );
};
export default Navbar;
