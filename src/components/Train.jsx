import React, { Component } from 'react';
import {Button, Box} from "@chakra-ui/react"
import {Table,Thead,Th,Td,Tr,Tbody} from "@chakra-ui/react"

class Train extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
<Box bg="white" p={4} color="black" border="2px" borderColor="gray.300" marginTop="10" borderRadius="lg">
  <Table variant="striped" colorScheme="green" >
        <Thead>
          <Tr>
            <Th align="left">Train</Th>
            <Th align="left">Total Capacity</Th>
            <Th align="left">Remain Capacity</Th>
          </Tr>
        </Thead>
        <Tbody>
          
            <Tr >
              
              <Td align="left">{this.props.train.train.train_id}</Td>
              <Td align="left">{this.props.train.train.capacity}</Td>
              <Td align="left">{this.props.train.remaining}</Td>
            </Tr>
        </Tbody>
      </Table> 
</Box>  

        )}}
export default Train;