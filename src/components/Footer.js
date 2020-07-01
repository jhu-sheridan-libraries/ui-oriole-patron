import React from 'react'
import { Container, Nav, NavLink, NavItem, Navbar } from 'reactstrap'

const Footer = () => {
    return (
      <Container className="jhu-footer col-12">
        <Nav>
          <Navbar>
            <NavItem><NavLink className="jhu-footer-link" href="https://catalyst.library.jhu.edu/info/libraries"><img id="footer-logo" alt="Johns Hopkins University Libraries" src="/logo.png"  /></NavLink></NavItem>
            <NavItem><NavLink className="jhu-footer-link" href="mailto:ask@jhu.libanswers.com?Subject=Johns%20Hopkins%20Libraries%20Database%20List%20Feedback">Feedback</NavLink></NavItem>
          </Navbar>
        </Nav>
      </Container>
    )
  }

export default Footer
