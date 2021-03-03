import React, { Component } from 'react'
import { Box, Button, Center } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
class StoreKeeper extends Component {
    constructor(props){
        super(props);
        this.state = { 
            page:''
         }
    }

     goTo(page){
        if (page==="Add_duty") {
            this.setState({
                page:'/addduty'
            })
        }else if (page==="Mark_off") {
            this.setState({
                page:'/markoff'
            })
        }else if (page==="Add_To_Store") {
            this.setState({
                page:'/addtostore'
            })
        }
     }

    render() {
        console.log(this.state.page)
        if (this.state.page!=='') {
            return(
                <Redirect to={this.state.page} />
            )
        }
        return (
            <div>
                <Center>
                    <Box width="50%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                        <Button m={1} onClick={this.goTo.bind(this, "Add_duty")} colorScheme="teal" variant="solid">
                            Add duty record
                        </Button>
                        <Button m={1} onClick={this.goTo.bind(this, "Add_To_Store")} colorScheme="teal" variant="solid">
                            Add order to store
                        </Button>
                        <Button m={1} onClick={this.goTo.bind(this, "Mark_off")} colorScheme="teal" variant="solid">
                            Mark Finish
                        </Button>
                    </Box>
                </Center>
            </div>
        );
    }
}

export default StoreKeeper;