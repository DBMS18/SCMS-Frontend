import React, { Component } from 'react';
import { Box, Center, Spinner, Text} from "@chakra-ui/react"

import Product from '../components/Product';
import axios from 'axios';

//import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: {},
            loading: true
        }
    }
    
    async componentDidMount() {
        this.setState({
            ...this.state,
            loading: false
        })
    }
    

    render(){
        
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
                const productsList = this.props.products.map((product, i) => {
                    return (
                        <Product key={i} product={product} page={this.props.page}/>
                    );
                });
                return(
                    <div>
                        <Center>
                            <Box width="75%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                {productsList}
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