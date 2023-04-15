import './css/contact.css';
import Review from './subcombonents/Review';
import defaultImage from './users/default.jpg';
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';
import { useState } from 'react';
import axios from '../config/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';



function Contact(){


    const [recipientEmail, setRecipientEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/send-email', { recipientEmail, subject, body })
        .then((res) => {
            setMessage(res.data.message);
            setRecipientEmail('');
            setSubject('');
            setBody('');
        })
        .catch((err) => {
            setMessage(err.response.data.message);
        });
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return(
        <>
            <section id="contact" className='contact'>
                <div className='container-fluid'>
                    <div className="row">
                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <div className='reviews'>
                                <div className='review-header'>
                                    <h2>
                                        Testimonials
                                    </h2>

                                    <h1>
                                        Our client love us!
                                    </h1>

                                </div>

                                <div className='review-slider'>
                                    <Slider {...settings}>
                                        <div className='slide'>
                                            <Review username="Sarah Johnson" image={defaultImage} location="United States" description="I recently took Hear Me's online hearing test and was impressed with how easy it was to use. The personalized report was also very helpful in understanding my hearing abilities. I highly recommend their services."/>
                                        </div>
                                        <div className='slide'>
                                            <Review username="Sarah Johnson" image={defaultImage} location="United States" description="I recently took Hear Me's online hearing test and was impressed with how easy it was to use. The personalized report was also very helpful in understanding my hearing abilities. I highly recommend their services."/>
                                        </div>
                                        <div className='slide'>
                                            <Review username="Sarah Johnson" image={defaultImage} location="United States" description="I recently took Hear Me's online hearing test and was impressed with how easy it was to use. The personalized report was also very helpful in understanding my hearing abilities. I highly recommend their services."/>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <div className='contact-content'>
                                {message ? (  <div className='alert alert-success'> {message} </div>):null}
                                
                                <h1> Request a call back  </h1>

                                <p>
                                    we are commited to providing excellent service and creating a stress-free experience.
                                </p>

                                <form onSubmit={handleSubmit}>
                                <div className='input'>
                                    <label>Recipient Email</label>
                                    <input type='email' required name='recipientEmail' value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                                </div>

                                <div className='input'>
                                    <label>Subject</label>
                                    <input type='text' required name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                                </div>

                                <div className='input'>
                                    <label>Body</label>
                                    <textarea name='body' required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                                </div>

                                <button type='submit'>Send Email</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact;