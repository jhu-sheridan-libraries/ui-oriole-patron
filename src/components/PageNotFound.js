import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom';

class PageNotFound extends React.Component{
    render() {
      document.title = "Page Not Found"
      return(
        <div>
          <Container className="main-container">
          &nbsp;
            <h2>Page Not Found</h2>

            <p><i>{window.location.href}</i></p>

            <p>The page you requested was not found. <b><Link to={`/`} target="_blank">Search for Databases</Link></b></p>

            <p>Common problems with page URLs include:</p>

                <ul>
                  <li>The URL is out of date.</li>
                  <li>There is a spelling or format error in the URL you used.</li>
                  <li>Johns Hopkins no longer subscribes to the database you tried to access.</li>
                </ul>
                &nbsp;
            </Container>
          </div>
          )
    }
}
export default PageNotFound;
