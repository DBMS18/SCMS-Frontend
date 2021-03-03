import React, { Component } from 'react';
import { HStack, Image, Select, useDisclosure } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import axios from 'axios';
import { Center,Spinner,Box } from "@chakra-ui/react";

import NonAssignOrder from '../components/NonAssignOrder';
import AssignOrder from '../components/AssignOrder';
import Train from '../components/Train';

class AssignGoods extends Component{
    constructor(props){
        super(props);
        this.state = {
            ordersforAssign: [],
            assignedOrders: [],
            train:[],
            loading:true
        }
    }

    async componentDidMount() {
      await axios.get(`http://localhost:5000/api/manager/assign-goods`, null)
      .then(data => {
          if (data.data.err===0) {
              this.setState({
                  ...this.state,
                  ordersforAssign: data.data.obj
              })
          }else{
              alert(data.data.msg);
          }
      }).catch(err => {
          console.log("ERR: " + err.message)
      })

      await axios.get(`http://localhost:5000/api/manager/assigned-goods`, null)
      .then(data => {
          if (data.data.err===0) {
              this.setState({
                  ...this.state,
                  assignedOrders: data.data.obj
              })
          }else{
              alert(data.data.msg);
          }
      }).catch(err => {
          console.log("ERR: " + err.message)
      })

      await axios.get(`http://localhost:5000/api/manager/trains-list`, null)
      .then(data => {
          if (data.data.err===0) {
              this.setState({
                  ...this.state,
                  train: data.data.obj
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

     async assignOrder(train_id,order_id,total_capacity){
        this.setState({
          ...this.state,
          loading:true
      });
      await axios.put(`http://localhost:5000/api/manager/assigned-goods/order_id=${order_id}&train_id=${train_id}`, null)
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

  

  async removeOrder(order_id){
    this.setState({
      ...this.state,
      loading:true
  });
      await axios.put(`http://localhost:5000/api/manager/assigned-goods/${order_id}`, null)
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
    
    const ordersforAssign = this.state.ordersforAssign.map((order, i) => {
        return (

            <NonAssignOrder key={i} order={order} page={this.props.page} assignOrder={this.assignOrder.bind(this)}/>
        );
    });

    const assignedOrders = this.state.assignedOrders.map((assigned, j) => {
      return (

          <AssignOrder key={j} assigned={assigned} page={this.props.page} removeOrder={this.removeOrder.bind(this)}/>
      );
  });

  const trainList = this.state.train.map((train, k) => {
    return (

        <Train key={k} train={train} page={this.props.page} />
    );
});
  
  
  return (
<Box height="100%" width="100%" m={1}  p={5} borderRadius="lg" marginBottom="10" >
<Heading color="black" p={4} marginTop="10">List of Trains</Heading>
      
      <Center>
                    <Box width="75%" m={5}  p={5} borderRadius="lg" marginBottom="20">
                        {trainList}
                    </Box> 
                </Center> 
                   
      <Heading color="black" p={4} marginTop="10">Assign Orders to Train</Heading>
      
      <Center>
                    <Box width="75%" m={5}  p={5} borderRadius="lg" marginBottom="20">
                        {ordersforAssign}
                    </Box> 
                </Center> 
      <Heading color="black" p={4}>Assigned Orders</Heading>
      <Center>
                    <Box width="75%" m={5}  p={5} borderRadius="lg" marginBottom="20">
                        {assignedOrders}
                    </Box> 
                </Center> 
        
      </Box>
  );
}
  }
}

export default AssignGoods;