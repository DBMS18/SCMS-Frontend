import React, { Component } from 'react';
import { Text,Button, Box, Image, Center, HStack, Square} from "@chakra-ui/react"

class Order extends Component{

    constructor(props){
        super(props);
    }

    confirmOrder(){
        var order_id=this.props.order.order_id;
    }
    

    render(){
        return(
            <Box height="100%" width="100%" m={1} borderWidth={1} borderColor="green.500" p={5} borderRadius="lg" marginBottom="10">
                <HStack>
                    <Square width="25%" m={1}  p={5} borderRadius="lg">
                        <Image src='assets/images/supply chain logo.png' alt="Product Image"/>
                    </Square>
                    <Box height="100%" width="50%" m={1}  p={20} borderRadius="lg">
                        <h2 style={{fontWeight: 'bold', fontSize: 30}}>{this.props.order.order_id}</h2>
                        <Text align="left">
                            <b>Date :</b>{this.props.order.date}
                        </Text>
                        <Text align="left">
                            <b>Total Amount :</b>{this.props.order.total_amount}
                        </Text>
                        <Text align="left"><b>Your products in order:</b>
                        {this.props.order.product.map((products) => <li>{products}</li>)}
                        </Text>
                    </Box>
                    
                            {
                                this.props.order.status !=='delivered'?
                                    <div></div> 
                                    : 
                                        <>
                            <Box height="100%" width="25%" m={1}  p={5} borderRadius="lg">
                        <Center mb="5">
                            <Button colorScheme="green" onClick={this.props.confirmOrder.bind(this,this.props.order.order_id)}>Confirm Receive</Button>
                            
                        </Center>
                        <Center mb="5">
                        </Center>
                    </Box>
                    </>
                            }

{
                                this.props.order.status ==='delivered'?
                                    <div></div> 
                                    : 
                                        <>
                            <Box height="100%" width="25%" m={1}  p={5} borderRadius="lg">
                        <Center mb="5">
                            <Box borderWidth={2} borderColor="green.500" p={4} borderRadius="full"><b>Order Status :</b>
                            {this.props.order.status}</Box>
                            
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

export default Order;