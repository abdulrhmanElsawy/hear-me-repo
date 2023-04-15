import './css/landing.css';
import LandingImg from './images/landing.png';
import LandingVideo from './videos/staypostive.mp4';
import Learn from './Learn';
import {Link} from 'react-router-dom';




function Landing(){
    return(
        <>
            <section id="home" className='landing'>
                <div className='container-fluid'>
                    <div className='row'>

                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <div className='landing-content'>
                                <h2>
                                    Welcome to Hear Me
                                </h2>

                                <h1>
                                    Your online resource for hearing health
                                </h1>

                                <p>
                                We're here to help you identify any hearing issues you may be experiencing and provide you with the resources and support you need to hear better.
                                </p>

                                <Link to="/test">Start Your Test Now !</Link>

                                <video autoPlay muted loop src={LandingVideo}></video>

                                <Learn />


                                <button className='go-services'> <i className="las la-angle-double-down"></i> </button>
                            </div>
                        </div>


                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <div className='landing-content'>
                                <img src={LandingImg} alt="landing"/>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing;