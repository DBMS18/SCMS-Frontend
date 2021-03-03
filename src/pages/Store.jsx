import React, { Component } from 'react';
import { Box, Center, Spinner} from "@chakra-ui/react"

import Product from '../components/Product';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';

class Store extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: {},
            loading: true
        }
    }
    
    async componentDidMount() {
        if(this.props.role==="guest"){
            await axios.get('http://localhost:5000/api/guests/get-products', null)
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        products: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

            this.setState({
                ...this.state,
                loading: false
            })
        }else if(this.props.role==="customer"){
            const token = localStorage.getItem('token');
            let data = {
                headers: {
                    'Access-Control-Allow-Headers': 'x-Auth-token',
                    'x-Auth-token': token
                }
            }
            await axios.get('http://localhost:5000/api/customer/get-products', Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        products: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

            this.setState({
                ...this.state,
                loading: false
            })
        }
    }

    async searchProduct(keyword){
        console.log("1")
        this.setState({
            ...this.state,
            loading:true
        })
        if(this.props.role==="guest"){
            await axios.get(`http://localhost:5000/api/guests/search-products?keyword=${keyword}`, null)
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        products: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

            this.setState({
                ...this.state,
                loading: false
            })
        }else if(this.props.role==="customer"){
            const token = localStorage.getItem('token');
            let data = {
                headers: {
                    'Access-Control-Allow-Headers': 'x-Auth-token',
                    'x-Auth-token': token
                }
            }
            await axios.get(`http://localhost:5000/api/customer/search-products?keyword=${keyword}`, Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        products: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

            this.setState({
                ...this.state,
                loading: false
            })
        }
    }

    addItemToCart(selectedProduct){
        var added = false;
        var productsList = this.props.products.map((product, i) => {
            if (product.product_id===selectedProduct.product_id) {
                product.selected= product.selected+selectedProduct.selected
                added = true
            }
            return product;
        });
        if (!added) {
            productsList = [selectedProduct, ...productsList]
        }
        added = false;
        this.props.addItemToCart(productsList);
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
            const productsList = this.state.products.map((product, i) => {
                return (
                    <Product key={i} product={product} addItemToCart={this.addItemToCart.bind(this)} page={this.props.page}  />
                );
            });
            return(
                <div>
                    <SearchBar searchProduct={this.searchProduct.bind(this)} />
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

const mapStateToProps = state => {
    return {
        role : state.role,
        products: state.cart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItemToCart: (product) => dispatch(actions.addItemToCart(product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);