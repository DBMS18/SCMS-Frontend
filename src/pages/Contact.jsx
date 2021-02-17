import * as React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { Container,Input,InputGroup,InputLeftElement,Stack} from "@chakra-ui/react";
import { Heading,Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import {ArrowRightIcon,ViewIcon,PhoneIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";


class Contact extends React.Component {
  constructor(props){
     super(props);

     this.state = {
         fields: {
            name:'',
            email:'',
            contact:'',
            msg:'',
         },
         errors: {
            name:'',
            email:'',
            contact:'',
            msg:'',
         }
     }
  }

  handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      //Name
      if(!fields["name"]){
         formIsValid = false;
         errors["name"] = "* Name cannot be empty";
      }

      if(typeof fields["name"] !== "undefined"){
         if(!fields["name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["name"] = "Only letters";
         }        
      }
 
      //Email
      if(!fields["email"]){
         formIsValid = false;
         errors["email"] = "* Email cannot be empty";
      }

      if(typeof fields["email"] !== "undefined"){
         let lastAtPos = fields["email"].lastIndexOf('@');
         let lastDotPos = fields["email"].lastIndexOf('.');

         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "* Email is not valid";
          }
     }
     
     //Message
     if(!fields["msg"]){
      formIsValid = false;
      errors["msg"] = "* Message cannot be empty";
   }
     

   this.setState({
    ...this.state,
    errors: errors,
  });
     return formIsValid;
 }
  
 contactSubmit(e){
      e.preventDefault();

      if(this.handleValidation()){
         alert("Form submitted");
      }

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
      return (
          <div>           
             <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                  
                <ChakraProvider>
        <Container bg="white" w="80%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="14" borderRadius="lg">
        <Heading margin="10">Contact Us</Heading>
        <Stack spacing={5}>

            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<ViewIcon color="gray.300" />}
                />
                <Input name="name" type="text" placeholder="Your Name" focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
            </InputGroup>
            <Text color="red" alignContent="left">{this.state.errors["name"]}</Text>

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
                    children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Contact Number (Optional)" focusBorderColor="#22543D" onChange={this.handleChange.bind(this, "contact")} value={this.state.fields["contact"]} />
            </InputGroup>

            <Textarea 
                focusBorderColor="#22543D"
                placeholder="Your Message/Suggesion/complain" onChange={this.handleChange.bind(this, "msg")} value={this.state.fields["msg"]}/>
            <Text style={{color: "red"}}>{this.state.errors["msg"]}</Text>
            <Button type="submit"className="button"  value="Register" rightIcon={<ArrowRightIcon />} bgColor="#22543D" color="white" variant="solid" width="max-content" alignSelf="center">Submit</Button>
            
        </Stack>
        </Container>

      </ChakraProvider>
            </form>
          </div>
    )
  }
}

export default Contact;