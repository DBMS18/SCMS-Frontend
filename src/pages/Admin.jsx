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
import axios from 'axios';
import { Box, Center, Spinner} from "@chakra-ui/react"

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
           mostOrders:{},
           customerOrderReport:{},
           salesReport:{},
           quarterlySalesReport:{},
           driverHours:{},
           assistantHours:{},
           truckHours:{},
           loading: true
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/api/admins/most-order', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        mostOrders: data.data.obj
                    })
                    
                }else{
                   this.setState({
                        ...this.state,
                        mostOrders: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })
         
        await axios.get('http://localhost:5000/api/admins/customer-order-report', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        customerOrderReport: data.data.obj
                    })
                    
                }else{
                   this.setState({
                        ...this.state,
                        customerOrderReport: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })

         await axios.get('http://localhost:5000/api/admins/sales-report', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        salesReport: data.data.obj
                    })
                  
                }else{
                   this.setState({
                        ...this.state,
                        salesReport: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })
         await axios.get('http://localhost:5000/api/admins/driver-Working', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        driverHours: data.data.obj
                    })
                   
                }else{
                   this.setState({
                        ...this.state,
                        driverHours: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })
         await axios.get('http://localhost:5000/api/admins/assistant-Working', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        assistantHours: data.data.obj
                    })
                    
                }else{
                   this.setState({
                        ...this.state,
                        assistantHours: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })
          await axios.get('http://localhost:5000/api/admins/truck-Working', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        truckHours: data.data.obj
                    })
                    
                }else{
                   this.setState({
                        ...this.state,
                        truckHours: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })
         await axios.get('http://localhost:5000/api/admins/quarterlySales-report', null)
         .then(data => {
             
             if (data.data.err===0) {
                    this.setState({
                        ...this.state,
                        quarterlySalesReport: data.data.obj
                    })
                    
                }else{
                   this.setState({
                        ...this.state,
                        quarterlySalesReport: null
                    }) 
                }
         }).catch(err => {
                console.log("ERR: " + err.message)
         })


         this.setState({
                ...this.state,
                loading: false
        })


    }

    render(){
        console.log(this.state.loading);
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
            if(this.state.mostOrders){
            var mostOrderList=this.state.mostOrders.map((order,i)=>{
                
                return(
                    <Tr>
                        <Td>{order.product_id}</Td>
                        <Td>{order.type}</Td>
                        <Td>{order.total_order}</Td>
                        
                    </Tr>
                );
            });
            }
            if(this.state.customerOrderReport){
            var customerOrderReportList=this.state.customerOrderReport.map((order,i)=>{
                
                return(
                    <Tr>
                        <Td>{order.first_name}</Td>
                        <Td>{order.last_name}</Td>
                        <Td>{order.paid_amount}</Td>
                        <Td>{order.ordered_date}</Td>
                        
                    </Tr>
                );
            });
            }
            if(this.state.salesReport){
            var salesReportList=this.state.salesReport.map((order,i)=>{
                
                return(
                    <Tr>
                        <Td>{order.city}</Td>
                        <Td>{order.total_amount}</Td>
                        <Td>{order.route_name}</Td>
                        <Td>{order.total_sale}</Td>
                        
                    </Tr>
                );
            });
            }
            if(this.state.driverHours){
            var driverHoursList=this.state.driverHours.map((obj,i)=>{
                
                return(
                    <Tr>
                        <Td>{obj.driver_name}</Td>
                        <Td>{obj.worked_hours}</Td>
                        
                    </Tr>
                );
            });
            }
            if(this.state.assistantHours){
            var assistantHoursList=this.state.assistantHours.map((obj,i)=>{
                
                return(
                    <Tr>
                        <Td>{obj.assistant_name}</Td>
                        <Td>{obj.worked_hours}</Td>
                        
                    </Tr>
                );
            });
            }
            if(this.state.truckHours){
            var truckHoursList=this.state.truckHours.map((obj,i)=>{
                
                return(
                    <Tr>
                        <Td>{obj.truck_number}</Td>
                        <Td>{obj.worked_hours}</Td>
                        
                    </Tr>
                );
            });
            }
            if(this.state.quarterlySalesReport){
            var quarterlySalesReportList=this.state.quarterlySalesReport.map((obj,i)=>{
                
                return(
                    <Tr>
                        <Td>{obj.unit_price}</Td>
                        <Td>{obj.type}</Td>
                        <Td>{obj.total_orders}</Td>
                        <Td>{obj.total_ordered_quantity}</Td>
                        <Td>{obj.total_sale}</Td>
                        
                    </Tr>
                );
            });
            }




        return(
            <>
            <div>
            Admin
            </div>

            <div>
                <Table size="sm" variant="striped" colorScheme="red">
                    <TableCaption placement="top">Items with Most Orders</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Product ID</Th>
                        <Th>Product Type</Th>
                        <Th>Total Order</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {mostOrderList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>

            <div>
                <Table size="sm" variant="striped" colorScheme="blue">
                    <TableCaption placement="top">Customer -order report</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Paid Amount</Th>
                        <Th>date of Order</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {customerOrderReportList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>


            <div>
                <Table size="sm" variant="striped" colorScheme="blue">
                    <TableCaption placement="top">sales report</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>City</Th>
                        <Th>Total Amount</Th>
                        <Th>Route Name</Th>
                        <Th>Total Sales</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {salesReportList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>

             <div>
                <Table size="sm" variant="striped" colorScheme="blue">
                    <TableCaption placement="top">Driver Working Hours</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Driver Name</Th>
                        <Th>worked Hours</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {driverHoursList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>

            <div>
                <Table size="sm" variant="striped" colorScheme="blue">
                    <TableCaption placement="top">Assistant Working Hours</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Assistant Name</Th>
                        <Th>Assistant Hours</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {assistantHoursList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>
            <div>
                <Table size="sm" variant="striped" colorScheme="blue">
                    <TableCaption placement="top">Truck Used Hours</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Truck Number</Th>
                        <Th>Truck Used  Hours</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {truckHoursList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>
            <div>
                <Table size="sm" variant="striped" colorScheme="blue">
                    <TableCaption placement="top">Quarterly Sales Report</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Unit Price</Th>
                        <Th>Type</Th>
                        <Th>Total Orders</Th>
                        <Th>Total ordered Quntity</Th>
                        <Th>Total Sale</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {quarterlySalesReportList}
                    </Tbody>
                    <Tfoot>
                    </Tfoot>
                </Table>
            </div>

            </>
        );
        }
    }
}
export default Admin;