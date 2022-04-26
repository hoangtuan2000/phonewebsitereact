import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faHandPointer, faCartPlus, faShieldBlank, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

// custom button next slider of react slick
const ButtonNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
            icon={faAngleRight}
            style={{
                ...style,
                background: 'black',
                opacity: '0.1',
                height: '30px',
                width: '30px',
                color: 'white',
                borderRadius: '6px'
            }}
            className={className}
            onClick={onClick}
        />
    );
}

// custom button prev slider of react slick
const ButtonPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
            icon={faAngleLeft}
            style={{
                ...style,
                background: 'black',
                opacity: '0.1',
                height: '30px',
                width: '30px',
                color: 'white',
                borderRadius: '6px'
            }}
            className={className}
            onClick={onClick}
        />
    );
}

export {
    ButtonNextArrow,
    ButtonPrevArrow
}