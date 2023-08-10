import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { debounce } from 'throttle-debounce'
import { Container, Input, InputGroup } from 'reactstrap'
import { search } from '../actions'
import ResourceList from './ResourceList'
import TagList from "./TagList";

const mapStateToProps = (state, ownProps) => {
  let searchTerm = ''
  // maps the query parameter from route to props
  if (ownProps.location && ownProps.location.search) {
    let params = qs.parse(ownProps.location.search)
    searchTerm = params.q;
  }
  return { searchTerm }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (props, query) => {
    // dispatch search for a new query
    if (query && query !== props.searchTerm) {
      dispatch(search({ query: query }))
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
    this.autoCompleteThrottled = debounce(500, props.handleSearch)
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
    this.setState({ searchTerm: e.target.value }, () => {
      this.autoCompleteThrottled(this.props, this.state.searchTerm)
    })
  }

  render() {
    return (
      <div>
        <Container className="main-container">
            <InputGroup id="SearchBox">
              <label htmlFor="q" hidden>Search: </label>
              <Input placeholder="e.g., type 'P' to browse databases beginning with P, start typing a database name, or enter a keyword" name="q" id="q" autoComplete="off" autoFocus="autofocus" onKeyPress={ this.handleSearchBoxKeyPress } onChange={ this.handleChange } value={ this.state.searchTerm } />
              {/*
              <Button color="primary" id="search" className="search-btn" onClick={ this.handleClick }>Search</Button>
              */}
              </InputGroup>
              <div id="jhutext">Databases provide access to journal articles, newspapers, audio and video recordings, data sets, dissertations, and more.</div>
          {
            this.props.searchTerm ? <ResourceList/> : <TagList api={process.env.REACT_APP_API_ROOT + '/oriole/tags'} />
          }
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
