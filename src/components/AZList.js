import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { Container, Nav, NavLink, NavItem } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
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
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=A"}} >A</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=B"}} >B</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=C"}} >C</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=D"}} >D</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=E"}} >E</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=F"}} >F</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=G"}} >G</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=H"}} >H</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=I"}} >I</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=J"}} >J</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=J"}} >K</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=L"}} >L</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=M"}} >M</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=N"}} >N</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=O"}} >O</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=P"}} >P</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=Q"}} >Q</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=R"}} >R</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=S"}} >S</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=T"}} >T</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=U"}} >U</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=V"}} >V</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=W"}} >W</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=X"}} >X</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=Y"}} >Y</Link></NavLink></NavItem>
            <NavItem><NavLink><Link to={{pathname: "/AZList?q=Z"}} >Z</Link></NavLink></NavItem>
          </Nav>
          <ResourceList />
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AZList)
