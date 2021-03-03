import React, { Component } from 'react';
import { Box, Button, Center, Select, Spinner, TableCaption, Tbody, Tfoot, Th, Thead, Tr, Table, Td } from "@chakra-ui/react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddOrdersToDuty extends Component {
    constructor(props){
        super(props);
        this.state = { 
            orderlist:[],
            loading:true,
            duty_id:''
         }
    }

    async componentDidMount(props) {
        // assistant: "7"
        // driver: "5"
        // route: "1"
        // time: "4"
        // truck: "NB-1227"
        //console.log("property_id",this.props.location.state.duty_id);
        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
        await axios.get(`http://localhost:5000/api/storekeeper/received-orders/${1}`, Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        orderlist: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

            this.setState({
                ...this.state,
                loading:false
            })

    }
    

    async submit(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            loading: true
        })
        console.log(this.state.fields)

        // const token = localStorage.getItem('token');
        // let data = {
        //     headers: {
        //         'Access-Control-Allow-Headers': 'x-Auth-token',
        //         'x-Auth-token': token
        //     }
        // }
        // await axios.post('http://localhost:5000/api/storekeeper/duty-finished',this.state.fields, data)
        //     .then(data => {
        //         if (data.data.err===0) {
        //             alert(data.data.msg);
        //         }else{
        //             alert(data.data.msg);
        //         }
                
        //     }).catch(err => {
        //         console.log("ERR: " + err.message)
        //     })

            this.setState({
                ...this.state,
                loading: false
            })
        
    }

    async handleClick(value){
        var details = {
            order_id:value,
            duty_id:this.state.duty_id
        }
        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }

        await axios.post('http://localhost:5000/api/storekeeper/order-markas-send',details,data)
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
            var orderList=this.state.orderlist.map((order,i)=>{
                var products = order.product_list.map((product,i)=>{
                    return `${product.type}(${product.ordered_quantity}), `
                })
                return(
                    <Tr key={i}>
                        <Td>{order.order_id}</Td>
                        <Td>{order.date}</Td>
                        <Td>{products}</Td>
                        <Td>{order.total_capacity}</Td>
                        <Td><Button size="xs" colorScheme="blue" value={order.order_id} onClick={this.handleClick.bind(this,order.order_id)} >Received to Store</Button></Td>
                    </Tr>
                );
            });
            return (
                <div>
                    <Center>
                        <Table variant="striped" colorScheme="red">
                            <TableCaption  placement="top">Put orders to duty record</TableCaption>
                            <Thead>
                                <Tr>
                                <Th>Order ID</Th>
                                <Th>Received date</Th>
                                <Th>Product list</Th>
                                <Th>Total capacity</Th>
                                <Th>Select</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderList}
                            </Tbody>
                            <Tfoot>
                            </Tfoot>
                        </Table>
                    </Center>
                </div>
            );
        }
    }
}

export default AddOrdersToDuty;