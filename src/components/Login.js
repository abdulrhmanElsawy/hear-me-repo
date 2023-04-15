import './css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginImg from './images/login.jpg';
import React, { useState,useEffect } from 'react';
import Axios from '../config/index';
import ShowButton from './ShowButton';


function Login(props) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const [loginStatus, setLoginStatus] = useState("");
const [loading, setLoading] = useState(false);



const [show, setShow] = useState(false);

const handleToggle = () => {
    setShow(!show);
};

const handleChange = (event) => {
    setPassword(event.target.value);
};



Axios.defaults.withCredentials = true;



    useEffect(() => {
        Axios
    .get('login')
    .then((res) => {
        if (res.data.valid) {
            props.setSessionExists(true);
        } else {
            props.setSessionExists(false);
        }
    })
    .catch((err) => console.log(err));
    },[]);

    useEffect(() => {
        if (props.sessionExists) {
        navigate('/');
        }
    },[]);
    
    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        props.setSessionExists(false);
        Axios.post("login", {
            email: email,
            password: password,
        })
        .then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
                setLoading(false);
                return props.setSessionExists(false);
            } else {
                setLoading(false);
                props.setSessionExists(true);
                console.log(props.sessionExists);
                setLoginStatus("Successfully logged in.");
                navigate('/');
            }
        })
        .catch((err) => {
            setLoading(false);
            setLoginStatus("Failed to log in. Please try again.");
            return props.setSessionExists(false);
        });
    };
    
    
return (
    <>
    {props.sessionExists ?(
        navigate('/')

    ):(
        <section className='login'>
        <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='login-content'>
                <h1>Login and start Your Test now</h1>

                {loginStatus ? (
                <h3 className='err-msg'> {loginStatus} </h3>
                ) : null}

                <form>
                <div className='input'>
                    <label>E-mail</label>
                    <input
                    type='text'
                    name='email'
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    />
                </div>

                <div className='input'>
                    <label>Password</label>
                    <input
                    type={show ? 'text' : 'password'}
                    name='password'
                    required
                    onChange={(e) => {
                        handleChange(e);
                        setPassword(e.target.value);
                    }}
                    />

                <ShowButton className="show-btn" show={show} handleToggle={handleToggle} />

                </div>

                {loading ? (
                    <button disabled>Logging in...</button>
                ) : (
                    <button onClick={login} type='submit'>
                    Login
                    </button>
                )}

                <Link to='/signup'>Create account?</Link>
                </form>
            </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='login-content'>
                <img src={LoginImg} alt='login' />
            </div>
            </div>
        </div>
        </div>
    </section>

    )}
    </>
);
}

export default Login;
