import { useParams } from "react-router-dom"

function OrderDetails() {
    const params = useParams()
    return (
        <h1>order details {params.idOrder}</h1>
    )
}

export default OrderDetails