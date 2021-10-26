import React, { useState, useEffect, Fragment } from 'react';

// 4 states, email&psw states update via onChange()
// loading state is used to allow a buffer(useEffect()) between
// requesting login page and when it is actuallt rendered.
const Logout = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            setLoading(false);

        }
    }, []);


    const handleLogout = e => {
        e.preventDefault(); //to keep the page from refreshing when the form is submitted
        const user = {
            email: email,
            password: password,
        };
        //a fetch request to the API
        fetch('http://localhost:8000/api/v1/users/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            
        })
        // check if the request was successful by
        // checking if an authentication token named key
        // is returned
        .then(res =>res.json())
        .then(data => {
            console.log(data);
            localStorage.clear();
            window.location.replace('http://localhost:3000/login');
            

        })
    }

    return (
        <div>
            {loading == false && (
                <Fragment>
                    <h1>Are you sure you want to log out?</h1>
                    <input type='button' value='Logout' onClick={handleLogout} />

                </Fragment>

                 )}

        </div>
    )

}
export default Logout;


