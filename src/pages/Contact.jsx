import { ChakraProvider } from "@chakra-ui/react";
import { Container,Input,InputGroup,InputLeftElement,Stack} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import {ArrowRightIcon,ViewIcon,PhoneIcon,EmailIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
//import { Icon } from "@chakra-ui/react";
//import { MdSettings } from "react-icons/md";


const Contact = ()=>{
    return(
      <ChakraProvider>
        <Container bg="white" w="80%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="14" marginBottom="14" borderRadius="lg">
        <Heading margin="10">Contact Us</Heading>
        <Stack spacing={5}>

            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<ViewIcon color="gray.300" />}
                />
                <Input type="text" placeholder="Your Name" focusBorderColor="#22543D"  />
            </InputGroup>

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
                    children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Contact Number" focusBorderColor="#22543D"  />
            </InputGroup>

            <Textarea 
                focusBorderColor="#22543D"
                placeholder="Your Message/Suggesion/complain" />
            <Button rightIcon={<ArrowRightIcon />} bgColor="#22543D" color="white" variant="solid" width="max-content" alignSelf="center">
                Submit
            </Button>
        </Stack>
        </Container>

      </ChakraProvider>


    )
  }

  export default Contact;