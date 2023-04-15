import '../css/steps.css';

function Step(props){
    return(
        <>

        <div onMouseEnter={props.function} data-img={props.img} className='step'>
                <div className='head'>
                    <span>
                        {props.number}
                    </span>

                    <h1>
                    {props.title}
                    </h1>
                </div>

                <div className='body'>
                    <p>
                    {props.description}
                    </p>

                    <span>
                        <i className="las la-plus"></i>
                    </span>
                </div>
            </div>

        </>
    )
}

export default Step;