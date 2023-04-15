function Review(props){
    return(
        <>
            <div className="review">
                <div className="review-description">
                    <span className="top">"</span>
                        <p> {props.description} </p>
                    <span className="bottom">"</span>
                </div>

                <div className="info-stars">
                    <div className="info">
                        <img src={props.image} alt="user" />
                        <div>
                            <h1> {props.username} </h1>
                            <h2>  {props.location }</h2>
                        </div>
                    </div>

                    <div className="stars">
                        <i className="las la-star"></i>
                        <i className="las la-star"></i>
                        <i className="las la-star"></i>
                        <i className="las la-star"></i>
                        <i className="las la-star"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review;