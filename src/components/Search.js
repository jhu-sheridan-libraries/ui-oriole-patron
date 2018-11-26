import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { search } from '../actions'
import ResourceList from './ResourceList'

const mapStateToProps = (state, ownProps) => {
  let searchTerm = ''
  // maps the query parameter from route to props
  if (ownProps.location.search) {
    let params = qs.parse(ownProps.location.search)
    searchTerm = params.q;
  }
  return { searchTerm }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (props, query) => {
    // dispatch search for a new query
    if (query && query !== props.searchTerm) {
      dispatch(search({ query: query, page: 0 }))
    }
  }
})

const initialState = { searchTerm: '' }

class Search extends Component {
  constructor(props) {
    super(props)
    if (props.searchTerm) {
      this.state = { ...initialState, searchTerm: props.searchTerm }
    } else {
      this.state = initialState
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm) {
      this.setState({ searchTerm: nextProps.searchTerm })
    }
  }

  handleClick = (e) => {
    this.props.handleSearch(this.props, this.state.searchTerm.trim())
  }

  handleSearchBoxKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSearch(this.props, this.state.searchTerm.trim())
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    return (
      <div>
        <div className="container search-container">
          <div className="input-group">
            <input type="text" name="q" id="q" className="q form-control" placeholder="Search" autoComplete="off" autoFocus="autofocus" value={ this.state.searchTerm } onKeyPress={ this.handleSearchBoxKeyPress } onChange={ this.handleChange }/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary search-btn" id="search" onClick={ this.handleClick }>
                <span className="submit-search-text">Search</span>
              </button>
            </span>
          </div>
        </div>
        <div className="main-container">
          <ResourceList />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
