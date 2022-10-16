import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { MenuService, DiningService } from '../../services';

const Bill = observer(({ tableOrderId }) => {
    const [allOrders, setAllOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [allPrices, setAllPrices] = useState({});

    const getPrice = (menuId) => {
        return MenuService.getMenuById(menuId).then(resp => {
            return resp.data.price;
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        DiningService.getTableOrdersById(tableOrderId)
            .then(async resp => {
                setAllOrders(resp.data.lines);
                let orders = resp.data.lines;
                let prices = {};
                let totalPrice = 0;
                for (let order of orders) {
                    let id = order.item._id;
                    let price = await getPrice(id);
                    prices[id] = price;
                    totalPrice += price * order.howMany;
                }
                setAllPrices(prices);
                setTotalPrice(totalPrice);
            });
    }, [setAllOrders, setAllPrices, setTotalPrice, tableOrderId]);

    return (
        <div>
            {
                allOrders.map((x, index) =>
                    <div style={{ "display": "flex", "justifyContent": "space-between" }} key={index}>
                        <div>{x.howMany} x {x.item.shortName} ({allPrices[x.item._id]} €)</div>
                        <div>{allPrices[x.item._id] * x.howMany} €</div>
                    </div>
                )
            }
            <div>Total : {totalPrice} €</div>
        </div >
    );
});

export default Bill;