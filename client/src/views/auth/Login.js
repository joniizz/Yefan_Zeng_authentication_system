import React, { useState, useEffect } from 'react';
// 4 states, email&psw states update via onChange()
// loading state is used to allow a buffer(useEffect()) between
// requesting login page and when it is actuallt rendered.
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            password: password,
        };
        //a fetch request to the API
        fetch('http://localhost:8000/api/v1/users/auth/login/', {
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
            if (data.key) { //token returned by API
                localStorage.clear();
                localStorage.setItem('token', data.key);
                window.location.replace('http://localhost:3000/dashboard');

            } else { //show errors to user, clear forms
                setEmail('');
                setPassword('');
                localStorage.clear();
                setErrors(true);
            }
        })
    }

    return (
        <div className='formlogin'>
            {loading == false && <h1>Login</h1>}
            {errors === true && <h2> Cannot login with provided information, please try again!</h2>}
            {loading == false && (
                <form onSubmit={onSubmit}>
                    
                    <label htmlFor='email' >
                        Email address:</label>
                        <br/>
                    <input 
                        name='email'
                        type='email'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        />
                        <br/>
                        <label htmlFor='password'>Password:</label><br/>
                        <input 
                            name='password'
                            type='password'
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                            />
                            <br/>
                            <input type='submit' value='Login'/>
                  
                </form>
            )}

        </div>
    )

}
export default Login;

