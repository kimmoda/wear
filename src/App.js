import './App.css';
import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';

// image
import Logo from './images/hypewear-logo.svg';

// components
import Search from './components/search';
import List from './components/list';
import ApiProducts from './components/api-products';
import FavoriteProducts from './components/favorite-products';

import { addSearch, addProducts, addFilterColor, addPricefilter, addToFavoriteList } from './action.js'
import { connect } from "react-redux"

import { Switch, Route, Link, withRouter } from 'react-router-dom'

class App extends Component {

  getProducts = () => {
    const priceFilter = (this.props.filterPrice.length ? `&fl=p${this.props.filterPrice.join(":")}` : "")
    console.log("API PRICE", priceFilter)
    const colors = this.props.toggledFilterClass;
    const search = [this.props.inputValue];
    const constructedFilters = [...search, ...colors]
    fetch(`http://api.shopstyle.com/api/v2/products?pid=uid3204-40024198-72&fts=${constructedFilters.join('+')}${priceFilter}&limit=50`, {
      method: 'get'
    }).then(response => {
      return response.json()
    }).then(
      data => {
      this.props.addProducts(data.products)
    })
  }

  componentDidMount() {
    this.getProducts("men")
  }

  colorPropsChanged(prevProps) {
    return this.props.toggledFilterClass !== prevProps.toggledFilterClass
  }

  searchQueryChanged(prevProps) {
    return this.props.inputValue !== prevProps.inputValue
  }

  filterPriceQueryChanged(prevProps) {
    return this.props.filterPrice !== prevProps.filterPrice
  }

  componentDidUpdate (prevProps) {
    if(
      this.colorPropsChanged(prevProps)
      || this.searchQueryChanged(prevProps)
      || this.filterPriceQueryChanged(prevProps)
    ){
      this.getProducts();
    }
  }

  onSearch = (value) => {
    this.props.addSearch(value);
  }

  onSetPrice = (min, max) => {
    this.props.addPricefilter(min, max)
  }

  onSetFavoriteList = (product) => {
    this.props.addToFavoriteList(product)
  }

  onSetRoute = () => {
    return (
      <Switch>
        <Route exact path='/'
          render={() =><ApiProducts onSetPrice={this.onSetPrice} getProducts={this.getProducts} onSetFavoriteList={this.onSetFavoriteList}/>}/>
        <Route path='/favorite-list' component={FavoriteProducts} />
      </Switch>
    )
  }

  render() {
    if (this.props.products.length) return (
      <div>
        <header className="header">
          <Container className="header__container">
              <Row>
                <Col xs="8" sm="8" md="3" lg="2">
                  <div className="flex-center">
                    <Link to='/'>
                      <img className="logo__image" src={Logo}></img>
                    </Link>
                  </div>
                </Col>
                <Col xs="4" sm="4" md="2" lg="2" className="menu">
                  <Link className="menu__link" to='/favorite-list'>Favorite List</Link>
                </Col>
                <Col xs="12" sm="12" md="7" lg="8">
                  <Search onSearch={this.onSearch} />
                </Col>
              </Row>
          </Container>
        </header>
        <div className="bg">
          <h2 className="page__title text-center">Hypewear is the best search engine for fashion ;)</h2>
        </div>
        <Route exact path='/'
          render={() =><ApiProducts onSetPrice={this.onSetPrice} getProducts={this.getProducts} onSetFavoriteList={this.onSetFavoriteList}/>}/>
        <Route path='/favorite-list' component={FavoriteProducts} />
      </div>
    );
    return (
      <div className="loader">
        <div className="loader__caption">
          <img className="logo__image" src={Logo}></img>
          <p className="loader__text">is loading...</p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSearch: (inputValue) => dispatch(addSearch(inputValue)),
  addProducts: (products) => dispatch(addProducts(products)),
  addPricefilter: (min, max) => dispatch(addPricefilter(min, max)),
  addToFavoriteList: (product) => dispatch(addToFavoriteList(product)),
})

const mapStateProps = (state) => ({
  inputValue: state.inputValue,
  products: state.products,
  colors: state.colors,
  filterColor: state.filterColor,
  toggledFilterClass: state.toggledFilterClass,
  filterPrice: state.filterPrice,
  favoriteProducts: state.favoriteProducts,
})

 export default withRouter(connect(mapStateProps, mapDispatchToProps)(App));
