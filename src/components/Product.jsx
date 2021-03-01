import React, { Component } from 'react';
import { Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Box, Image, Center, HStack, Square} from "@chakra-ui/react"

class Product extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected:1
        }
    }

    handleChange = (value) => {         
        this.setState({
          ...this.state,
          selected:value,
        });
    }

    addItemToCart(){
        var product = {
            amount: this.props.product.amount,
            capacity: this.props.product.capacity,
            name: this.props.product.name,
            picture_url: this.props.product.picture_url,
            price: this.props.product.price,
            product_id: this.props.product.product_id,
            type: this.props.product.type,
            selected: parseInt(this.state.selected)
        };
        this.props.addItemToCart(product);
    }

    render(){
        return(
            <Box m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                <HStack>
                    <Square width="25%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <Image src={this.props.product.picture_url} alt="Maggie Tikiri"/>
                    </Square>
                    <Box height="100%" width="50%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <h2 style={{fontWeight: 'bold', fontSize: 20}}>{this.props.product.type}</h2>
                        <p>
                            {this.props.product.description}
                        </p>
                    </Box>
                    <Box height="100%" width="25%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <Center mb="5">
                            <Text>{this.props.product.amount} items available</Text>
                        </Center>
                        <Center mb="5">
                            <Text>Rs.{this.props.product.price}</Text>
                        </Center>
                        {
                        localStorage.getItem('role') === "guest" ? 
                            <div></div> 
                        : 
                            <>
                                <Center mb="5">
                                    <HStack>
                                        <Text>Quantity : </Text>
                                        <NumberInput onChange={(value) => this.handleChange(value)} focusBorderColor={this.state.selected<=this.props.product.amount? "green.400" : "red.400"} size="md" maxW={24} defaultValue={1} max={this.props.product.amount} clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </HStack>
                                </Center>
                                <Button onClick={this.addItemToCart.bind(this)} colorScheme="teal" variant="solid">
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