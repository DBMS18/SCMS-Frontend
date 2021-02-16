
import { Container,Input,InputGroup,InputLeftElement,Stack} from "@chakra-ui/react";

import { Heading,Text } from "@chakra-ui/react";

import {ArrowRightIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { Component } from 'react';
import { RiLock2Line } from "react-icons/ri";
//import { Icon } from "@chakra-ui/react";
//import { MdSettings } from "react-icons/md";


class Signin extends Component{

    constructor(props){
        super(props);
   
        this.state = {
            fields: {},
            errors: {}
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
        
   
        this.setState({errors: errors});
        return formIsValid;
    }
     
    signIn(e){
         e.preventDefault();
   
         if(this.handleValidation()){
            alert("Sign In Success");
         }
   
     }
   
     handleChange(field, e){         
         let fields = this.state.fields;
         fields[field] = e.target.value;        
         this.setState({fields});
     }
    render(){
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

                        <Input placeholder="E-Mail"  focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
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

  export default Signin;
  
