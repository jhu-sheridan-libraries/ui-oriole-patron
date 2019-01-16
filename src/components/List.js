import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { Container } from 'reactstrap'
import { list } from '../actions'
import ResourceList from './ResourceList'

const mapStateToProps = (state, ownProps) => {
  let listTerm = ''
  // maps the query parameter from route to props
  if (ownProps.location && ownProps.location.search) {
    let params = qs.parse(ownProps.location.search)
    listTerm = params.q;
  }
  return { listTerm }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (props, query) => {
  // dispatch search for a new query
  dispatch(list({ query: query, page: 0 }))
  }
})

const initialState = { listTerm: '' }

class List extends Component {
  constructor(props) {
    super(props)
    if (props.listTerm) {
      this.state = { ...initialState, listTerm: props.listTerm }
    } else {
      this.state = initialState
    }
  }

  render() {
    return (
      <div>
        <Container className="main-container">
          <ResourceList />
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
