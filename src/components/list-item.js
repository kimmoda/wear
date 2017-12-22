import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Modal from 'react-modal';
import CloseIcon from '../images/close.png';
import { connect } from "react-redux";

 class ListItem extends Component {

   constructor() {
     super();

     this.state = {
       modalIsOpen: false
     };

     this.openModal = this.openModal.bind(this);
     this.afterOpenModal = this.afterOpenModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
   }

   openModal = () => {
     this.setState({modalIsOpen: true});
   }

   afterOpenModal = () => {
   }

   closeModal = () => {
     this.setState({modalIsOpen: false});
   }

   checkSale = (sale) => {
     if (sale) {
       return (
         <h5>
           <small className="product__price--sale">{this.props.item.priceLabel}</small>  {this.props.item.salePriceLabel}
         </h5>
       )
     }
     return <h5>{this.props.item.priceLabel}</h5>
   }

   addSaleRibbon = (sale) => {
     if (sale) {
       return (
        <div className="product__ribbon">
          <span className="product__ribbon-text">
            sale {this.props.item.discount}%
          </span>
        </div>
       )
     }
     return
   }

   AddToFavoriteBanner = (product) => {
     let selectedClass = `product__selected`;
     if (this.props.favoriteProductsId.indexOf(product.id) >= 0) {
       selectedClass = `product__selected product__selected--active`
     }
     return (
      <div className={selectedClass}>Favorite</div>
     )
   }

   addSizes = (sizes) => {
     if (sizes.length) {
       return sizes.map((size) => {
         return (
           <div key={size.name} className="modal__size">{size.name}</div>
         )
       });
     }
   }

   addTitleSizes = (sizes) => {
     if (sizes.length) {
       return (
         <h5 className="modal__subtitle">Available sizes</h5>
       )
     }
   }

   render () {
     return (
       <Col xs="12" sm="12" sm="4" lg="2">
         <div className="product">
           {this.addSaleRibbon(this.props.item.discount)}
           <div onClick={this.openModal} className="product__wrap-img">
             {this.AddToFavoriteBanner(this.props.item)}
             <img className="product__img" src={this.props.item.image.sizes.Original.url}/>
           </div>
           <div className="product__caption">
             <p className="product__name">{this.props.item.name}</p>
             {this.checkSale(this.props.item.salePriceLabel)}
             <div className="product__actions">
               <a className="product__button" target="_blank" onClick={() => {this.props.onSetFavoriteList(this.props.item)}}>Add to list</a>
               <a className="product__button product__button--buy" target="_blank" href={this.props.item.clickUrl}>Buy now</a>
             </div>
           </div>
         </div>
         <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           contentLabel="Example Modal"
         >
           <Container>
               <Row>
                 <Col xs="12" sm="12" md="4" lg="4">
                   <div className="flex-center">
                     <div className="modal__wrap-img">
                       <img className="modal__img" src={this.props.item.image.sizes.Original.url}/>
                       {this.AddToFavoriteBanner(this.props.item)}
                     </div>
                   </div>
                 </Col>
                 <Col xs="12" sm="12" md="8" lg="8">
                   <div className="flex-center">
                     <div>
                       <h2 className="modal__title" ref={subtitle => this.subtitle = subtitle}>{this.props.item.name}</h2>
                       {this.checkSale(this.props.item.salePriceLabel)}
                       <Row>
                         <Col xs="6" sm="6" md="6" lg="6">
                           <a className="filter__button" target="_blank" onClick={() => {this.props.onSetFavoriteList(this.props.item)}}>Add to list</a>
                         </Col>
                         <Col xs="6" sm="6" md="6" lg="6">
                           <a className="filter__button filter__button--inverse" target="_blank" href={this.props.item.clickUrl}>Buy now</a>
                         </Col>
                       </Row>
                       {this.addTitleSizes(this.props.item.sizes)}
                       {this.addSizes(this.props.item.sizes)}
                       <p className="modal__description">{this.props.item.description}</p>
                     </div>
                   </div>
                 </Col>
               </Row>
           </Container>
           <div onClick={this.closeModal}>
             <img className="modal__close" src={CloseIcon}></img>
           </div>
         </Modal>

       </Col>
     )
   }
 }

 const mapStateProps = (state) => (
   {
   favoriteProducts: state.favoriteProducts,
   favoriteProductsId: state.favoriteProductsId,
 })

 export default connect(mapStateProps, null)(ListItem);
