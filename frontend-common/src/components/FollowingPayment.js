import {useParams} from "react-router-dom";


const FollowingPayment = () => {

    const { tableNumber } = useParams();

    return (
        <div>
            Following payment
        </div>
    )
}


export default FollowingPayment;
