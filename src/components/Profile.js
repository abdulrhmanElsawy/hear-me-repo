import {Link, useNavigate} from 'react-router-dom';
import axios from '../config/index';

import React, { useEffect, useState } from "react";
import './css/profile.css';
import 'hamburgers/dist/hamburgers.min.css';



function Profile(){

    const [image, setImage] = useState(null);
    const [resultHistory, setResultHistory] = useState([]);
    const navigate = useNavigate();
    const [ sessionExists, setSessionExists ] = useState(false);
    const [user, setUser] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    axios.defaults.withCredentials = true;



    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(URL.createObjectURL(selectedImage));

        console.log(selectedImage);
        uploadImage(selectedImage);


    };
    

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);


    }

    const handleHamburgerClick = () => {
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('is-active');
        const sideNav = document.querySelector('.side-info');
        sideNav.classList.toggle('active');

    }

    const cameraButton = () => {
        toggleFormVisibility();
    }



    const getUser = (userId) => {
        axios
        .post('user', { userId })
        .then((res) => {
            if (res.data.message) {

                setUser(res.data)

            } else {

                setUser(res.data);

            }
        })
        .catch((err) => console.log(err));


    };

    const uploadImage = (file) => {
        const formData = new FormData();
        formData.append("image", file);
    
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        
        axios.post("upload-image", formData, config)
            .then((response) => {
                console.log("Image uploaded successfully!");
                toggleFormVisibility();
                return response.data;
                
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
                return null;
            });


    };
    


    
    const logout = () => {
        axios
        .get('logout')
        .then((res) => {
            if (res.data.logout) {
            setSessionExists(false);
            navigate('/login-user');
            } else {
            navigate('/login-user');

            }
        })
        .catch((err) => console.log(err));


    };




    const getResultHistory = () => {
        axios
        .get("result-history")
        .then((response) => {
            setResultHistory(response.data.data);
            console.log(response.data.data);

        })
        .catch((error) => {
            console.error("Error getting result history: ", error);
            
        });


    };
    
    const deleteResult = (id) => {
        axios
        .delete(`result-history/${id}`)
        .then((response) => {
            if (response.data.message === 'Result history deleted successfully') {
                setResultHistory(resultHistory.filter((result) => result.id !== id))
            } else {
                console.error("Failed to delete result:", response.data.message);
            }

        })
        .catch((error) => {
            console.error("Error deleting result:", error);
        });


    };
    



    useEffect(() => {
        axios
        .get('session')
        .then((res) => {
            if (res.data.valid) {

                setSessionExists(true);
                getResultHistory();
                getUser(res.data.userId);

            } else {

                console.log(res.data.userId)

                setSessionExists(false);
            }
        })
        .catch((err) => console.log(err));


},[]);


    return(
        <>

            
    {sessionExists ?(
        <section className="profile">
                <div className="profile-content">
                    <div className="side-info active">
                        <div className='open-close'>
                        <button
                        className="hamburger hamburger--emphatic"
                        type="button"
                        onClick={handleHamburgerClick}
                        >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                        </button>
                        </div>
                        <div className="user-img">

                        <img src={`/uploads/${user.img}`} alt={user.img}/>
                            <button onClick={cameraButton}> <i className="las la-camera-retro"></i>  </button>
                        </div>

                        <div className='user-info'>
                            <h1> {user.name} </h1>
                            <h2> {user.email} </h2>
                            <h3> {user.phonenumber} </h3>
                            <h4> Date created : {user?.date?.split("T")[0]} </h4>

                        </div>

                        <ul>
                        <li>
                            <Link to="/test"><i className="las la-laptop"></i> Test</Link>
                        </li>
                        <li>
                            <Link to="/settings"><i className="las la-cog"></i> Settings</Link>
                        </li>
                        <li>
                            <Link onClick={logout}><i className="las la-sign-out-alt"></i> Logout</Link>
                        </li>
                        </ul>
                    </div>

                    <div className='history-content'>
                        <h1> Recent Tests  </h1>
                        {resultHistory.map((result, index) => {
                        return (

                            <>
                            <div key={index} className='history-item'>
                            <span className='date'>{result?.date?.split("T")[0]}</span>

                            <span className='name'>{result.name} </span>

                            <span className='result'>{result.score}</span>

                            <button className='delete'> <i className="las la-trash" onClick={() => deleteResult(result.id)}></i> </button>
                        </div>
                            </>


                        );
                        })}
                        
                    </div>
                </div>

                {isFormVisible && (
            <div className="popup-form">
                <div className='overlay'></div>
                <h2>Upload Profile Image</h2>
                <form>
                    <input type="file"  name="image" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="profile_image" />}
                </form>
            </div>
        )}
    </section>
    

    ):(
        navigate('/')


    )}
            
        </>
    )
}

export default Profile;