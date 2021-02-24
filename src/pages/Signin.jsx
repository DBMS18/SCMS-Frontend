
import { Container,Input,InputGroup,InputLeftElement,Stack, Spinner, Center} from "@chakra-ui/react";

import { Heading,Text } from "@chakra-ui/react";

import {ArrowRightIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { Component } from 'react';
import { RiLock2Line } from "react-icons/ri";
//import { Icon } from "@chakra-ui/react";
//import { MdSettings } from "react-icons/md";

//import HTTP from '../utils/HTTP';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';

class Signin extends Component{

    constructor(props){
        super(props);
   
        this.state = {
            fields: {
              pwrd:'',
              email:''
            },
            errors: {
              pwrd:'',
              email:''
            },
            loading: false,
            token: null,
            user:null,
            role:null,
            redirect:"login"
        }
     }
   
     handleValidation(){
         let fields = this.state.fields;
         let errors = {};
         let formIsValid = true;
   
         //Email
         if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "* Email is requierd";
         }
   
         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
   
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "* Email is not valid";
             }
        }

        //function for check if email is registered or not registered 

        //Password
        if(!fields["pwrd"]){
            formIsValid = false;
            errors["pwrd"] = "* Password is requierd";
         }

         //function for check password is correct
        
   
        this.setState({
          ...this.state,
          errors: errors,
        });
        return formIsValid;
    }

    async check() {
        return new Promise((resolve) => {
            this.setState({
                ...this.state,
                loading: true
            },
            function(){resolve(this.handleValidation())}
            )
        });
      }   
     
    async signIn(e) {
         e.preventDefault();
        
        let validated = await this.check();

        if(validated){
            await axios.get('http://localhost:5000/api/guests/auth/login', null)
            .then(data => {
                console.log("object")
                return data
            }).then((data)=>{
                return data
            }).then((data)=>{
                if (data.data.err===0) {
                    alert(data.data.msg);
                    if (data.data.obj.user.role==="customer") {
                        this.setState({
                            ...this.state,
                            token: data.data.obj.token,
                            user: data.data.obj.user,
                            role: "customer"
                        },
                        async function(){await this.props.onAuth(this.state.token, this.state.user, "customer")}
                        );
                    }else if (data.data.obj.user.role==="manager") {
                        this.setState({
                            ...this.state,
                            token: data.data.obj.token,
                            user: data.data.obj.user,
                            role: "manager"
                        },
                        async function(){await this.props.onAuth(this.state.token, this.state.user, "manager")}
                        );
                    }else if (data.data.obj.user.role==="storekeeper") {
                        this.setState({
                            ...this.state,
                            token: data.data.obj.token,
                            user: data.data.obj.user,
                            role: "storekeeper"
                        },
                        async function(){await this.props.onAuth(this.state.token, this.state.user, "storekeeper")}
                        );
                    }
                }else{
                    alert(data.data.msg);
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
            })
            
        }else{
            console.log("error")
        }
        this.setState({
            ...this.state,
            loading: false
        })



        //  if(this.handleValidation()){
        //    await HTTP.get('http://localhost:5000/api/guest/auth/login', null)
        //    .then(data => {
        //         console.log("GET: " + JSON.stringify(data))
        //    })
        //    .catch(err => {
        //         console.log("ERR: " + err.message)
        //    })
        //     alert("Sign In Success");
        //  }
   
     }
   
     handleChange(field, e){         
         let fields = this.state.fields;
         fields[field] = e.target.value;        
         this.setState({
           ...this.state,
           fields
         });
     }
    
    //  componentWillUnmount() {
    //     this._isMounted = false;
    //  }
    render(){
        console.log("isauth" + this.props.isAuthenticated);
        console.log("token" + this.props.token);
        if(this.props.isAuthenticated){
            
            if (localStorage.getItem('role')==="customer") {
                return(
                    <Redirect to='/home'/>
                );
            }else if (localStorage.getItem('role')==="manager") {
                return(
                    <Redirect to='/manager'/>
                );
            }
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
            return(
                <div>           
                    <form name="signinform" className="signinform" onSubmit= {this.signIn.bind(this)}>
                        <Container bg="white" w="80%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="14" marginBottom="14" borderRadius="lg">
                            <Heading margin="10">Sign in</Heading>
                            <Stack spacing={5}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<EmailIcon color="gray.300" />}
                                    />
    
                                    <Input isRequired placeholder="E-Mail"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                                </InputGroup>
                                <Text style={{color: "red"}}>{this.state.errors["email"]}</Text>
    
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<RiLock2Line color="gray.300" />}
                                    />
    
                                    <Input isRequired type="password" placeholder="Password"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "pwrd")} value={this.state.fields["pwrd"]}/>
                                </InputGroup>
                                <Text style={{color: "red"}}>{this.state.errors["pwrd"]}</Text>
    
                                <Button type="submit"className="button"  value="Register" rightIcon={<ArrowRightIcon />} bgColor="#22543D" color="white" variant="solid" width="max-content" alignSelf="center">
                                    Sign in
                                </Button>
                            </Stack>
                        </Container>
                    </form>
                </div>
    
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined),
        token : state.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, user, role) => dispatch(actions.authSuccess(token, user, role)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
  
