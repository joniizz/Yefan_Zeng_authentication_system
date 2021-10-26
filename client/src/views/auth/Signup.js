import React, { useState, useEffect } from 'react';
// 4 states, email&psw states update via onChange()
// loading state is used to allow a buffer(useEffect()) between
// requesting login page and when it is actuallt rendered.
const Login = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/dashboard');
        } else {
            setLoading(false);

        }
    }, []);

    const onSubmit = e => {
        e.preventDefault(); //to keep the page from refreshing when the form is submitted
        const user = {
            email: email,
            password1: password1,
            password2: password2,
        };
        //a fetch request to the API
        fetch('http://localhost:8000/api/v1/users/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        // check if the request was successful by
        // checking if an authentication token named key
        // is returned
        .then(res =>res.json())
        .then(data => {
            if (data.key) { //token returned by API, show dashbaord
                localStorage.clear();
                localStorage.setItem('token', data.key);
                window.location.replace('http://localhost:3000/dashboard');

            } else { //show errors to user, clear forms
                setEmail('');
                setPassword1('');
                setPassword2('');
                localStorage.clear();
                setErrors(true);
            }
        })
    }

    return (
        <div>
            {loading == false && <h1>Signup</h1>}
            {errors === true && <h2> Cannot login with provided information</h2>}

                <form onSubmit={onSubmit}>
                    <label htmlFor='email'>
                        Email address:</label><br/>
                    <input 
                        name='email'
                        type='email'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        />{' '}
                        <br/>
                        <label htmlFor='password1'>Password:</label><br/>
                        <input 
                            name='password1'
                            type='password'
                            value={password1}
                            required
                            onChange={e => setPassword1(e.target.value)}
                            />{''}
                            <br/>
                            <label htmlFor='password2'>Password confirm:</label><br/>
                        <input 
                            name='password2'
                            type='password'
                            value={password2}
                            required
                            onChange={e => setPassword2(e.target.value)}
                            />{''}
                            <br/>
                            <input type='submit' value='Signup' />

                </form>
            )

        </div>
    )

}
export default Signup;

