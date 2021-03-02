import React, { Component } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { Progress } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"

class Storekeeper extends Component {
    state = {  }
    render() {
        return (
            <>
            <div>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={2} h="10">
                    Store:
                    <Input size="sm" variant="filled" placeholder="Horana" isReadOnly='true' /></GridItem>

                <GridItem colStart={4} colEnd={6} h="10">
                    Store Manager:
                    <Input size="sm" variant="filled" placeholder="Thrainda" isReadOnly='true' />
                </GridItem>
            </Grid>  
            </div>
            <br/>
            
            
            <Table variant="striped" colorScheme="red">
                <TableCaption>Products waiting to be recieved</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Product ID</Th>
                    <Th>Product Type</Th>
                    <Th>Customer Name</Th>
                    <Th>Select</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    <Td><Checkbox /></Td>
                    </Tr>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    <Td><Checkbox /></Td>
                    </Tr>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    <Td><Checkbox /></Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    <Td><Checkbox/></Td>
                    </Tr>
                </Tfoot>
            </Table>
                <br/>
                <Button colorScheme="blue">Recieved to Store</Button>
                <br/>
                <br/>
                <Progress size="xs" isIndeterminate />
                <br/>

            <Table variant="striped" colorScheme="blue">
                <TableCaption>Products waiting to be recieved</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Product ID</Th>
                    <Th>Product Type</Th>
                    <Th>Customer Name</Th>
                    
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    
                    </Tr>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    
                    </Tr>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Td>110011</Td>
                    <Td>sofa</Td>
                    <Td>Tharinda</Td>
                    
                    </Tr>
                </Tfoot>
            </Table>
            </>
        );
    }
}

export default Storekeeper;