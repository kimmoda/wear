import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Container, Row, Col} from 'reactstrap';

import { addColors, toggleClassColor, ClearFilterColors, addMaxPrice, addMinPrice } from '../action.js'

 class Filters extends Component {

   getColors = () => {
     fetch(`http://api.shopstyle.com/api/v2/colors?pid=uid3204-40024198-72`, {
       method: 'get'
     }).then(response => {
       return response.json()
     }).then(
       data => {
        this.props.addColors(data.colors)
     })
   }

   componentDidMount() {
     this.getColors()
   }

   onClickFilterColor = (color) => {
     this.props.toggleClassColor(color)
   }

   setColors = (colors) => {
    return colors.map( color => {
      let colorClass = `filter__color filter__color--${color.name}`;
      if (this.props.toggledFilterClass.indexOf(color.name) >= 0) {
        colorClass = `filter__color filter__color--active filter__color--${color.name}`
      }
       return (
          <div key={color.id} className={colorClass} onClick={() => {this.onClickFilterColor(color.name)}}></div>
       )
     });
   }

   handleChangeMin = (e) => {
     this.props.addMinPrice(e.target.value);
   }

   handleChangeMax = (e) => {
     this.props.addMaxPrice(e.target.value);
   }

   clearColors = () => {
     this.props.ClearFilterColors();
   }

   render () {
     return (
      <div className="filter__wrap">
        <div className="filter">
          <h3 className="filter__title"> Colors</h3>
          <div className="filter__wrap-color">
            {this.setColors(this.props.colors)}
          </div>
          <Container>
            <Row>
              <Col>
                <div className="filter__button" onClick={this.clearColors}>Clear</div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="filter">
          <h3 className="filter__title"> Price range</h3>
          <div className="filter__wrap-slider">
            <Container>
                <Row>
                  <Col xs="6" sm="6" md="6" lg="6">
                    <label>Min</label>
                    <Input onChange={this.handleChangeMin} type="select" name="select" id="exampleSelect">
                      <option value="20">0 $</option>
                      <option value="21">10 $</option>
                      <option value="22">25 $</option>
                      <option value="23">50 $</option>
                      <option value="24">75 $</option>
                      <option value="25">100 $</option>
                      <option value="26">125 $</option>
                      <option value="27">150 $</option>
                      <option value="28">200 $</option>
                      <option value="39">250 $</option>
                      <option value="40">300 $</option>
                      <option value="31">350 $</option>
                      <option value="32">400 $</option>
                      <option value="33">500 $</option>
                      <option value="34">600 $</option>
                      <option value="35">700 $</option>
                      <option value="36">800 $</option>
                      <option value="37">900 $</option>
                      <option value="38">1000 $</option>
                      <option value="39">1250 $</option>
                      <option value="40">1500 $</option>
                      <option value="41">1750 $</option>
                      <option value="42">2000 $</option>
                      <option value="43">2250 $</option>
                      <option value="44">2500 $</option>
                      <option value="45">3000 $</option>
                      <option value="46">3500 $</option>
                      <option value="47">4000 $</option>
                      <option value="48">4500 $</option>
                    </Input>
                  </Col>
                  <Col xs="6" sm="6" sm="6" lg="6">
                    <label>Max</label>
                    <Input onChange={this.handleChangeMax} ref='max' type="select" name="select" id="exampleSelect">
                      <option value="49">+5000 $</option>
                      <option value="47">4500 $</option>
                      <option value="46">4000 $</option>
                      <option value="45">3500 $</option>
                      <option value="44">3000 $</option>
                      <option value="43">2500 $</option>
                      <option value="42">2250 $</option>
                      <option value="41">2000 $</option>
                      <option value="40">1750 $</option>
                      <option value="39">1500 $</option>
                      <option value="38">1250 $</option>
                      <option value="37">1000 $</option>
                      <option value="36">900 $</option>
                      <option value="35">800 $</option>
                      <option value="34">700 $</option>
                      <option value="33">600 $</option>
                      <option value="32">500 $</option>
                      <option value="31">400 $</option>
                      <option value="30">350 $</option>
                      <option value="29">300 $</option>
                      <option value="28">250 $</option>
                      <option value="27">200 $</option>
                      <option value="26">150 $</option>
                      <option value="25">125 $</option>
                      <option value="24">100 $</option>
                      <option value="23">75 $</option>
                      <option value="22">50 $</option>
                      <option value="21">25 $</option>
                      <option value="20">10 $</option>
                    </Input>
                  </Col>
                </Row>
                <div className="filter__wrap-button">
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="6">
                      <div className="filter__button filter__button--inverse" onClick={()=> {this.props.onSetPrice(this.props.minPrice, this.props.maxPrice)}}>Set</div>
                    </Col>
                    <Col xs="12" sm="12" sm="12" lg="6">
                    </Col>
                  </Row>
                </div>
              </Container>
          </div>
        </div>

      </div>
     )
   }
 }

 const mapDispact = (dispatch) => ({
   addColors: (colors) => dispatch(addColors(colors)),
   toggleClassColor: (color) => dispatch(toggleClassColor(color)),
   ClearFilterColors: () => dispatch(ClearFilterColors()),
   addMaxPrice: (maxPrice) => dispatch(addMaxPrice(maxPrice)),
   addMinPrice: (minPrice) => dispatch(addMinPrice(minPrice)),
 })

 const mapStateProps = (state) => (
   {
   inputValue: state.inputValue,
   products: state.products,
   colors: state.colors,
   filterColor: state.filterColor,
   toggledFilterClass: state.toggledFilterClass,
   maxPrice: state.maxPrice,
   minPrice: state.minPrice,
 })

  export default connect(mapStateProps, mapDispact)(Filters);
