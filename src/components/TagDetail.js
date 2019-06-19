import React, { Component } from 'react'
import { Container } from 'reactstrap'
import _ from 'lodash'
import { getTags } from '../apis/oriole'
import {Link} from "react-router-dom"

class TagDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      tag: props.match.params.queryParam,
    }
    const { state } = props.location
    if (state) {
      this.state['children'] = state.children
    }
  }

  processRecords(recordset) {
    // create an array of wanted tags
    let tagsToKeep = []
    // create array of unwanted tags
    let tagsToRemove = []
    _.forEach(recordset, function(thisRecord) {
      _.forEach(thisRecord.tags.tagList, function(thisTagListItem) {
        if (!_.startsWith(thisTagListItem, this.state.queryParamWithDashes)) {
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
    if (!this.state.children) {
      getTags().then(tags => {
        this.setState({children: tags[this.state.tag], ...this.state})
      })
    }
    let api=process.env.REACT_APP_API_ROOT + '/oriole/resources?query=tags.tagList=/respectAccents ' + this.state.queryParamWithDashes + "&limit=1000"
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
        this.setState({ records: d.resources });
      })
  }

  render() {
    let blocks;
    if (this.state.children) {
      blocks = this.state.children.map(child => {
        return (<h4><div key={child}>
          {child}
        </div></h4>);
      });
    } else {
      blocks = ''
    }

    return (
      <div>
        <Container className="main-container">
            <div id="tagDetailTitle"><h1>{this.state.tag}</h1></div>
          {blocks}
        </Container>
      </div>
    );
  }
}

export default TagDetail
