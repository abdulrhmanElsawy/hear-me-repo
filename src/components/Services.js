import './css/services.css';
import Service from './subcombonents/Service';

import one from './images/1.jpg'
import two from './images/2.jpg'
import three from './images/3.jpg'
import four from './images/4.jpg'



function Services(props){
    return(
        <>

            <section id="services" ref={props.servicesRef} className='services'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <div className='section-header'>
                                <h1> Our Services </h1>
                                <p>At Hear Me, we offer a range of services to help you better understand your hearing abilities and improve your hearing health. Our services include:</p>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                            <Service  title="Online Hearing Test" image={one} description="Our online hearing test is a quick and easy way to assess your hearing abilities. You can take it from the comfort of your own home, at a time that suits you. Our test is designed to assess your hearing across a range of frequencies, and to provide you with a personalized report that details any issues you may be experiencing."/>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                            <Service title="Hearing Health Education" image={two} description="We believe that education is key to improving your hearing health. That's why we offer a range of educational resources, including articles, videos, and guides, to help you better understand your hearing abilities and how to protect them."/>
                        </div>

                        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                            <Service  title="Personalized Recommendations" image={three} description="Based on your test results, we'll provide you with personalized recommendations for improving your hearing abilities. This may include tips for protecting your ears, exercises to help improve your hearing, and information about hearing aids and other devices that may be helpful."/>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                            <Service title="Connection with a Hearing Specialist" image={four} description="If you have any questions or concerns about your hearing abilities, our team of hearing specialists are here to help. We can provide you with expert advice and guidance, and help you find the right hearing solution for your needs."/>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Services;