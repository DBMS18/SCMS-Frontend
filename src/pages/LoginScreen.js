/* eslint-disable jsx-a11y/anchor-is-valid */
import{Input, Stack,Button,InputGroup, Box
,Divider, FormControl,Flex,Heading ,Text} from '@chakra-ui/react';
import React from "react"

const LoginScreen=()=>{
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    alert(`
    Email: ${email}
    Password: ${password}
  `)
    this.setState({
      email:'',
      password:''
    })
    
    event.preventDefault();
  }

 

    return(
        <Flex width="Full" align="center" justifyContent="center">
        <Box p={8} maxWidth="95%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="blueGreen.100">
        <Box textAlign="center" color="blueGreen.100" textStyle="h1">
            <Heading> Login </Heading>
        </Box>
        <Box my={4} textAlign="left">
       <form action='submit' onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <FormControl isRequired>
                    <InputGroup>
                        
                        <Input type='email' placeholder='Enter email' bg="white.100" color="black.600" borderColor="blueGreen.100" value={email}
          onChange={e => setEmail(e.target.value)} />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        
                        <Input type='password' aria-label='password' placeholder='Enter Password' bg="white.100" color="black.600" borderColor="blueGreen.100" value={password}
          onChange={e => setPassword(e.target.value)}/>
                    </InputGroup>
                </FormControl>
             
                <Divider/>
                
                <Button type='submit' variant='solid' boxShadow='sm'_hover={{boxShadow:'md'}} bg="black.500" >
                    Log In!</Button> 

            </Stack>
        <Text textStyle="h2" color="blue.100">
            <br/>
            <a href="#">Create New Account</a>
        </Text>
      </form>
        
        </Box>
        </Box>
        </Flex>
    );
}

export default LoginScreen;