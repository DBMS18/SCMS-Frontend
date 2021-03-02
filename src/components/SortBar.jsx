import React, { Component } from 'react'

import { Box,Center,Select,Button} from "@chakra-ui/react"

class SortBar extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Status:""
         }
    }
    
     handleChange = (e) => {         
        this.setState({
          ...this.state,
          Status:e.target.value,
        });
    }

    render() {
        return(

<Box border="none" p={5}>
            <Center>
            <Select onChange={this.handleChange} colorScheme="green" defaultValue='All' width="50%" focusBorderColor="green.600">
                  <option value="All">Select Orders By</option>
                  <option value="All">All</option>
                  <option value="created">Created Orders</option>
                  <option value="accepted">Accepted Orders</option>
                  <option value="sending">Orders in Store</option>
                  <option value="delivered">Orders for Confirm</option>
                  <option value="received">Received Orders</option>
               </Select>
               <Button colorScheme="green" onClick={this.props.SortOrders.bind(this,this.state.Status)}>Go</Button>
            </Center>
        </Box>

        );
    }
}

export default SortBar;