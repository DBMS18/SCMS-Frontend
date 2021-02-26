import React, { Component } from 'react';
import { Box,Center, Heading} from "@chakra-ui/react"

import Order from '../components/Order.jsx'


const Orders = [
    {
        Order_ID: 1,
        Name: "MAGGI 2 Minute Noodles Spicy Chicken",
        Date: '2021-01-11',
        Quantity: 20
    },
    {
        Order_ID: 2,
        Name: "MAGGI 2 Minute Noodles Spicy Chicken",
        Date: '2021-01-11',
        Quantity: 25
    }
]

class CustomerConfirm extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders: Orders
        }
    }
    
    

    render(){
            <Heading>My Orders</Heading>
        
        const orderList = this.state.orders.map((order, i) => {
            
            return (
                <Order key={i} order={order} />
                
            );
        });
        return(
            <div>
                <Center>
                    <Box width="75%" m={5} >
                        {orderList}
                    </Box> 
                </Center> 
            </div>
        );
    }
}



export default CustomerConfirm;