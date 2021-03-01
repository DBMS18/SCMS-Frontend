import React, { Component } from 'react'

import { Box, Input, InputGroup, InputLeftElement, IconButton, Center} from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = { 
            keyword:""
         }
    }
    
     handleChange = (e) => {         
        this.setState({
          ...this.state,
          keyword:e.target.value,
        });
    }
    render() {
        return(
            <Box borderBottom="1px" borderColor="gray.300" p={5}>
                <Center>
                    <InputGroup width="50%">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="white.100" />}
                        />
                        <Input onChange={this.handleChange} type="search" placeholder="Search" color="black.400"/>
                    </InputGroup>
                    <IconButton onClick={this.props.searchProduct.bind(this,this.state.keyword)} aria-label="Search database" icon={<Search2Icon/>} bg="blueGreen.400"/>
                </Center>
            </Box>
        );
    }
}

export default SearchBar;