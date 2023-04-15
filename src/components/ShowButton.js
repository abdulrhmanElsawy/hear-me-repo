import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ShowButton = ({ show, handleToggle }) => {
    return (
    <div className="show-password-button">
        {show ? (
        <FaEyeSlash onClick={handleToggle} />
        ) : (
        <FaEye onClick={handleToggle} />
        )}
    </div>
    );
};


export default ShowButton;
