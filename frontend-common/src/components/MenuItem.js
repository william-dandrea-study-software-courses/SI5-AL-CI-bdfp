

const MenuItem = (props) => {


    return (
        <div>
            <h2>{props.item.shortName}</h2>
            <h2>{props.item.price} EUR</h2>
        </div>
    );
};

export default MenuItem;
