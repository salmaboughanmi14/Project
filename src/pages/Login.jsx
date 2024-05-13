// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css"; 

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => { 
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate('/dashboard'); // Replace with your actual redirect path
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials or try again later.');
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#CCA800' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card rounded shadow-sm" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="image/logo.png"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={loginUser}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        {/* Consider customizing the icon or using your logo */}
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Sign Up</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '2px' }}>
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={data.password}
                          onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        
                      </div>

                      <div className="pt-1 mb-4">
                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                          Login
                        </button>
                      </div>

                      <Link  to= "/forgot-password" className="small text-muted" >
                        Forgot password?
                      </Link>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        Don't have an account?{' '}
                        <a href="#!" style={{ color:'#393f81'}}>Register here</a></p>
                        </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 );
}
