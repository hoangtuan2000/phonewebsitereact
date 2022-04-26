import ReactDOM from 'react-dom';

function ProductIntroduction(props) {
    return (
        <>
            <p
                dangerouslySetInnerHTML={{ __html: props.data }} // chuyen string sang the HTML (dangerouslySetInnerHTML cua react dom)
            />
        </>
    )
}


export default ProductIntroduction