import React from 'react'
import { Container, Nav, NavLink, NavItem, Navbar } from 'reactstrap'

const Footer = () => {
    return (
      <Container className="jhu-footer col-8">
        <Nav>
          <Navbar>
            <NavItem><NavLink className="jhu-footer-link" href="https://catalyst.library.jhu.edu/info/libraries"><img id="footer-logo" src="/logo.png" alt="" /></NavLink></NavItem>
            <NavItem><NavLink className="jhu-footer-link" href="mailto:ask@jhu.libanswers.com?Subject=Johns%20Hopkins%20Libraries%20Database%20List%20Feedback">Feedback</NavLink></NavItem>
            <NavItem><NavLink className="jhu-footer-link" href="/">Credits</NavLink></NavItem>
          </Navbar>
        </Nav>
      </Container>
    )
  }

export default Footer
