    import './css/login.css';
    import { Link,useNavigate } from 'react-router-dom';
    import SignupImg from './images/signup.jpg';
    import React, { useState,useEffect } from 'react';
    import Axios from '../config/index';
    import ShowButton from './ShowButton';


    function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [ sessionExists, setSessionExists ] = useState(false);

    
        const [show, setShow] = useState(false);

        const handleToggle = () => {
            setShow(!show);
        };

        const handleChange = (event) => {
            setPassword(event.target.value);
        };

    const [signupStatus, setSignupStatus] = useState("");

    Axios.defaults.withCredentials = true;

    const signup = (e) => {
        e.preventDefault();
        Axios.post("signup", {
        name: name,
        phonenumber: phonenumber,
        email: email,
        password: password,
        })
        .then((response) => {
            if (response.data.message) {
            setSignupStatus(response.data.message);
            } else {
            setSignupStatus(response.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    
    
    useEffect(() => {
        Axios
    .get('session')
    .then((res) => {
        if (res.data.valid) {
            setSessionExists(true);
        } else {
            setSessionExists(false);
        }
    })
    .catch((err) => console.log(err));
    },[]);



    return (
        <>

{sessionExists ?(
        navigate('/')

    ):(
        <section className='login'>
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <div className='login-content'>
                    <h1>Sign up and start your test now</h1>

                    {signupStatus ? (
                    <h3 className='err-msg'> {signupStatus} </h3>
                    ) : null}

                    <form>
                    <div className='inputs'>
                        <div className='input'>
                        <label>Name</label>
                        <input
                            type='text'
                            name='name'
                            required
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        </div>

                        <div className='input'>
                        <label>Phonenumber</label>
                        <input
                            type='tel'
                            name='phonenumber'
                            required
                            onChange={(e) => {
                            setPhonenumber(e.target.value);
                            }}
                        />
                        </div>
                    </div>

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



                        <button onClick={signup} type='submit'>
                        Sign up
                        </button>

                    <Link to='/login-user'>Already have an account?</Link>
                    </form>
                </div>
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <div className='login-content'>
                    <img src={SignupImg} alt='signup' />
                </div>
                </div>
            </div>
            </div>
        </section>

    )}
        
        </>
    );
    }

    export default Signup;
