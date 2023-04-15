import './css/test.css';
import sound from './Audios/testing.mp3';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


const audio = new Audio(sound);

function Check() {
const [value, setValue] = useState(1);
const [audioStatus, setAudioStatus] = useState(false);

useEffect(() => {
    if (value % 2 === 0) {
    play();
    } else {
    pause();
    }
}, [value]);

function play() {
    audio.play();
    setAudioStatus(true);
}

function pause() {
    audio.pause();
    setAudioStatus(false);
}

return (
    <>
    <section className='check-speaker'>
        <div className='container-fluid'>
        <div className='row'>
            <div className='check-speaker-content'>
                {audioStatus ? (
                <>
                    {' '}
                    <button className='stop-button' onClick={() => setValue(value + 1)}>
                        <i class="las la-volume-up"></i>
                    </button> {' '}
                </>
                ) : (
                <>
                    {' '}
                    <button className='start-button' onClick={() => setValue(value + 1)}> <i class="las la-play"></i> </button>{' '}
                </>
                )}

                <h1> And Finally, set up your system. </h1>
                <p> Please adjust the volume so you can clearly hear the conversation. <strong> We recommend using headphones. </strong> </p>

                {audioStatus ? (
                <>
                    {' '}
                            <Link to="/start-test" onClick={()=>{
                                audio.pause()
                            }}> 
                                Start the online hearing test
                            </Link> {' '}
                </>
                ) : (
                null
                )}
            </div>
        </div>
        </div>
    </section>
    </>
);
}

export default Check;
