
import {List, ListItem, ListItemText, Typography} from "@mui/material";

const UserOrders = (props) => {

    return (
        <div>
            <Typography variant="h4">Person {props.userCart.id_user}</Typography>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {props.userCart.items_in_cart.map((value, index) => (
                    <ListItem key={index} disableGutters secondaryAction={<Typography>{value.price} EUR</Typography>}>
                        <ListItemText primary={value.shortName} />
                    </ListItem>
                ))}
            </List>

        </div>
    );
};

export default UserOrders;
