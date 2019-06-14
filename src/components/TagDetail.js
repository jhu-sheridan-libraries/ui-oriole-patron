import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import queryString from 'query-string'

let qs = queryString.parse(window.location.search)
let queryParam = qs.q


class TagDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { records: [] };
    this.processRecords.bind(this);
  }

  processRecords(recordset) {
    const records = new Set();
    recordset.forEach(title => {
      records.add(title);
    });
    return Array.from(records);
    console.log(records)
  }

  componentDidMount() {
    let api=process.env.REACT_APP_API_ROOT + '/oriole/resources?query=tags.tagList=/respectAccents' + queryParam + '--'
    api = encodeURI(api)
    fetch(api, {
      headers: {
        'X-Okapi-Tenant': 'diku',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({ records: this.processRecords(d.recordset) });
      })
  }

  render() {
    return (
      <div>
        <Container className="main-container">
            <div id="tagDetailTitle"><h1>{queryParam}</h1></div>
        </Container>
      </div>
    );
  }
}

export default TagDetail
