import FollowingPreparation from "../components/FollowingPreparation";
import FollowingPayment from "../components/FollowingPayment";
import PlayGame from "../components/PlayGame";


const DuringPreparationPage = () => {
    return (
        <div>
            <FollowingPreparation></FollowingPreparation>
            <div style={{height: "20px"}}></div>
            <FollowingPayment></FollowingPayment>
            <div style={{height: "20px"}}></div>
            <PlayGame></PlayGame>
        </div>
    )
}

export default DuringPreparationPage
