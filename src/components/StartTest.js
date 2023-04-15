import { useState, useEffect } from 'react';
import axios from '../config/index';

function StartTest() {
const [questions, setQuestions] = useState([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [audioStatus, setAudioStatus] = useState(false);
const [audioPlayStatus, setAudioPlayStatus] = useState(false);
const [showResult, setShowResult] = useState(false);
const [showAudio, setShowAudio] = useState(false);
const [showQuestion, setShowQuestion] = useState(false);
const [saveResultStatus, setSaveResultStatus] = useState('');

const [testScore, setTestScore] = useState(0);



useEffect(() => {
    axios.get('/questions')
    .then((response) => {
        setQuestions(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
}, []);


function handleAnswerClick(answerPriority) {
    // Handle answer click event
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setAudioStatus(false);
    setShowResult(currentQuestionIndex + 1 >= questions.length);

    setTestScore(testScore + answerPriority);

}

function handleNextQuestion() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowResult(currentQuestionIndex + 1 >= questions.length);
}




const addResult = () => {

    axios.post("add-result", {
    score: testScore,
    })
    .then((response) => {
        console.log(response.data);
        if (response.data.result === "Added successfully") {
            return setSaveResultStatus(response.data.result);

        } else {
            if(response.data.result === undefined){
                return setSaveResultStatus("Please Login to save your results");
            }else{
                return  setSaveResultStatus(response.data.result);

            }
        }
    })
    .catch((err) => {

        console.log(err);
    });
};

useEffect(() => {
    if (showResult) {
        addResult();
    }
}, [showResult]);

function readyUser(){
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
        const audio = new Audio(`/uploads/${questions[currentQuestionIndex].audio}`);
        audio.onended = () => {
            setAudioPlayStatus(false);
            setShowQuestion(true);
            setShowAudio(false);
        };

        setAudioStatus(true);
        setAudioPlayStatus(true);
        setShowQuestion(false);
        setShowAudio(true);

        audio.play();
        }
}



if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // Handle end of test
    return (
    <section className="start-test">
        <div className="container-fluid">
        <div className="row">
            <div className="test-content">
            <div className="test">
                <h1> Test completed! </h1>

                <h2> Your Score is : {testScore} / 60 </h2>

                <h2> {saveResultStatus} </h2>

            </div>
            </div>
        </div>
        </div>
    </section>
    );
} else {
    // Generate test elements based on current question data
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
        <section className="start-test">
            <img className='test-back' src={`/uploads/${currentQuestion.img}`} alt={currentQuestion.img}/>
            <div className="container-fluid">
            <div className="row">
                <div className="test-content">

                <div className="test">
                    {!audioStatus && (
                    <>
                        <h1>{currentQuestion.header}</h1>
                        <p>{currentQuestion.para}</p>
                        <button onClick={()=> readyUser()}>I am ready</button>
                    </>
                    )}
                    {audioStatus && (
                    <div className="question">

                        {showAudio && (
                        <button className='stop-button'>
                        <i className="las la-volume-up"></i>
                        </button>
                        )}

                        {showQuestion && (
                        <div className='question-info'>
                        <div className='info'>
                            <h3>{currentQuestion.title}</h3>
                            <h1>{currentQuestion.question}</h1>
                        </div>
                        <div className='answers'>
                            <button value={currentQuestion.answer1_priority} onClick={() => handleAnswerClick(currentQuestion.answer1_priority)}>{currentQuestion.answer1}</button>
                            <button value={currentQuestion.answer2_priority} onClick={() => handleAnswerClick(currentQuestion.answer2_priority)}>{currentQuestion.answer2}</button>
                            <button value={currentQuestion.answer3_priority} onClick={() => handleAnswerClick(currentQuestion.answer3_priority)}>{currentQuestion.answer3}</button>
                            <button value={currentQuestion.answer4_priority} onClick={() => handleAnswerClick(currentQuestion.answer4_priority)}>{currentQuestion.answer4}</button>
                        </div>
                        </div>
                        )}
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
    );

                    }
    
                }
    
export default StartTest;
