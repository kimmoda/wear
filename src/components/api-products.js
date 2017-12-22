import React, { Component } from 'react';
import List from './list'

import { Row , Container, Col} from 'reactstrap';
import Filters from './filters';

import { withRouter } from 'react-router-dom';

 class ApiProducts extends Component {

   render () {
     console.log("PROPS", this.props)
     return (
       <Container fluid={true}>
           <Row noGutters={true}>
             <Col className="background__light-grey" xs="12" sm="12" md="4" lg="2">
               <Filters onSetPrice={this.props.onSetPrice} getProducts={this.props.getProducts}/>
             </Col>
             <Col className="background__light-grey" xs="12" sm="12" sm="8" lg="10">
               <List onSetFavoriteList={this.props.onSetFavoriteList}/>
             </Col>
           </Row>
         </Container>
       )
   }
 }

export default withRouter(ApiProducts);
