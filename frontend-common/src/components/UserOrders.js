import MenuItem from './MenuItem';

const UserOrders = (props) => {

    return (
        <div>
            <h1>{props.userCart.id_user}</h1>
            {props.userCart.items_in_cart.map((x, index) =>
                <div key={index}>
                    <MenuItem item={x}></MenuItem>
                </div>
            )}
        </div>
    );
};

export default UserOrders;