import React, { Component } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { Progress } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import axios from 'axios';
import { Box, Center, Spinner} from "@chakra-ui/react"
import { Redirect } from 'react-router-dom';

class AddToStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            acceptedProducts: {},
            storedProducts: {},
            loginInfo:{},
            loading: true
        }
    }
   
    async componentDidMount() {
        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
        await axios.get('http://localhost:5000/api/storekeeper/login-info', Object.assign({}, {}, data))
         .then(data => {
             console.log(data.data)
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        loginInfo: data.data.obj
                    })
                }else{
                   this.setState({
                        ...this.state,
                        loginInfo: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })



        await axios.get('http://localhost:5000/api/storekeeper/order-reception', Object.assign({}, {}, data))
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        acceptedProducts: data.data.obj
                    })
                }else{
                   this.setState({
                        ...this.state,
                        acceptedProducts: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })


        await axios.get('http://localhost:5000/api/storekeeper/order-received', Object.assign({}, {}, data))
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        storedProducts: data.data.obj
                    })
                }else{
                    this.setState({
                        ...this.state,
                        storedProducts: null
                    })
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })

        this.setState({
                ...this.state,
                loading: false
        })
    }


    async handleClick(value){
        console.log(value);
        var order_id = {
            id:value,
        };
        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }

        await axios.post('http://localhost:5000/api/storekeeper/order-stored',order_id,data)
        .then((data)=>{
            window.location.reload();
        }).catch(err => {
                console.log("ERR: " + err.message)
         })
    }




    render() {
        if (localStorage.getItem('role')==="customer") {
            return(
                <Redirect to='/home'/>
            );
        }else if (localStorage.getItem('role')==="manager") {
            return(
                <Redirect to='/manager'/>
            );
        }else if (localStorage.getItem('role')==="driver_assistant") {
            return(
                <Redirect to='/driverassistant'/>
            );
        }
        console.log(this.state.loading);
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
            if(this.state.acceptedProducts){
            var acceptedProductList=this.state.acceptedProducts.map((product,i)=>{
                
                return(
                    <Tr>
                        <Td>{product.order_id}</Td>
                        <Td>{product.total_amount}</Td>
                        <Td>{product.first_name}</Td>
                        <Td>{product.expected_date}</Td>
                        <Td><Button size="xs" colorScheme="blue" value={product.order_id} onClick={this.handleClick.bind(this,product.order_id)} >Received to Store</Button></Td>
                    </Tr>
                );
            });
            }

            if(this.state.storedProducts){
            var storedProductList=this.state.storedProducts.map((product,i)=>{
                return(
                    <Tr>
                        <Td>{product.order_id}</Td>
                        <Td>{product.total_amount}</Td>
                        <Td>{product.first_name}</Td>
                        <Td>{product.expected_date}</Td>
                        
                    </Tr>
                );
            });
            }
       

        return (
            <>
            <div>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={2} h="10">
                    Store:
                    <Input size="sm" variant="filled" placeholder={this.state.loginInfo==null?"":this.state.loginInfo.city} isReadOnly='true' /></GridItem>

                <GridItem colStart={4} colEnd={6} h="10">
                    Store Manager:
                    <Input size="sm" variant="filled" placeholder={this.state.loginInfo==null?"":this.state.loginInfo.first_name+" "+this.state.loginInfo.last_name} isReadOnly='true' />
                </GridItem>
            </Grid>  
            </div>
            <br/>
            
            
            <Table variant="striped" colorScheme="red">
                <TableCaption  placement="top">Products waiting to be recieved</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Order ID</Th>
                    <Th>Total Products</Th>
                    <Th>Customer Name</Th>
                    <Th>Expected Date</Th>
                    <Th>Select</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {acceptedProductList}
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
                <br/>
                
                <br/>
                <br/>
                <Progress size="lg" isIndeterminate />
                <br/>

            <Table variant="striped" colorScheme="blue">
                <TableCaption placement="top">Products which are recieved</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Order ID</Th>
                    <Th>Total Products</Th>
                    <Th>Customer Name</Th>
                    <Th>Expected Date</Th>
                    
                    </Tr>
                </Thead>
                <Tbody>
                    {storedProductList}
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
            </>
        );
    }
}
}
export default AddToStore;