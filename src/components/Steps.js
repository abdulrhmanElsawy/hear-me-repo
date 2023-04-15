import './css/steps.css';
import React, { useState } from 'react';
import $ from 'jquery';


import stepOne from './images/step_1.jpg';
import stepTwo from './images/step_2.jpg';
import stepThree from './images/step_3.jpg';
import stepFour from './images/step_4.jpg';
import Step from './subcombonents/Step';



function Steps(){
    
    const [currentImg, setCurrentImg] = useState(null);

    const handleStepHover = (e) => {
        const imgSrc = e.currentTarget.getAttribute('data-img');
        $('.steps-images img').fadeOut(500, function() {
            $(this).attr('src', imgSrc).fadeIn(500);
        });
        setCurrentImg(imgSrc);
        };
        



    return(
        <>

            <section id="steps" className='steps'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='header'>
                            <h2> First Step  </h2>
                            <h1> Take the first step towards better hearing health </h1>
                        </div>

                        <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                            <div className='steps-content'>
                                <div className='images steps-images'>
                                    <img src={currentImg || stepOne} alt='step' />
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                            <div className='steps-content'>

                                <Step function={handleStepHover} img={stepOne} number="01" title="Take the Online Hearing Test" description="Our online hearing test is a quick and easy way to assess your hearing abilities. You can take it from the comfort of your own home, at a time that suits you"/>

                                <Step function={handleStepHover} img={stepTwo} number="02" title="Review Your Results" description="Once you've completed the test, you'll receive a detailed report that outlines your hearing abilities across a range of frequencies"/>

                                <Step function={handleStepHover} img={stepThree} number="03" title="Get Personalized Recommendations" description="Based on your test results, we'll provide you with personalized recommendations for improving your hearing abilities"/>

                                <Step function={handleStepHover} img={stepFour} number="04" title="Connect with a Hearing Specialist" description="If you have any questions or concerns about your hearing abilities, our team of hearing specialists are here to help"/>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Steps;