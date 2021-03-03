import React, { Component } from 'react';
import { Box, Button, Center, Select, Spinner } from "@chakra-ui/react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddOrdersToDuty extends Component {
    constructor(props){
        super(props);
        this.state = { 
            trucks:[],
            fields:{
                truck:'',
            },
            loading:true
         }
    }

    async componentDidMount() {
        // const token = localStorage.getItem('token');
        // let data = {
        //     headers: {
        //         'Access-Control-Allow-Headers': 'x-Auth-token',
        //         'x-Auth-token': token
        //     }
        // }
        // await axios.get('http://localhost:5000/api/storekeeper/duty-set-off', Object.assign({}, {}, data))
        //     .then(data => {
        //         if (data.data.err===0) {
        //             this.setState({
        //                 ...this.state,
        //                 trucks: data.data.obj
        //             })
        //         }else{
        //             alert(data.data.msg);
        //         }
        //     }).catch(err => {
        //         console.log("ERR: " + err.message)
        //     })

            this.setState({
                ...this.state,
                loading:false
            })

    }
    
    handleChange(field, e){
        let fields = this.state.fields;
         fields[field] = e.target.value;        
         this.setState({
           ...this.state,
           fields
         });
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
            // const trucks = this.state.trucks.map((truck, i)=>{
            //     return(
            //         <option key={i} value={truck.duty_id}>{truck.truck_number}</option>
            //     )
            // })
            return (
                <div>
                    <form name="checkoutform" className="checkoutform" onSubmit= {this.submit.bind(this)}>
                        <Center>
                            <Box width="50%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                <Select isRequired placeholder="Select Sending trucks" isRequired onChange={this.handleChange.bind(this, "truck")}>
                                    
                                </Select>
                                <Button m={1} type="submit"  colorScheme="teal" variant="solid">
                                    Mark Finish
                                </Button>
                            </Box>
                        </Center>
                    </form>
                </div>
            );
        }
    }
}

export default AddOrdersToDuty;