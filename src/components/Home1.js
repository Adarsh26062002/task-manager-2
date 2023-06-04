import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Home1 = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the request body
        const requestBody = {
            id: new Date().getTime(),
            username,
            password,
        };

        // Send the signup request
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server
                console.log(data); // You can perform further actions here
            })
            .catch((error) => {
                // Handle any errors that occur during the signup process
                console.error('Error:', error);
            });
        
        navigate('/signin');
    }

    return (
        <div h-100>
            <div>
                <section className="vh-100 bg-image"
                    style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6 ">
                                    <h1 className="text-uppercase text-center mb-3" style={{ fontSize: "68px", color: "#000000", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Task Manager</h1>
                                    <div className="card" style={{ borderRadius: "15px" }}>
                                        <div className="card-body p-5">
                                            <h3 className="text-uppercase text-center mb-3">Create an account</h3>

                                            <form onSubmit={handleSubmit}>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example3cg" className="form-control form-control-lg" value={username}
                                                        onChange={handleUsernameChange} />
                                                    <label className="form-label" htmlFor="form3Example3cg">Create User Name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password}
                                                        onChange={handlePasswordChange} />
                                                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <button type="submit"
                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                                </div>

                                                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/signin"
                                                    className="fw-bold text-body"><u>Login here</u></a></p>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home1
