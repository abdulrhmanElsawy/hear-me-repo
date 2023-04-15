import './css/footer.css';
import Logo from './images/logo.png';
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';






function Footer(){

    return(
        <>
                <button id="back-to-top"><i className="las la-arrow-up"></i></button>

            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-content">
                                <img src={Logo} alt="logo"/>

                                <h1> HearMe </h1>

                                <p>Hear Me is an online resource for hearing health. We're committed to providing high-quality hearing care and support to individuals who are experiencing hearing issues. Our goal is to help you understand your hearing abilities, identify any areas of concern, and provide you with personalized recommendations for improving your hearing health.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-content">
                                <h1> Contact </h1>

                                <p>
                                    Cairo - Egpypt
                                </p>

                                <h2>Hear Me CONTACT</h2>
                                <a href="mailto:info@hearme.com">
                                    info@hearme.com
                                </a>
                                <a href="tel: +2001100707558">
                                    +2001100707558
                                </a>
                                
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-content">

                                <h1> Useful Links
                                </h1>

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
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-content">

                                <h1> Get in Touch </h1>

                                <div className="social">
                                    <a href="/">
                                        <i className="lab la-instagram"></i>
                                    </a>
                                    <a href="/">
                                        <i className="lab la-whatsapp"></i>
                                    </a>
                                    <a href="/">
                                        <i className="lab la-linkedin"></i>
                                    </a>
                                    <a href="/">
                                        <i className="lab la-facebook-f"></i>
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row">
                        <div className="copy-right">
                            <h3>Copy Right &copy; 2023 HearMe </h3>
                            <h4>Made by</h4>
                            <a href="/">Helwan Team</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;