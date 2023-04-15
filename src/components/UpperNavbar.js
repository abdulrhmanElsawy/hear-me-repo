import React, { useState,useEffect} from "react";
import './css/navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../config/index';
function UpperNavbar(props){









    const optionsStyle = {
        opacity: 1
    };


    const navigate = useNavigate();
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [user, setUser] = useState('');


    
    axios.defaults.withCredentials = true;

    const logout = () => {
        axios
        .get('logout')
        .then((res) => {
            if (res.data.logout) {
                props.setSessionExists(false);
            navigate('/login-user');
            } else {
            navigate('/login-user');
            }
        })
        .catch((err) => console.log(err));
    };


    const handleUserOptionsClick = () => {
        setShowUserOptions(!showUserOptions);
    };

    const getUser = (userId) => {
        console.log(userId);
        axios
        .post('user', { userId })
        .then((res) => {
            if (res.data.message) {
                console.log(res.data.message);

            } else {
                setUser(res.data);
            }
        })
        .catch((err) => console.log(err));

    };


    useEffect(() => {
        axios
        .get('session')
        .then((res) => {
            if (res.data.valid) {
                props.setSessionExists(true);
                return getUser(res.data.userId);
            } else {
                props.setSessionExists(false);
                getUser(0);
            }
        })
        .catch((err) => console.log(err));
    }, []);
    


    return(
        <>
            <div className="upper-nav">
                <div className="container-fluid">
                    <div className="row">
                        <div className="upper-content">

                        {props.sessionExists ? (
                                <div className="user-info">
                                <button onClick={handleUserOptionsClick}>
                                    <img src={`/uploads/${user.img}`} alt="" />
                                    <i className="las la-angle-down"></i>
                                </button>

                                {showUserOptions && (
                                    <div style={optionsStyle}  className="user-options">
                                        <ul>
                                            <li>
                                                <Link to="/profile">Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/settings">Settings</Link>
                                            </li>
                                            <li>
                                                <Link onClick={logout}>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            ) : (
                                <div className="user-info">
                                    <Link to="/login-user"> 
                                        <i className="las la-sign-in-alt"></i> Login 
                                    </Link>

                                    <Link to="/signup"><i className="las la-user-plus"></i> Signup </Link>
                                </div>
                            )}
                            
                            <div className="langs">
                                <button> <i className="las la-globe"></i> </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )


}


export default UpperNavbar;

