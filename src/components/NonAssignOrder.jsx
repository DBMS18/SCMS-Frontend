import React, { Component } from 'react';
import { Text,Button, Box} from "@chakra-ui/react"
import {Table,Thead,Th,Td,Tr,Tbody,Select} from "@chakra-ui/react"


class NonAssignOrder extends Component{

    constructor(props){
        super(props);
        this.state = { 
            Status:""
         }
    }

    MakeItem = function(X) {
        return <option>{X}</option>;
      }; 
    

    handleChange = (e) => {         
        this.setState({
          ...this.state,
          Status:e.target.value,
        });
    }


    render(){
        return(

<Box bg="white" w="100%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="10" borderRadius="lg" marginBottom="10" >
      <Table variant="striped" colorScheme="green"> 
        <Thead>
          <Tr>
            <Th align="center" >Order</Th>
            <Th align="center" >Total Capacity</Th>
            <Th align="center" >Store</Th>
            <Th align="center" >Date</Th>
            <Th align="center" >Expected Date</Th>
            <Th align="center" >Available Trains</Th>
            <Th align="center">Assign order to train</Th>
          </Tr>
        </Thead>
        <Tbody>
         
            <Tr >
              <Td align="left">{this.props.order.order_id}</Td>
              <Td align="left">{this.props.order.total_capacity}</Td>
              <Td align="left">{this.props.order.store_id}</Td>
              <Td align="left">{this.props.order.date}</Td>
              <Td align="left">{this.props.order.expected_date}</Td>
              <Td align="left"><Select bgColor="green.400" placeholder="Select Train" value={this.X} onChange={this.handleChange}>{this.MakeItem(this.props.order.train_list.train_id)}</Select></Td>
              <Td><Button colorScheme="green" onClick={this.props.assignOrder.bind(this,this.state.Status,this.props.order.order_id,this.props.order.total_capacity)}>Assign</Button>
              </Td>
            </Tr>
        </Tbody>
      </Table>
      </Box>
        )
          }
        }

export default NonAssignOrder;