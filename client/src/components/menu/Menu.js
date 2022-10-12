import { Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { MenuService } from "../../services";
import MenuItem from "./MenuItem";
import { useNavigate, useParams } from "react-router-dom";
import { OrderService } from "../../services/OrderService";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Menu = observer(() => {
  let { tableOrderId } = useParams();
  const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    MenuService.getAllItems().then((resp) => {
      const allMenus = resp.data;
      setAllItems(allMenus);
      const newCart = [];

      allMenus.forEach((mn) => {
        newCart.push({ menuItemId: mn._id, howMany: 0 });
      });
      setCart(newCart);
    });
  }, [setAllItems, setCart]);

  const addToCart = useCallback(
    (itemId) => {
      const index = cart.findIndex((elem) => elem.menuItemId === itemId);
      if (index >= 0) {
        cart[index].howMany = cart[index].howMany + 1;
      }
      setCart(cart);
    },
    [setCart, cart]
  );

  const removeFromCart = useCallback(
    (itemId) => {
      const index = cart.findIndex((elem) => elem.menuItemId === itemId);
      if (index >= 0) {
        cart[index].howMany = Math.max(cart[index].howMany - 1, 0);
      }
      setCart(cart);
    },
    [setCart, cart]
  );

  const numberOfItemsP = (itemId) => {
    const index = cart.findIndex((elem) => elem.menuItemId === itemId);
    if (index >= 0) {
      return cart[index].howMany;
    }
    return 0;
  };

  const validateOrder = useCallback(() => {
    OrderService.createOrder(tableOrderId, cart).then((result) => {
      navigate("/");
    });
  }, [cart]);

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <div style={{ position: "absolute" }} onClick={() => handleGoBack()}>
        <ArrowBackIosIcon />
      </div>
      <Typography textAlign={"center"} marginBottom={2}>
        Menu
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {allItems.map((x) => (
          <Grid item xs={6} key={x._id}>
            <MenuItem
              menuItem={x}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              numberOfItemsP={numberOfItemsP}
            />
          </Grid>
        ))}
      </Grid>

      <Button size="small" color={"success"} onClick={validateOrder}>
        Place Order
      </Button>
    </div>
  );
});

export default Menu;
