import React, { Component } from 'react';
import ListItem from './list-item'

import { Row } from 'reactstrap';
import { connect } from "react-redux"

 class List extends Component {

   getProduct = (products) => {
    return products.map( product => {
       return (
          <ListItem onSetFavoriteList={this.props.onSetFavoriteList} key={product.id} item={product}/>
       )
     });
   }

   render () {
     return (
        <Row noGutters={true}>
          {this.getProduct(this.props.products)}
        </Row>
       )
   }
 }

 const mapStateProps = (state) => ({
   inputValue: state.inputValue,
   products: state.products,
 })


  export default connect(mapStateProps, null)(List);
