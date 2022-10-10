import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { MenuService } from "../../services";
import Item from "./Item";

const Menu = observer(() => {
  const [allItems, setAllItems] = useState([]);
  const [isAllItemLoading, setIsAllItemLoading] = useState(false);

  useEffect(() => {
    setIsAllItemLoading(true);
    MenuService.getAllItems()
      .then((resp) => setAllItems(resp.data))
      .finally(() => setIsAllItemLoading(false));
  }, [setAllItems, setIsAllItemLoading]);

  console.log(allItems);

  return (
    <div>
      <Typography textAlign={"center"} marginBottom={2}>
        Menu
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {allItems.map((x) => (
          <Grid item xs={6} key={x._id}>
            <Item itemInfo={x} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

export default Menu;
