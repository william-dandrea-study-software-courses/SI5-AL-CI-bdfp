import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";

const Item = observer(({ itemInfo }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography textAlign={"center"}>{itemInfo.shortName}</Typography>
        <Typography textAlign={"left"}>{itemInfo.category}</Typography>
        <Typography textAlign={"right"}>Price : {itemInfo.price}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={itemInfo.image}
        alt={itemInfo.fullName}
      />
      <CardActions>
        <Button size="small" color={"success"}>
          {" "}
          Add{" "}
        </Button>
        <Button size="small" color={"error"}>
          {" "}
          Delete{" "}
        </Button>
      </CardActions>
    </Card>
  );
});

export default Item;
