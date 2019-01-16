import React from 'react'
import { Container, Nav, NavLink, NavItem, Navbar } from 'reactstrap'

const Footer = () => {
    return (
      <Container className="jhu-footer col-12">
        <Nav>
          <Navbar>
            <NavItem><NavLink href="https://catalyst.library.jhu.edu/info/libraries"><img className="footer-logo" src="logo.png" alt="" width="66%" /></NavLink></NavItem>
            <NavItem><NavLink href="mailto:ask@jhu.libanswers.com?Subject=Johns%20Hopkins%20Libraries%20Database%20List%20Feedback">Feedback</NavLink></NavItem>
            <NavItem><NavLink href="/">Credits</NavLink></NavItem>
          </Navbar>
        </Nav>
      </Container>
    )
  }

export default Footer
