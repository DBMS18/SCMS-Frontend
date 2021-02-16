
import { Container,Input,InputGroup,InputLeftElement,Stack, HStack} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {ArrowRightIcon,ViewIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { Component } from 'react';
import { AiFillIdcard } from "react-icons/ai";
import { RiLock2Line } from "react-icons/ri";
//import { Icon } from "@chakra-ui/react";
//import { MdSettings } from "react-icons/md";


class Signup extends Component{
    render(){
        return(
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
                            <Input type="text" placeholder="First name" focusBorderColor="#22543D"  />
                        </InputGroup>
        
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<ViewIcon color="gray.300" />}
                            />
                            <Input type="text" placeholder="Last nmae"  focusBorderColor="#22543D" />
                        </InputGroup>
                    </HStack>
    
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AiFillIdcard color="gray.300" />}
                        />
                        <Input type="NIC" placeholder="NIC number" focusBorderColor="#22543D"  />
                    </InputGroup>
                </Stack>
                <Heading margin="10" fontSize="2xl">Account Security</Heading>
                <Stack spacing={5}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<EmailIcon color="gray.300" />}
                        />
                        <Input type="email" placeholder="E-Mail"  focusBorderColor="#22543D" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<RiLock2Line color="gray.300" />}
                        />
                        <Input type="password" placeholder="Password"  focusBorderColor="#22543D" />
                    </InputGroup>

                    <Button rightIcon={<ArrowRightIcon />} bgColor="#22543D" color="white" variant="solid" width="max-content" alignSelf="center">
                        Create Account
                    </Button>
                </Stack>
            </Container>
        )
    }
}

  export default Signup;
  
