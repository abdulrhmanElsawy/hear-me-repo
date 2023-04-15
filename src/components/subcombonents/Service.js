import '../css/services.css';


function Service(props){
    return(
        <>
            <div className='service'>
                <img src={props.image} alt={props.title} />

                <h1>
                    {props.title}
                </h1>

                <p>
                    {props.description}
                </p>

            </div>
        </>
    )
}

export default Service;