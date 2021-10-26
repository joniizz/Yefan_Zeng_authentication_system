import React, {useEffect, useState, Fragment} from 'react';

const Dashboard = () => {
    const [useremail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === null){
            window.location.replace('http://localhost:3000/login');

        } else {
            fetch('http://localhost:8000/api/v1/users/auth/user/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUserEmail(data.email);
                setLoading(false);
            });

        }   
    },[]);

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <div className='form'>
                    <h1 className='dashboardhead'>Welcome to dashboard</h1>
                    <h2>Hello {useremail}!</h2>
                    </div>
                </Fragment>
            )}
        </div>

    );

};
export default Dashboard;