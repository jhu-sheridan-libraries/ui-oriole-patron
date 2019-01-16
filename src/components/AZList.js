import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { Container, Nav, NavLink, NavItem } from 'reactstrap'
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

const initialState = { listTerm: 'A' }

class AZList extends Component {
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
          <Nav id="azlist">
            <NavItem><NavLink href="/AZList?q=A">A</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=B">B</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=C">C</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=D">D</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=E">E</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=F">F</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=G">G</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=H">H</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=I">I</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=J">J</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=J">K</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=L">L</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=M">M</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=N">N</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=O">O</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=P">P</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=Q">Q</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=R">R</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=S">S</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=T">T</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=U">U</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=V">V</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=W">W</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=X">X</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=Y">Y</NavLink></NavItem>
            <NavItem><NavLink href="/AZList?q=Z">Z</NavLink></NavItem>
          </Nav>
          <ResourceList />
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AZList)
