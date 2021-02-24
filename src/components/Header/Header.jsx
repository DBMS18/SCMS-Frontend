import React, { Component } from "react";
import Logo from "../../ui/Logo";
import { Box, Flex, Button} from "@chakra-ui/react";
import MenuItem from './MenuItem';

import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>Close</title>
      <path
        fill="white"
        d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
      />
    </svg>
  );
  
  const MenuIcon = () => (
    <svg
      width="24px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  );

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : false,
            user : localStorage.getItem('role'),
            isAdmin : false,
        }
        console.log("CON : "+ this.props.role)
        console.log("CON : "+ this.props.isAuthenticated)
    }

    componentDidMount() {
        console.log("CDM : "+ this.props.role)
        console.log("CDM : "+ this.props.isAuthenticated)
        console.log("CDM : "+ this.props.token)
        console.log("CDM : "+ this.state.user !== "customer")
        console.log("CDM : "+ this.state.user !=="guest")
        console.log("CDM : "+ localStorage.getItem('role'))
        console.log("CDM : "+ localStorage.getItem('token'))
        console.log(this.state.user)
        if (this.state.user !== "customer" && this.state.user !== "guest") {
            console.log("object11")
            this.setState({
                ...this.state,
                isAdmin: true,
            })
        }else{
            console.log("object2")
            this.setState({
                ...this.state,
                isAdmin: false,
            })
        }
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("preProps"+ JSON.stringify(prevProps))
        console.log("curProps"+ JSON.stringify(this.props))
        console.log("preState"+ JSON.stringify(prevState))
        console.log("curState"+ JSON.stringify(this.state))
        if (prevProps.isAuthenticated === false & this.props.isAuthenticated === true) {
            if (this.state.user !== "customer" && this.state.user !== "guest") {
                console.log("object11")
                this.setState({
                    ...this.state,
                    isAdmin: true,
                })
            }else{
                console.log("object2")
                this.setState({
                    ...this.state,
                    isAdmin: false,
                })
            }
        }
    }
    

    toggleMenu = () => {
        if (this.state.show) {
            this.setState(
                {
                    show : false
                }
            )
        }else{
            this.setState(
                {
                    show : true
                }
            )
        }
    }

    handleEvent(){
        this.setState({
            ...this.state,
            isAdmin:false,
            user:"guest"
        })
    }

    render(){
        console.log("render : " + this.props.role)
        console.log("render : " + this.props.isAuthenticated)
        console.log("render : " + this.props.token)
        const customerHeader = <Flex
            borderBottom="2px"
            borderColor="green.200"
            fontSize="xl"
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            color={["white", "white", "primary.700", "primary.700"]}
            {...this.props}
        >
            <Flex
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <Logo
                    border="1px"
                    w="100px"
                    color={["white", "white", "primary.500", "primary.500"]} />
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={this.toggleMenu}>
                {this.state.show ? <CloseIcon /> : <MenuIcon />}
            </Box>

            <Box
                display={{ base: this.state.show ? "block" : "none", md: "block" }}
                flexBasis={{ base: "100%", md: "auto" }}
            >
                <Flex
                    align="center"
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    direction={["column", "row", "row", "row"]}
                    pt={[4, 4, 0, 0]}
                    fontSize="xl"
                >   

                    {localStorage.getItem('role') === "guest" || localStorage.getItem('role') === "customer" ? 
                            (
                                <>
                                    <MenuItem to="/">Home</MenuItem>
                                    <MenuItem to="/store">Store </MenuItem>
                                    <MenuItem to="/about">About </MenuItem>
                                    <MenuItem to="/contact">Contact </MenuItem>
                                    {localStorage.getItem('role') === "guest" ? 
                                        <div></div> 
                                        : 
                                            <>
                                                <MenuItem to="/cart">
                                                    <Button
                                                        size="sm"
                                                        fontSize="xl"
                                                        rounded="md"
                                                        color={["primary.500", "primary.500", "white", "white"]}
                                                        bg={["white", "white", "primary.500", "primary.500"]}
                                                        _hover={{
                                                            bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                                                        }}
                                                    >
                                                        Cart
                                                    </Button>
                                                </MenuItem>
                                                <MenuItem to="/notification">
                                                    <Button
                                                        size="sm"
                                                        fontSize="xl"
                                                        rounded="md"
                                                        color={["primary.500", "primary.500", "white", "white"]}
                                                        bg={["white", "white", "primary.500", "primary.500"]}
                                                        _hover={{
                                                            bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                                                        }}
                                                    >
                                                        Notification
                                                    </Button>
                                                </MenuItem>
                                            </>
                                    }
                                    
                                    {localStorage.getItem('role') === "guest" ? 
                                        (
                                            <>
                                                <MenuItem to="/signin">
                                                    <Button
                                                        size="sm"
                                                        fontSize="xl"
                                                        rounded="md"
                                                        color={["primary.500", "primary.500", "white", "white"]}
                                                        bg={["white", "white", "primary.500", "primary.500"]}
                                                        _hover={{
                                                            bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                                                        }}
                                                    >
                                                        Sign in
                                                    </Button>
                                                </MenuItem>
                                                <MenuItem to="/signup" isLast>
                                                    <Button
                                                        size="sm"
                                                        fontSize="xl"
                                                        rounded="md"
                                                        color={["primary.500", "primary.500", "white", "white"]}
                                                        bg={["white", "white", "primary.500", "primary.500"]}
                                                        _hover={{
                                                            bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                                                        }}
                                                    >
                                                        Create Account
                                                    </Button>
                                                </MenuItem>
                                            </>
                                        ) : (
                                            <MenuItem to="/signout">
                                                <Button
                                                    onClick={this.handleEvent.bind(this)}
                                                    size="sm"
                                                    fontSize="xl"
                                                    rounded="md"
                                                    color={["primary.500", "primary.500", "white", "white"]}
                                                    bg={["white", "white", "primary.500", "primary.500"]}
                                                    _hover={{
                                                        bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                                                    }}
                                                >
                                                    Sign out
                                                </Button>
                                            </MenuItem>
                                        )
                                    }
                                </>
                            )
                        : 
                            (
                                <>
                                    <MenuItem to="/signout">
                                        <Button
                                            onClick={this.handleEvent.bind(this)}
                                            size="sm"
                                            fontSize="xl"
                                            rounded="md"
                                            color={["primary.500", "primary.500", "white", "white"]}
                                            bg={["white", "white", "primary.500", "primary.500"]}
                                            _hover={{
                                                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                                            }}
                                        >
                                            Sign out
                                        </Button>
                                    </MenuItem>
                                </>
                            )
                    }
                    
                </Flex>
            </Box>
        </Flex>;

        
            console.log("isauth" + this.props.isAuthenticated);
        console.log("token" + this.props.token);
        console.log("user" + this.props.role);
        console.log("is ADMIN"+this.state.isAdmin)
            if (!this.state.isAdmin) {
                console.log("object customer")
                return(
                    customerHeader
                );
            }else {
                return(<div></div>);
            }
              
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined),
        token : state.token,
        role : state.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);