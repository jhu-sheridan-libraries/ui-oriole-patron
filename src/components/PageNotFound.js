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

            <p>The page you requested was not found. Search or browse for the database you want <Link to={`/`} target="_blank">here</Link>.</p>

            <p>Common problems with page URLs include:</p>

                <ul>
                  <li>The URL is out of date. This website was moved onto a new software platform in May 2020, and some types of URLs no longer work.</li>
                  <li>There is a spelling or format error in the URL you used.</li>
                </ul>
                &nbsp;
            </Container>
          </div>
          )
    }
}
export default PageNotFound;
