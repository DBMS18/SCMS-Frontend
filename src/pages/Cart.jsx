import React, { Component } from 'react';
import { Box, Center, Spinner, Text, Button} from "@chakra-ui/react"

import Product from '../components/Product';
import axios from 'axios';

//import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: {},
            loading: true,
            checkout: false,
        }
    }
    
    async componentDidMount() {
        this.setState({
            ...this.state,
            loading: false,
            products: this.props.products
        })
    }
    
    checkOut(){
        console.log("object")
        this.setState({
            ...this.state,
            checkout:true
        })
    }

    render(){
        if (localStorage.getItem('role')==="manager") {
            return(
                <Redirect to='/manager'/>
            );
        }else if (localStorage.getItem('role')==="store_keeper") {
            return(
                <Redirect to='/storekeeper'/>
            );
        }else if (localStorage.getItem('role')==="driver_assistant") {
            return(
                <Redirect to='/driverassistant'/>
            );
        }
        if (this.state.checkout) {
            var total = 0.00;
            const productsList = this.props.products.map((product, i) => {
                total = total + product.price * product.selected;
                return (
                    <Product key={i} product={product} page={this.props.page}/>
                );
            });
            return(
                <Redirect to={{
                    pathname: "/checkout",
                    state: { products: this.props.products, total:total }
                  }}/>
            )
        }
        
        if (this.state.loading) {
            return(
                <Center>
                    <Spinner
                        thickness="5px"
                        speed="0.65s"
                        emptyColor="black"
                        color="white"
                        size="xl"
                    />
                </Center>
            );
        }else{
            if (this.props.products.length==0) {
                return(
                    <div>
                        <Center>
                            <Box width="75%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                <Text>No items in the cart</Text>
                            </Box> 
                        </Center> 
                    </div>
                );
            }else{
                var total = 0.00;
                const productsList = this.props.products.map((product, i) => {
                    total = total + product.price * product.selected;
                    return (
                        <Product key={i} product={product} page={this.props.page}/>
                    );
                });
                console.log(total)
                return(
                    <div>
                        <Center>
                            <Box width="60%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                {productsList}
                            </Box> 
                            <Box width="20%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                <Center>
                                    <Button mb="5" onClick={this.checkOut.bind(this)} colorScheme="teal" variant="solid">
                                        Go to checkout
                                    </Button>
                                </Center>
                                <Center>
                                    Sub Total :      Rs. {total}
                                </Center>
                                
                            </Box>
                        </Center> 
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        role : state.role,
        products: state.cart
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogout: () => dispatch(actions.logout()),
//     };
// };

export default connect(mapStateToProps, null)(Cart);