import React from 'react';
import { Link } from "react-router-dom";
import { Text } from '@chakra-ui/react';

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
      <Text
        mb={{ base: isLast ? 0 : 8, sm: 0 }}
        mr={{ base: 0, sm: isLast ? 0 : 8 }}
        display="block"
        {...rest}
      >
        <Link to={to}>{children}</Link>
      </Text>
    );
  };

export default MenuItem;