import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input, Center, Heading, Button, Box, Select, Spinner } from "@chakra-ui/react";
import { ArrowRightIcon } from '@chakra-ui/icons';
import { checkout } from 'superagent';
import axios from 'axios';

class Checkout extends Component {
    constructor(props){
        super(props);
   
        this.state = {
            loading:true,
            fields: {
                street_number:'',
                street_name:'',
                city:'',
                zip:'',
                route:'',
                date:'',
                payment_method:'',
                card_number:'',
                month:'',
                year:'',
                cvc:'',
                total:''
            },
            products:'',
            routes:[]
        }
     }
    async componentDidMount() {
        var today = new Date();
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+9);
        var fields = this.state.fields;
        fields["date"] = nextweek.toISOString().slice(0,10);
        this.setState({
            ...this.state,
            fields,
            products:this.props.products
        })
        const token = localStorage.getItem('token');
        console.log(token);
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
        console.log("1")
        await axios.get('http://localhost:5000/api/customer/get-routes', Object.assign({}, {}, data))
        .then(data => {
            console.log("2")
            console.log( data.data.obj)
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

        this.setState({
            ...this.state,
            loading: false
        })
        console.log(this.state)
    }

    async checkout(e) {
        e.preventDefault();
        var total = 0.00;
        const productsList = this.props.products.map((product, i) => {
            total = total + product.price * product.selected;

        });
        var fields = this.state.fields;
        fields["total"] = total;
        this.setState({
            ...this.state,
            loading:true,
            fields
        })
        await this.saveOrder(this.state)
    }

    async saveOrder(details){
        var today = new Date();
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

        const token = localStorage.getItem('token');
        let data = {
            headers: {
                'Access-Control-Allow-Headers': 'x-Auth-token',
                'x-Auth-token': token
            }
        }
        await axios.post('http://localhost:5000/api/customer/checkout_cart',details, data)
            .then(data => {
                if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        products: data.data.obj
                    })
                }else{
                    alert(data.data.msg);
                }
                if(data.data.err===0){
                    alert(data.data.msg);
                }else if(data.data.err===1){
                    alert(data.data.msg);
                }else{
                    alert("something is wrong");
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })

            this.setState({
                ...this.state,
                loading: false
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

    render() {
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
            var total = 0.00;
            const productsList = this.props.products.map((product, i) => {
                total = total + product.price * product.selected;

            });
            const routes = this.state.routes.map((route)=>{
                return (
                    <option value={route.route_id}>{route.cities}</option>
                )
            })
            return (
                <div>
                    <form name="checkoutform" className="checkoutform" onSubmit= {this.checkout.bind(this)}>
                        <Center>
                            <Box width="80%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                <Center>
                                    <Box width="60%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                        <Heading margin="10">Personal Information</Heading>
                                        <Heading size="sm" margin="5">Address</Heading>
                                        <Input isRequired placeholder="Number"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "street_number")} value={this.state.fields["street_number"]} />
                                        <Input isRequired placeholder="Street"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "street_name")} value={this.state.fields["street_name"]} />
                                        <Input isRequired placeholder="City"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]} />
                                        <Input isRequired placeholder="Zip"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "zip")} value={this.state.fields["zip"]} />

                                        <Heading size="sm" margin="5">Minimum expected date</Heading>
                                        <Input isRequired placeholder="Date" isDisabled  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "date")} value={this.state.fields["date"]} />

                                        <Heading size="sm" margin="5">Route</Heading>
                                        <Select placeholder="Select option" isRequired onChange={this.handleChange.bind(this, "route")}>
                                            {routes}
                                        </Select>
                                    </Box> 
                                    <Box width="40%" m={5} borderWidth={1} borderColor="gray.300" p={5} borderRadius="lg">
                                        <Heading margin="10">Payment Method</Heading>
                                        <Select placeholder="Payment Method" isRequired onChange={this.handleChange.bind(this, "payment_method")}>
                                            <option value="visa">Visa</option>
                                            <option value="master">Master</option>
                                        </Select>
                                        <Input isRequired placeholder="Card number"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "card_number")} value={this.state.fields["card_number"]} />
                                        <Heading size="sm" margin="5">Expire date</Heading>
                                        <Input isRequired placeholder="Month"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "month")} value={this.state.fields["month"]} />
                                        <Input isRequired placeholder="Year"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "year")} value={this.state.fields["year"]} />
                                        <Input isRequired placeholder="CVC"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "cvc")} value={this.state.fields["cvc"]} />
                                        <Button type="submit" className="button"  value="Register" rightIcon={<ArrowRightIcon />} bgColor="#22543D" color="white" variant="solid" width="max-content" alignSelf="center">
                                            Pay Rs. {total}
                                        </Button>
                                    </Box>
                                </Center> 
                            </Box> 
                        </Center> 
                    </form>
                </div>
            );
        }
        
    }
}
const mapStateToProps = state => {
    return {
        role : state.role,
        products: state.cart
    };
};

export default connect(mapStateToProps, null)(Checkout);