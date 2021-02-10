import React, { Component } from 'react';
import { PRODUCTS } from "./ProductFile";
import { Box, Input, InputGroup, InputLeftElement, IconButton, Center} from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'

import Product from '../components/Product'

class Store extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: PRODUCTS
        }
    }
    
    

    render(){

        const productsList = this.state.products.map((product, i) => {
            return (
                <Product key={i} product={product} />
            );
        });
        return(
            <div>
                <SearchBar />
                <Center>
                    <Box width="75%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        {productsList}
                    </Box> 
                </Center> 
            </div>
        );
    }
}

const SearchBar = () => {
    return(
        <Box borderBottom="1px" borderColor="gray.300" p={5}>
            <Center>
                <InputGroup width="50%">
                    <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="white.100" />}
                    />
                    <Input type="search" placeholder="Search" color="black.400"/>
                    <IconButton aria-label="Search database" icon={<Search2Icon />} bg="blueGreen.400"/>
                </InputGroup>
            </Center>
        </Box>
    );
}

export default Store;