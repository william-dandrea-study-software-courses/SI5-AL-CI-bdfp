import {observer} from "mobx-react-lite";
import {Card, CardContent, Typography} from "@mui/material";
import {useCallback} from "react";
import {TableService} from "../../services";
import {useParams} from "react-router";
import {useSnackbar} from "notistack";


const MenuCard = observer(({menuItem}) => {
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    
    const handleAddItem = useCallback(() => {
            TableService.addMenuItemToTableOrder(
                {
                    menuItemId: menuItem._id,
                    menuItemShortName: menuItem.shortName,
                    howMany:1
                }, id)
                .then(() => enqueueSnackbar(menuItem.shortName + " a été ajouté à la commande", {variant:"success"}))
        }, [enqueueSnackbar, id, menuItem]
    );

    return(
        <Card onClick={() =>
            handleAddItem()} variant={"outlined"}>
            <CardContent>
                <Typography textAlign={"center"}>{menuItem.shortName}</Typography>
            </CardContent>
        </Card>
    )
    }
)

export default MenuCard;