import React, { Component } from 'react';
import { Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Box, Image, Center, HStack, Square} from "@chakra-ui/react"

class Product extends Component{

    render(){
        return(
            <Box m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                <HStack>
                    <Square width="25%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <Image src='assets/images/maggi-chicken-tikiri.png' alt="Maggie Tikiri"/>
                    </Square>
                    <Box height="100%" width="50%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <h2 style={{fontWeight: 'bold', fontSize: 20}}>{this.props.product.Type}</h2>
                        <p>
                            {this.props.product.Description}
                        </p>
                    </Box>
                    <Box height="100%" width="25%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <Center mb="5">
                            <Text>{this.props.product.Quantity} items available</Text>
                        </Center>
                        <Center mb="5">
                            <Text>Rs.{this.props.product.Amount}</Text>
                        </Center>
                        {
                        localStorage.getItem('role') === "guest" ? 
                            <div></div> 
                        : 
                            <>
                                <Center mb="5">
                                    <HStack>
                                        <Text>Quantity : </Text>
                                        <NumberInput size="md" maxW={24} defaultValue={1} max={this.props.product.Quantity} clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </HStack>
                                </Center>
                                <Button colorScheme="teal" variant="solid">
                                    Add to Cart
                                </Button>
                            </>
                        }
                    </Box>
                </HStack>
            </Box>
        );
    }
}

export default Product;