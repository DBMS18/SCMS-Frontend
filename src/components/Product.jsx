import React, { Component } from 'react';
import { Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Box, Image, Center, HStack, Square} from "@chakra-ui/react"

class Product extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected:1,
            product:{}
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            propduct:this.props.product
        })
    }

    handleChange = (value) => {      
        console.log(value)   
        // if (this.props.page==="store") {
            this.setState({
                    ...this.state,
                    selected:value,
                });
        // }else{
        //     var increment = value-this.props.product.selected;
        //     console.log(increment);
        //     var product = {
        //         amount: this.props.product.amount,
        //         capacity: this.props.product.capacity,
        //         name: this.props.product.name,
        //         picture_url: this.props.product.picture_url,
        //         price: this.props.product.price,
        //         product_id: this.props.product.product_id,
        //         type: this.props.product.type,
        //         selected: parseInt(value)
        //     };
        //     console.log(product)
        //     this.setState({
        //         ...this.state,
        //         selected:value,
        //         product:product
        //     },
        //     this.props.addItemToCart(product)
        //     );
        // }
        
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

    removeItemFromCart(){
        //this.props.addItemToCart(this.props.product.products_id);
    }

    render(){
        return(
            <>
                <Box m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                    <HStack>
                        <Square width={this.props.page==="cart"?"10%":"25%"} m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                            <Image src={this.props.product.picture_url} alt="Maggie Tikiri"/>
                        </Square>
                        <Box height="100%" width={this.props.page==="cart"?"35%":"50%"} m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                            <h2 style={{fontWeight: 'bold', fontSize: 20}}>{this.props.product.type}</h2>
                            {
                                this.props.page=="store"?
                                (
                                    <p>
                                        {this.props.product.description}
                                    </p>
                                ):(
                                    <div></div>
                                ) 
                            }
                        </Box>
                        <Box height="100%" width={this.props.page==="cart"?"25%":"25%"} m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                            {
                                this.props.page=="store"?
                                (
                                    <>
                                        <Center mb="5">
                                            <Text>{this.props.product.amount} items available</Text>
                                        </Center>
                                        <Center mb="5">
                                            <Text>Rs.{this.props.product.price}</Text>
                                        </Center>
                                    </>
                                ):(
                                    <div></div>
                                ) 
                            }
                            {
                            localStorage.getItem('role') === "guest" ? 
                                <div></div> 
                            : 
                                <>
                                    <Center mb="5">
                                        <HStack>
                                            <Text>{this.props.page==="cart"?"Total Quantity : ":"Quantity : "} </Text>
                                            <NumberInput isDisabled={this.props.page==="cart"?true:false} onChange={(value) => this.handleChange(value)} focusBorderColor={this.state.selected<=this.props.product.amount? "green.400" : "red.400"} size="md" maxW={24} defaultValue={this.props.page==="store"?1:this.props.product.selected} max={this.props.product.amount} clampValueOnBlur={true}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </HStack>
                                    </Center>
                                    {
                                        this.props.page=="store"?
                                        (
                                            <Button onClick={this.addItemToCart.bind(this)} colorScheme="teal" variant="solid">
                                                Add to Cart
                                            </Button>
                                        ):(
                                            <Button onClick={this.removeItemFromCart.bind(this)} colorScheme="pink" variant="solid">
                                                Remove
                                            </Button>
                                        ) 
                                    }
                                </>
                            }
                        </Box>
                        {
                            this.props.page=="cart"?
                            (
                                <Box height="100%" width="25%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                    <h2 style={{fontWeight: 'bold', fontSize: 20}}>Total Amount : </h2>
                                    <p>Rs.{this.props.product.price} X {this.props.product.selected} = Rs.{this.props.product.price * this.props.product.selected}</p>
                                </Box>
                            ):(
                                <div></div>
                            ) 
                        }
                    </HStack>
                </Box>
            </>
        );
    }
}

export default Product;