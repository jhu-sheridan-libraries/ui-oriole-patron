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
    let processedRecordset = []
    let tempArray = []
    let maxArrayLength = 1 // variable to store the maximum array length encountered in tags.tagList
    // Create an array of unwanted tags
    let tagsToRemove = []
    _.forEach(recordset, function(thisRecord) {
      let tempArrayLength = thisRecord.tags.tagList.length
      _.forEach(thisRecord.tags.tagList, function(thisTagListItem) {
        if (!_.startsWith(thisTagListItem, queryParamWithDashes)) {
          tagsToRemove.push(thisTagListItem)
        } else {
          if (tempArrayLength > maxArrayLength) { // keeping track of maximum array length here, to be used in Merge loop/function below
            maxArrayLength = tempArrayLength
          }
        }
      });
    });
    tagsToRemove = _.uniq(tagsToRemove)
    // Filter out unwanted tags from recordset tagLists
    _.forEach(recordset, function(thisRecord) {
      _.pullAll(thisRecord.tags.tagList, tagsToRemove)
    });
    // sort recordset by Title
    recordset = _.sortBy(recordset, ['title']);
    console.log("recordset")
    console.log(recordset)

    // groupBy tag.tagList
    // TRICKY! Insofar as one Title can have multiple Tags, read and groupBy maxArrayLength deep and merge into main processedRecordset
    let i = 0
    for (i; i<maxArrayLength; i++) { // <-- is i< correct, or should it be i<= ???
      tempArray = _.groupBy(recordset, function(x) {
        return x.tags.tagList[i];
      });
      _.merge(processedRecordset, tempArray)
    }
    // Get rid of trailing undefined object which, I think, is a side effect of the merges above
    delete processedRecordset.undefined

    // Remove queryParamWithDashes string from object keys
    processedRecordset = _.mapKeys(processedRecordset, function(value, key) {
        let newkey = key.replace(queryParamWithDashes, '')
        return newkey
      });

    console.log("processedRecordset")
    console.log(processedRecordset)

    return processedRecordset;
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
