import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (

        <OverlayTrigger
            placement='left'
            overlay={
                <Tooltip>
                    Lên Đầu Trang
                </Tooltip>
            }
        >
            <Button
                className='rounded-pill'
                style={{
                    display: visible ? 'inline' : 'none',
                    position: 'fixed',
                    right: '40px',
                    bottom: '40px',
                    zIndex: '1',
                    cursor: 'pointer',
                    color: 'white',
                    opacity: '0.9',
                }}
                onClick={scrollToTop}
            >
                <FontAwesomeIcon icon={faArrowUp} style={{fontSize: '30px', fontWeight: 'bold'}} />
            </Button>
        </OverlayTrigger>
    );
}

export default ScrollButton;
