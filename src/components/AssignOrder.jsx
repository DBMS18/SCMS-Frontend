import React, { Component } from 'react';
import {Button, Box} from "@chakra-ui/react"
import {Table,Thead,Th,Td,Tr,Tbody} from "@chakra-ui/react"

class AssignOrder extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
<Box bg="white" p={4} color="black" border="2px" borderColor="gray.300" marginTop="10" borderRadius="lg">
  <Table variant="striped" colorScheme="green" >
        <Thead>
          <Tr>
            <Th align="left">Order</Th>
            <Th align="left">Total Capacity</Th>
            <Th align="left">Store</Th>
            <Th align="left">Date</Th>
            <Th align="left">Expected Date</Th>
            <Th align="left">Assigned Train</Th>
            <Th>Remove Order from train</Th>
          </Tr>
        </Thead>
        <Tbody>
          
            <Tr >
              
              <Td align="left">{this.props.assigned.order_id}</Td>
              <Td align="left">{this.props.assigned.total_capacity}</Td>
              <Td align="left">{this.props.assigned.store_id}</Td>
              <Td align="left">{this.props.assigned.date}</Td>
              <Td align="left">{this.props.assigned.expected_date}</Td>
              <Td align="left">{this.props.assigned.train}</Td>
              <Td><Button colorScheme="green"onClick={this.props.removeOrder.bind(this,this.props.assigned.train_id)}>Remove</Button></Td>
            </Tr>
        </Tbody>
      </Table> 
</Box>  

        )}}
export default AssignOrder;