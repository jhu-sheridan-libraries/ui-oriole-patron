import React from 'react'
import { Container, Navbar, Nav, NavItem, NavLink, Col, Row } from 'reactstrap'

const Header = () => {

    return (
    <div>
      <Container className="jhu-first-nav col-12">
          <Navbar>
            <Nav>
              <NavItem><NavLink className="jhu-first-nav" href="https://library.jhu.edu" target="_blank">Sheridan Libraries</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="http://welch.jhmi.edu/welchone/" target="_blank">Welch Medical Library</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="http://www.sais-jhu.edu/atoz/mason-library-washington-dc" target="_blank">SAIS Library</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="http://musiclibrary.peabody.jhu.edu/home" target="_blank">Friedheim Music Library</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="https://aplweb/departments/itsd/iks/Pages/IKS.aspx" target="_blank">APL Library</NavLink></NavItem>
            </Nav>
          </Navbar>
        </Container>

        <Container className="jhu-second-nav col-12">
          <Row>
            <Col className="col-*">
              <a href="https://catalyst.library.jhu.edu/info/libraries"><img alt="Johns Hopkins University Libraries" id="top-logo" src="/logo2.png" /></a>
            </Col>
            <Col className="col-*">
                <a href="/" id="main-title">Databases</a>
            </Col>
            <Col className="col-sm-8">
              <Navbar className="jhu-second-nav-links">
                <Nav>
                  <NavItem><NavLink className="jhu-second-nav" href="/">Browse by Subject</NavLink></NavItem>
                  <NavItem><NavLink className="jhu-second-nav" href="/?q=*">All Databases</NavLink></NavItem>
                  <NavItem><NavLink className="jhu-second-nav" href="https://catalyst.library.jhu.edu" target="_blank">Library Catalog</NavLink></NavItem>
                  <NavItem><NavLink className="jhu-second-nav" href="https://findit.library.jhu.edu/" target="_blank">Journal Lookup</NavLink></NavItem>
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>

     </div>
   )
 }

 export default Header
