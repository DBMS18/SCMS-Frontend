

import { Center, Heading,Text } from "@chakra-ui/react";
import { Container,Input,InputGroup,InputLeftElement,HStack, Stack, Spinner} from "@chakra-ui/react";
import {ArrowRightIcon,ViewIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { Component } from 'react';
import { AiFillIdcard } from "react-icons/ai";
import { RiLock2Line } from "react-icons/ri";
//import { Icon } from "@chakra-ui/react";
//import { MdSettings } from "react-icons/md";

//import HTTP from '../utils/HTTP';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Signup extends Component{


    constructor(props){
        super(props);
   
        this.state = {
            fields: {
                firstname:'',
                lastname:'',
                nic:'',
                email:'',
                pwrd:'',
            },
            errors: {},
            success: false
        }
     }
   
     handleValidation(){
         let fields = this.state.fields;
         let errors = {};
         let formIsValid = true;
   
         //FirstName
         if(!fields["firstname"]){
            formIsValid = false;
            errors["firstname"] = "* First Name is requierd";
         }
   
         if(typeof fields["firstname"] !== "undefined"){
            if(!fields["firstname"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["firstname"] = "Only letters";
            }        
         }

         //LastName
         if(!fields["lastname"]){
            formIsValid = false;
            errors["lastname"] = "* Last Name is requierd";
         }
   
         if(typeof fields["lastname"] !== "undefined"){
            if(!fields["lastname"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["lastname"] = "Only letters";
            }        
         }

         //NIC
         if(!fields["nic"]){
            formIsValid = false;
            errors["nic"] = "* NIC is requierd";
         } 
    
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

        //function for if email is already exist or not

         //Password
         if(!fields["pwrd"]){
            formIsValid = false;
            errors["pwrd"] = "* Please create a password for your account";
         }

         if (typeof fields["pwrd"] !== "undefined") {
            if(fields["pwrd"].length < 8){
                formIsValid = false;
                errors["pwrd"] = "To make strong password,Please add at least 8 charachter.";
            }
          }
      
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
     
    async signUp(e){
        e.preventDefault();
        let validated = await this.check();
        

        if(validated){
            await axios.post('http://localhost:5000/api/guests/registration', this.state.fields)
            .then(data => {
                return data
            }).then((data)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                })
                return data
            }).then((data)=>{
                if (data.data.err===0 && data.data.obj===true) {
                    this.setState({
                        ...this.state,
                        success: true,
                        loading: false
                    },
                    function(){alert(data.data.msg)}
                    )
                }else if (data.data.err===0 && data.data.obj===false) {
                    alert(data.data.msg);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                }else{
                    alert("Someting is wrong");
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                }
            }).catch(err => {
                console.log("ERR: " + err.message)
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            
        }else{
            console.log("error")
            this.setState({
                ...this.state,
                loading: false
            })
        }
        

        //  if(this.handleValidation()){
        //     HTTP.post('http://localhost:5000/api/guests/users/registration', this.state.fields)
        //     .then(data => {
        //       console.log("RESPONSE: " + JSON.stringify(data))
        //     })
        //     .catch(err => {
        //      console.log("ERR: " + err.message)
        //     })
        //     alert("SignUp is Success");
            
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
   
    render(){
        if (this.state.success) {
            return (
                <Redirect to="/signin" />
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
            return(
                <div>           
                    <form name="signupform" className="signupform" onSubmit= {this.signUp.bind(this)}>
    
                        <Container bg="white" w="80%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="14" marginBottom="14" borderRadius="lg">
                            <Heading margin="10">Create Account</Heading>
                            <Heading margin="10" fontSize="2xl">Personal Information</Heading>
                            <Stack spacing={5}>
                                <HStack>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<ViewIcon color="gray.300" />}
                                        />
    
                                        <Input  type="text" placeholder="First name" focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "firstname")} value={this.state.fields["firstname"]} />
                                    </InputGroup>
                                    <Text style={{color: "red"}}>{this.state.errors["firstname"]}</Text>
    
                    
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<ViewIcon color="gray.300" />}
                                        />
    
                                        <Input type="text" placeholder="Last Name"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "lastname")} value={this.state.fields["lastname"]} />
                                    </InputGroup>
                                    <Text style={{color: "red"}}>{this.state.errors["lastname"]}</Text>
    
                                </HStack>
                
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<AiFillIdcard color="gray.300" />}
                                    />
    
                                    <Input type="NIC" placeholder="NIC number" focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "nic")} value={this.state.fields["nic"]} />
                                </InputGroup>
                                <Text style={{color: "red"}}>{this.state.errors["nic"]}</Text>
    
                            </Stack>
                            <Heading margin="10" fontSize="2xl">Account Security</Heading>
                            <Stack spacing={5}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<EmailIcon color="gray.300" />}
                                    />
    
                                    <Input  placeholder="E-Mail"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                                </InputGroup>
                                <Text style={{color: "red"}}>{this.state.errors["email"]}</Text>
    
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<RiLock2Line color="gray.300" />}
                                    />
    
                                    <Input type="password" placeholder="Password"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "pwrd")} value={this.state.fields["pwrd"]}/>
                                </InputGroup>
                                <Text style={{color: "red"}}>{this.state.errors["pwrd"]}</Text>
    
                                <Button type="submit"className="button"  value="Register"  rightIcon={<ArrowRightIcon />} bgColor="#22543D" color="white" variant="solid" width="max-content" alignSelf="center">
    
                                    Create Account
                                </Button>
                            </Stack>
                        </Container>
    
                    </form>
                </div>
            )
        }
    }
}

  export default Signup;
  
