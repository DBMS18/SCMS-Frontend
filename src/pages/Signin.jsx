
import { Container,Input,InputGroup,InputLeftElement,Stack} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {ArrowRightIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { Component } from 'react';
import { RiLock2Line } from "react-icons/ri";
//import { Icon } from "@chakra-ui/react";
//import { MdSettings } from "react-icons/md";


class Signin extends Component{
    render(){
        return(
            <Container bg="white" w="80%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="14" marginBottom="14" borderRadius="lg">
                <Heading margin="10">Sign in</Heading>
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
                        Sign in
                    </Button>
                </Stack>
            </Container>
        )
    }
}

  export default Signin;
  
