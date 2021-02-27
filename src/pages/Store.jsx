import React, { Component } from 'react';
import { Box, Input, InputGroup, InputLeftElement, IconButton, Center, Spinner} from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'

import Product from '../components/Product';
import axios from 'axios';

//import * as actions from '../store/actions/auth';
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
        console.log(this.props.role)
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
            await axios.get('http://localhost:5000/api/customer/get-products', null)
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
    

    render(){
        console.log(this.state.products)
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

const mapStateToProps = state => {
    return {
        role : state.role,
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogout: () => dispatch(actions.logout()),
//     };
// };

export default connect(mapStateToProps, null)(Store);