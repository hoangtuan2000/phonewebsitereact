import { Col } from "react-bootstrap"

let windowHeight  = window.innerHeight*60/100 //get 60% screen size

function NoProductsFound(props) {
    return (
        <>
            <Col className="bg-light rounded text-center">
                <div style={{height: windowHeight}}>
                    <h1>
                        {props.content}
                    </h1>
                </div>
            </Col>
        </>
    )
}

export default NoProductsFound