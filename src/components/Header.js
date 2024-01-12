import React from 'react'
import { Container, Navbar, Nav, NavItem, NavLink, Col, Row } from 'reactstrap'

const Header = () => {

    return (
    <div>
      <Container className="jhu-first-nav col-lg-12 col-md-12">
        <Row>
          <Col>
            <Navbar>
              <Nav>
                <NavItem><NavLink className="jhu-first-nav" href="https://library.jhu.edu" target="_blank">Sheridan Libraries</NavLink></NavItem>
                <NavItem><NavLink className="jhu-first-nav" href="http://welch.jhmi.edu/welchone/" target="_blank">Welch Medical Library</NavLink></NavItem>
                <NavItem><NavLink className="jhu-first-nav" href="https://catalyst.library.jhu.edu/discovery/search?vid=01JHU_INST:sais_europe" target="_blank">SAIS Europe Library</NavLink></NavItem>
                <NavItem><NavLink className="jhu-first-nav" href="http://musiclibrary.peabody.jhu.edu/home" target="_blank">Arthur Friedheim Library</NavLink></NavItem>
                <NavItem><NavLink className="jhu-first-nav" href=" https://www.jhuapl.edu/Library/" target="_blank">APL Library</NavLink></NavItem>
              </Nav>
            </Navbar>
          </Col>
         </Row>
        </Container>

        <Container className="jhu-second-nav col-lg-10 col-md-10">
          <Row>
            <Col className="col-lg-auto col-md-auto col-sm-* col-xs-*">
              <a href="https://library.jhu.edu"><img alt="Johns Hopkins University Libraries" id="top-logo" src="/logo2.png" /></a>
            </Col>
            <Col className="col-lg-auto col-md-auto col-sm-* col-xs-*">
              <h1><a href="/" id="main-title">Databases</a></h1>
            </Col>
            <Col className="col-lg-8 col-md-8">
              <Navbar>
                <Nav className="jhu-second-nav">
                  <NavItem><NavLink className="jhu-second-nav-links" href="/">Browse by Subject</NavLink></NavItem>
                  <NavItem><NavLink className="jhu-second-nav-links" href="/?q=*">All Databases</NavLink></NavItem>
                  <div className="jhu-second-nav-links" id="separationGlyph">|</div>
                  <NavItem><NavLink className="jhu-second-nav-links remoteLink" href="https://catalyst.library.jhu.edu" target="_blank">Library Catalog </NavLink></NavItem>
                  <NavItem><NavLink className="jhu-second-nav-links remoteLink" href="https://catalyst.library.jhu.edu/discovery/jsearch?vid=01JHU_INST:JHU" target="_blank">Journal Lookup  </NavLink></NavItem>
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>

     </div>
   )
 }

 export default Header
