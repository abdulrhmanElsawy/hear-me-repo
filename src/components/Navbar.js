import Logo from './images/logo.png';
import { useEffect,useRef  } from "react";
import './css/navbar.css';
import $ from 'jquery';
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';






function Navbar(props){


    const handleServicesClick = () => {
        props.servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    };

        useEffect(() => {
            $("#open-nav").on("click", function() {
                $(".nav-elements").slideDown(400);
                $(".nav-elements").css({display: "flex"});
            });
    
            $("#close-nav").on("click", function() {
                $(".nav-elements").slideUp(400);
            });
    
            if ($(window).width() < 950) {
                $(".nav-elements ul li").on("click", function() {
                    $(".nav-elements").slideUp(400);
                });
            }
        const loadingElement = document.getElementById("loading");
        if (loadingElement) {
            loadingElement.remove();
        }
        }, []);
        

    return(

        <>

        <nav>
            <div className="container-fluid">
                <div className="row">
                    <div className='nav-content'>
                        <div className="logo">
                            <RouterLink to="/"><img src={Logo} alt="logo"/></RouterLink>
                        </div>

                        <button id="open-nav"> <i className="las la-bars"></i> </button>
                        <div className="nav-elements">
                        <button id="close-nav"> <i className="las la-times"></i> </button>

                            <ul>
                                <li>
                                    <RouterLink  >Home</RouterLink>
                                </li>

                                <li>
                                <ScrollLink
                                    activeClass="active"
                                    to="services"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Services
                                </ScrollLink>
                                </li>
                                <li>
                                <ScrollLink
                                    activeClass="active"
                                    to="about"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    About Us
                                </ScrollLink>
                                </li>

                                
                                <li>

                                    <ScrollLink
                                    activeClass="active"
                                    to="steps"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Start ?
                                </ScrollLink>
                                </li>


                                <li>
                                <ScrollLink
                                    activeClass="active"
                                    to="contact"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Contact Us
                                </ScrollLink>
                                </li>

                            </ul>

                            <RouterLink to="/test">Test now</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div id="loading" className="loading">
            <div className="loading-content">
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
            </div>
        </div>

        </>

    );

}

export default Navbar;