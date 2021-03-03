import React, { Component } from 'react';
import axios from 'axios';
import { Box,Center, Heading,Spinner} from "@chakra-ui/react"

import Order from '../components/DutyOrder'
import { Redirect } from 'react-router-dom';


class StoreOrders extends Component{
    constructor(props){
        super(props);
        this.state = {
            DutyOrders: [],
            loading:true
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        console.log(token);
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
            await axios.get(`http://localhost:5000/api/assistant/get-orders`, Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        DutyOrders: data.data.obj
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
  
    
        async confirmOrder(order_id){
            this.setState({
                ...this.state,
                loading:true
            });

            const token = localStorage.getItem('token');
        console.log(token);
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
                await axios.post(`http://localhost:5000/api/assistant/${order_id}`, data)
                .then(data => {
                    if (data.data.err===0) {
                        alert(data.data.msg);
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

                this.refreshPage();
            }

            refreshPage() {
                window.location.reload();
              }

    render(){
        if (localStorage.getItem('role')==="customer") {
            return(
                <Redirect to='/home'/>
            );
        }else if (localStorage.getItem('role')==="manager") {
            return(
                <Redirect to='/manager'/>
            );
        }else if (localStorage.getItem('role')==="store_keeper") {
            return(
                <Redirect to='/storekeeper'/>
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
        
        const orderList = this.state.DutyOrders.map((order, i) => {
            return (

                <Order key={i} order={order} page={this.props.page} confirmOrder={this.confirmOrder.bind(this)}/>
            );
        });
        return(
            <div>
                <Heading>Orders in your Duty</Heading>
                <Center>
                    <Box width="75%" m={5}  p={5} borderRadius="lg" marginBottom="20">
                        {orderList}
                    </Box> 
                </Center> 
            </div>
        );
    }
}
}




export default StoreOrders;