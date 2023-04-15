import './css/about.css';

import aboutImg from './images/about.jpg';

function About(){
    return(
        <>
            <section id="about" className="about">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="about-content">
                                <img src={aboutImg}  alt="about-us"/>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="about-content">
                                <h1> About Hear Me </h1>

                                <p> Hear Me is an online resource for hearing health. We're committed to providing high-quality hearing care and support to individuals who are experiencing hearing issues. Our goal is to help you understand your hearing abilities, identify any areas of concern, and provide you with personalized recommendations for improving your hearing health.</p>

                                <ul>
                                    <li>
                                        <i className="las la-check-circle"></i>
                                        Our online hearing test is a quick and easy way to assess your hearing abilities. You can take it from the comfort of your own home, at a time that suits you
                                    </li>

                                    <li>
                                        <i className="las la-check-circle"></i>
                                        Our team of hearing specialists are highly trained and experienced in all aspects of hearing care                                    </li>

                                    <li>
                                        <i className="las la-check-circle"></i>
                                        At Hear Me, we're committed to providing you with the highest level of care and support
                                    </li>

                                    <li>
                                        <i className="las la-check-circle"></i>
                                        If you have any questions or concerns about your hearing abilities, or if you're interested in learning more about our online hearing test, please don't hesitate to contact us
                                    </li>
                                </ul>

                                <a href="#contact">
                                    Contact Us 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;