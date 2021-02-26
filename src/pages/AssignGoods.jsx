import React from 'react';
import { Center, Image, Select, useDisclosure } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "@chakra-ui/react";
import { Container,Box } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {Button,Text} from "@chakra-ui/react"
import { Flex,Spacer} from "@chakra-ui/react"


const trainrows = [
  {train:"ABCD",city: "Colombo", time:"8.00"},
  {train:"ABCD",city: ["Colombo"," Galle"], time:"8.00"},
  {train:"ABCD",city: "Colombo", time:"8.00"},
  {train:"ABCD",city: "Colombo", time:"8.00"},
  {train:"ABCD",city: "Colombo", time:"8.00"}
];

const orderrows = [
  {order:"ABCD",city: "Colombo", availabletrains:["ABCD","FGHI"]},
  {order:"ABCD",city: "Colombo", availabletrains:["8.00"]},
  {order:"ABCD",city: "Colombo", availabletrains:["8.00"]},
  {order:"ABCD",city: "Colombo", availabletrains:["8.00"]},
];

const MakeItem = function(X) {
  return <option>{X}</option>;
};



     

export default function AssignGoods() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [train,setTrain] = React.useState("");

  
  const assignToTrain=(e)=>{
      alert(setTrain)
  }
  
  return (
<Container >
<Heading color="black" p={4}>Train Schedule</Heading>
        <Box bg="white" p={4} color="black" border="2px" borderColor="gray.300" marginTop="10" borderRadius="lg">
  <Table variant="striped" colorScheme="green" >
        <Thead>
          <Tr>
            <Th align="right">Train</Th>
            <Th align="right">Cities</Th>
            <Th align="right">Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {trainrows.map((row1) => (
            <Tr >
              
              <Td align="right">{row1.train}</Td>
              <Td align="right">{row1.city}</Td>
              <Td align="right">{row1.time}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table> 
</Box>    
      <Heading color="black" p={4} marginTop="10">Assign Orders to Train</Heading>
      
      <Box bg="white" w="100%" p={4} color="black" border="2px" borderColor="gray.300" marginTop="10" borderRadius="lg" marginBottom="20%">
      <Table variant="striped" colorScheme="green"> 
        <Thead>
          <Tr>
            <Th align="right" >Order</Th>
            <Th align="right" >City</Th>
            <Th align="right" >Available Trains</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderrows.map((row2) => (
            <Tr >
              <Td align="right">{row2.order}</Td>
              <Td align="right">{row2.city}</Td>
              <Td align="right"><Select bgColor="green.400" placeholder="Select Train" value={train} onChange={e => setTrain(e.target.value)}>{row2.availabletrains.map(MakeItem)}</Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
      </Container>
  );
}
