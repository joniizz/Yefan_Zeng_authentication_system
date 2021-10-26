import React, { useState, useEffect } from 'react';
// 4 states, email&psw states update via onChange()
// loading state is used to allow a buffer(useEffect()) between
// requesting login page and when it is actuallt rendered.
const Signup = () => {
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
        fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
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
            if (data.key) { //token returned by API, show dashboard
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
        });
    };

    return (
        <div className='formsignup'>
            {loading == false && <h1>Signup</h1>}
            {errors === true && <h2> Cannot sign up with provided information</h2>}

            <form onSubmit={onSubmit}>
                    <label htmlFor='email'>
                        Email address:</label>
                        <text className='marker'>(Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.)</text>
                        <br/>
                    <input 
                        name='email'
                        type='email'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        />{' '} 
                        
                        <br/>
                        <label htmlFor='password1'>Password:</label><text className='marker'>(It must contain at least 8 characters.)</text>
                        <br/>

                        <input 
                            name='password1'
                            type='password'
                            value={password1}
                            onChange={e => setPassword1(e.target.value)}
                            required
                            />{''}
                            <br/>
                            <label htmlFor='password2'>Password confirm:</label><br/>
                        <input 
                            name='password2'
                            type='password'
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                            required
                            />{' '}
                            <br/>
                            <input type='submit' value='Signup' />

                </form>


        </div>
    );

};
export default Signup;

