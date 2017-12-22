import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { connect } from "react-redux"

export default class Search extends Component {

  check = (value, key) => {
    if (key === 13) {
      this.props.onSearch(value);
    }
  }

  onInputKeyUp = (e) => {
    this.check(e.target.value, e.keyCode);
  }

  render () {
    // console.log("asdasdasd", this.props);
    return (
      <div className="search">
          <Input
            type="text"
            name="email"
            id="exampleEmail"
            ref="search"
            placeholder="type the search and press enter..."
            className="search__input"
            onKeyUp={this.onInputKeyUp}
          />
      </div>
    )
  }
}
