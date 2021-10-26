import React, {useEffect, useState, Fragment} from React;

const Dashbaord = () => {
    const [useremail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === null){
            window.location.replace('http://localhost:3000/login');

        } else {
            fetch('localhost:8000/api/v1/users/auth/user/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            }).then(res => res.json())
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
                    <h1>Dashboard</h1>
                    <h2>Hello {useremail}!</h2>
                </Fragment>
            )}
        </div>

    );

};
export default Dashbaord;