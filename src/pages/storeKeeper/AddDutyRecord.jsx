import React, { Component } from 'react';
import { Box, Button, Center, Spinner, Select } from "@chakra-ui/react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddDutyRecord extends Component {
    constructor(props){
        super(props);
        this.state = { 
            routes:[],
            trucks:[],
            drivers:[],
            assistants:[],
            times:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            fields:{
                route:'',
                truck:'',
                driver:'',
                assistant:'',
                time:''
            },
            loading:true,
            finished:false,
            duty_id:''
         }
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
        await axios.get('http://localhost:5000/api/storekeeper/available-routes', Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        routes: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

        await axios.get('http://localhost:5000/api/storekeeper/available-trucks', Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        trucks: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

        await axios.get('http://localhost:5000/api/storekeeper/available-drivers', Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        drivers: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })


        await axios.get('http://localhost:5000/api/storekeeper/available-assistant', Object.assign({}, {}, data))
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        assistants: data.data.obj
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

        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
        await axios.post('http://localhost:5000/api/storekeeper/create-duty',this.state.fields, data)
            .then(data => {
                if (data.data.err===0) {
                    alert(data.data.msg);
                    this.setState({
                        ...this.state,
                        duty_id:data.data.obj,
                        finished:true
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

        if (this.state.finished) {
            return(
                <Redirect to={{
                    pathname: "/addordertoduty",
                    state: { fields: this.state.fields, duty_id:this.state.duty_id  }
                  }}/>
            )
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
            const routes = this.state.routes.map((route, i)=>{
                return(
                    <option key={i} value={route.route_id}>{route.route_name}</option>
                )
            })

            const trucks = this.state.trucks.map((truck, i)=>{
                return(
                    <option key={i} value={truck.truck_number}>{truck.truck_number}</option>
                )
            })

            const drivers = this.state.drivers.map((driver, i)=>{
                return(
                    <option key={i} value={driver.driver_id}>{driver.driver_name}</option>
                )
            })

            const assistants = this.state.assistants.map((assistant, i)=>{
                return(
                    <option key={i} value={assistant.assistant_id}>{assistant.assistant_name}</option>
                )
            })

            const times = this.state.times.map((time, i)=>{
                return(
                    <option key={i} value={time}>{time}:00</option>
                )
            })
            return (
                <div>
                    <form name="checkoutform" className="checkoutform" onSubmit= {this.submit.bind(this)}>
                        <Center>
                            <Box width="50%" m={1} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                <Select placeholder="Select Route" isRequired onChange={this.handleChange.bind(this, "route")}>
                                    {routes}
                                </Select>
                                <Select placeholder="Select Truck" isRequired onChange={this.handleChange.bind(this, "truck")}>
                                    {trucks}
                                </Select>
                                <Select placeholder="Select Driver" isRequired onChange={this.handleChange.bind(this, "driver")}>
                                    {drivers}
                                </Select>
                                <Select placeholder="Select Assistant" isRequired onChange={this.handleChange.bind(this, "assistant")}>
                                    {assistants}
                                </Select>
                                <Select placeholder="Select Time" isRequired onChange={this.handleChange.bind(this, "time")}>
                                    {times}
                                </Select>
                                <Button m={1} type="submit" colorScheme="teal" variant="solid">
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

export default AddDutyRecord;