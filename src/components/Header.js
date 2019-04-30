import React from 'react'
import { Container, Collapse, Navbar, Nav, NavItem, NavLink, Col, Row } from 'reactstrap';

const Header = () => {
    return (
    <div>
      <Container className="jhu-first-nav col-12">
          <Navbar>
            <Nav>
              <NavItem><NavLink className="jhu-first-nav" href="https://library.jhu.edu">Sheridan Libraries</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="http://welch.jhmi.edu/welchone/">Welch Medical Library</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="http://www.sais-jhu.edu/atoz/mason-library-washington-dc">SAIS Library</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="http://musiclibrary.peabody.jhu.edu/home">Friedheim Music Library</NavLink></NavItem>
              <NavItem><NavLink className="jhu-first-nav" href="https://aplweb/departments/itsd/iks/Pages/IKS.aspx">APL Library</NavLink></NavItem>
            </Nav>
          </Navbar>
        </Container>

        <Container className="jhu-second-nav col-12">
          <Row>
            <Col className="col-*">
              <a href="https://catalyst.library.jhu.edu/info/libraries"><img alt="Johns Hopkins University Libraries" id="top-logo" src="/logo.png" /></a>
            </Col>
            <Col className="col-*">
                <a href="/" id="main-title">Databases</a>
            </Col>
            <Col className="col-sm-6" id="jhutext">
Johns Hopkins libraries subscribe to over 1,000 online databases that provide access to journal articles, books, newspapers, audio and video recordings, dissertations, and many other types of online resources.
            </Col>
          </Row>
        </Container>

     </div>
   )
 }


 export default Header
