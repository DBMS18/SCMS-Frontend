import React, { Component } from 'react';
import { Text, Button, Box, Image, Center, HStack, Square, Spacer} from "@chakra-ui/react"

class Order extends Component{

    render(){
        return(
            <Box m={1} borderWidth={1} borderColor="green.500" p={10} borderRadius="lg" marginBottom="14" >
                <HStack>
                    <Square width="25%" m={1} borderWidth={1} borderColor="green.500" p={5} borderRadius="lg">
                        <Image src='assets/images/maggi-chicken-tikiri.png' alt="Maggie Tikiri"/>
                    </Square>
                    <Box height="100%" width="50%" m={1} borderWidth={1} borderColor="green.500" p={5} borderRadius="lg">
                    <Text>Order Details</Text>
                    <p>
                        {this.props.Orders.Description}
                    </p>
                    </Box>
                    <Box height="100%" width="25%" m={1} >
                        
                        <Center mb="5">
                           <Button colorScheme="green">Confirm Receive</Button>
                           <Spacer />
                           <Button colorScheme="gray">Cancel</Button>
                        </Center>
                        
                               
                    </Box>
                </HStack>
                <Spacer />
            </Box>
        );
    }
}

export default Order;