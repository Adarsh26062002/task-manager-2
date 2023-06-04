import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Create the request body
    const requestBody = {
      username,
      password,
    };

    // Send the sign-in request
    fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        const { token } = data;
        // Store the token in localStorage or cookies for persistence
        localStorage.setItem('token', token);
        navigate('/todolist');
      })
      .catch((error) => {
        // Handle any errors that occur during the sign-in process
        console.error('Error:', error);
      });

    onSignIn(username);
    // navigate('/todolist');
  };

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
                                            <h3 className="text-uppercase text-center mb-3">Sign In</h3>

                                            <form onSubmit={handleSignIn}>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example3cg" className="form-control form-control-lg" value={username}
                                                        onChange={(e)=>{setUsername(e.target.value)}} />
                                                    <label className="form-label" htmlFor="form3Example3cg">Create User Name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password}
                                                        onChange={(e)=>{setPassword(e.target.value)}} />
                                                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <button type="submit"
                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                                </div>

                                                <p className="text-center text-muted mt-5 mb-0">I am a new user <a href="/"
                                                    className="fw-bold text-body"><u>Register here</u></a></p>

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
  );
};

export default SignIn;
