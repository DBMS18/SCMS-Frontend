import React, { Component } from 'react';
import { Text,Button, Box, Image, Center, HStack, Square} from "@chakra-ui/react"

class StoreOrder extends Component{

    constructor(props){
        super(props);
    }

    

    render(){
        return(
            <Box height="100%" width="100%" m={1} borderWidth={1} borderColor="green.500" p={5} borderRadius="lg" marginBottom="10">
                <HStack>
                <Square width="25%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <Image src="assets/images/supply chain logo.png" alt="Order Delivery"/>
                    </Square>
                    <Box height="100%" width="50%" m={1}  p={20} borderRadius="lg">
                        <h2 style={{fontWeight: 'bold', fontSize: 30}}>Order ID :{this.props.order.order_id}</h2>
                        <Text align="left">
                            <b>Customer :</b>{this.props.order.first_name},{this.props.order.last_name}
                        </Text>
                        <Text align="left">
                            <b>Street :</b>{this.props.order.street_id}
                        </Text>
                        <Text align="left">
                            <b>Zip :</b>{this.props.order.zip}
                        </Text>
                        <Text align="left">
                        <b>Total_Price : </b>{this.props.order.total_amount}
                        </Text>
                    </Box>
                    
                            {
                                this.props.order.order_status ==='delivered'?
                                    <div></div> 
                                    : 
                                        <>
                            <Box height="100%" width="25%" m={1}  p={5} borderRadius="lg">
                        <Center mb="5">
                            <Button colorScheme="green" onClick={this.props.confirmOrder.bind(this,this.props.order.order_id)}>Confirm Delivery</Button>
                            
                        </Center>
                        <Center mb="5">
                        </Center>
                    </Box>
                    </>
                            }

{
                                this.props.order.order_status !=='delivered'?
                                    <div></div> 
                                    : 
                                        <>
                            <Box height="100%" width="25%" m={1}  p={5} borderRadius="lg">
                        <Center mb="5">
                            <Box borderWidth={2} borderColor="green.500" p={4} borderRadius="full"><b>Order Status :</b>
                            {this.props.order.order_status}</Box>
                            
                        </Center>
                        <Center mb="5">
                        </Center>
                    </Box>
                    </>
                            }
                </HStack>
                </Box>
        );
    }
}

export default StoreOrder;