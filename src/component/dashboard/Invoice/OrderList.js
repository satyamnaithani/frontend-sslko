import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import InvoiceList from './InvoiceList'
import Sales from './Sales'

class OrderList extends Component {

  render() {
    return (
      <Box color="text.primary" mt={10} ml={3} mr={3}>
        <Grid container spacing={3}>
          {/* <InvoiceList/> */}
          <Sales/>
        </Grid>
      </Box>
    );
  }
}

export default OrderList;
