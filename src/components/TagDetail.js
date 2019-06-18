import React, { Component } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'
import _ from 'lodash'

let qs = queryString.parse(window.location.search)
let queryParam = qs.q
let queryParamWithDashes = queryParam + " -- "


class TagDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { records: [] };
    this.processRecords.bind(this);
  }

  processRecords(recordset) {
    // create an array of wanted tags
    let tagsToKeep = []
    // create array of unwanted tags
    let tagsToRemove = []
    _.forEach(recordset, function(thisRecord) {
      _.forEach(thisRecord.tags.tagList, function(thisTagListItem) {
        if (!_.startsWith(thisTagListItem, queryParamWithDashes)) {
          tagsToRemove.push(thisTagListItem)
        } else {
          tagsToKeep.push(thisTagListItem)
        }
      });
    });
    tagsToKeep = _.uniq(tagsToKeep);
    tagsToKeep = _.sortBy(tagsToKeep)
    tagsToRemove = _.uniq(tagsToRemove)
    // filter out unwanted tags from recordset tagLists
    _.forEach(recordset, function(thisRecord) {
      _.pullAll(thisRecord.tags.tagList, tagsToRemove)
    });
    // sort recordset by Title
    recordset = _.sortBy(recordset, ['title']);
    // groupBy tag.tagList
    recordset = _.groupBy(recordset, function(i) {
      return i.tags.tagList;
    });
    console.log(recordset)
    return recordset;
  }

  componentDidMount() {
    let api=process.env.REACT_APP_API_ROOT + '/oriole/resources?query=tags.tagList=/respectAccents ' + queryParamWithDashes + "&limit=1000"
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
        this.setState({ records: this.processRecords(d.resources) });
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
