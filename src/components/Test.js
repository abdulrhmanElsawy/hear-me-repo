import './css/test.css';
import {Link} from 'react-router-dom';


function Test(){
    return (
        <>

            <section className="test-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="test-page-content">
                            <h1> Take A Free Online Hearing Test </h1>

                            <h2> Get hearing resuls in minutes </h2>

                            <h3>Your first step to better hearing is only a click away. In less than five minutes you'll have a better understanding of your hearing health</h3>


                            <Link to="/online-test-check"> 
                                Start the online hearing test
                            </Link>

                        <p> Only a hearing test performed by a qualified hearing care professional can provide you with a precise profile of your hearing ability. This test is not intended to replace a professional hearing test from a qualified hearing care professional.</p>

                        </div>
                    </div>
                </div>
            </section>
        
        </>
    )
}

export default Test;