import { MenuService } from '../services';
import { useEffect, useState } from 'react';


const MenuItem = (props) => {
    const [menuItem, setMenuItem] = useState();

    useEffect(() => {
        console.log(props.item);
        MenuService.getMenuById(props.item).then((response) => {
            setMenuItem(response.data);
        });
    }, [props.item]);

    return (
        <div>
            <h2>{menuItem?.fullName}</h2>
        </div>
    );
};

export default MenuItem;