import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { Button, Container, Input, InputGroup } from 'reactstrap'
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
        <Container>
          <InputGroup>
            <Input placeholder="Search" name="q" id="q" autoComplete="off" autoFocus="autofocus" onKeyPress={ this.handleSearchBoxKeyPress } onChange={ this.handleChange } value={ this.state.searchTerm } />
            <Button color="primary" id="search" className="search-btn" onClick={ this.handleClick }>Search</Button> 
          </InputGroup>
        </Container>
        <Container className="main-container">
          <ResourceList />
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
