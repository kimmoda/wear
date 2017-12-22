import React, { Component } from 'react';
import FavoriteItem from './favorite-item'

import { Row, Container } from 'reactstrap';
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";

 class FavoriteProducts extends Component {

   getFavouriteProduct = (products) => {
    return products.map( product => {
      return (
         <FavoriteItem key={product.id} item={product}/>
      )
     });
   }

   render () {
     return (
       <Container className="background__light-grey" fluid={true}>
         <h2 className="page__subtitle text-center">Favorite Products</h2>
         <Row noGutters={true}>
           {this.getFavouriteProduct(this.props.favoriteProducts)}
         </Row>
       </Container>
       )
   }
 }

const mapStateProps = (state) => ({
  favoriteProducts: state.favoriteProducts,
})


export default withRouter(connect(mapStateProps)(FavoriteProducts));
