
// NOTE:  This is unused!  It's the old Cyzykian Way.  Dazhi's Way is much better, per TagResourceList.js
// But leaving this code here, for now, even though it's unused

import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { getTags, getTag } from '../apis/oriole'

class TagDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      tag: props.match.params.tag,
    }
    const { state } = props.location
    if (state) {
      this.setState({ children: state.children })
    }
  }

  processRecords(recordset) {
    let processedRecordset = []
    let queryParamWithDashes = this.state.tag + " -- "
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
    //console.log("recordset")
    //console.log(recordset)

    // groupBy tag.tagList

    // First, a test of groupBy the entire array, something I can check against:
    let testArray = tempArray = _.groupBy(recordset, function(x) {
      return x.tags.tagList;
    });
    //console.log("Here is a test, groupBy the entire recordset array:")
    //console.log(testArray)

    // TRICKY! Insofar as one Title can have multiple Tags, read and groupBy maxArrayLength deep and merge into main processedRecordset
    let i = 0
    for (i; i<maxArrayLength; i++) { // <-- is i< correct, or should it be i<= ???  Check against testArray above
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

    //console.log("processedRecordset")
    //console.log(processedRecordset)

    return processedRecordset;
  }

  componentDidMount() {
    if (!this.state.children) {
      getTags().then(tags => {
        this.setState({ children: tags[this.state.tag] })
      })
    }
    getTag(this.state.tag).then(resources => {
      this.setState({ records: this.processRecords(resources) })
    })
  }

  render() {
    let blocks;
    if (this.state.children) {
      // Bump Core Databases to top of array
      for (var i = 0; i < this.state.children.length; i++) {
        if(this.state.children[i] === "Core Databases"){
          this.state.children.splice(i, 1);
          this.state.children.unshift("Core Databases");
        }
      }
      blocks = this.state.children.map(child => {
        let childTitles;
        if (this.state.records && child in this.state.records) {
          childTitles = this.state.records[child].map(record =>
            <li key={record.altId}>
              <Link to={`/databases/proxy/${record.altId}`} target="_blank">{record.title}</Link> &nbsp;&nbsp;&nbsp;  <span className='itemMoreInfo'><Link to={{pathname: "/databases/database/" + record.altId}} >More Info <img src="/icon-arrow-circle-green.svg" alt="" /></Link></span>
            </li>
          )
        } else {
          childTitles = ''
        }
        return (
          <div id={child} ref={child} key={child}>
            <h2><div key={child}>
              {child}
            </div></h2>
            <ul>
              {childTitles}
            </ul>
          </div>
        );
      });
    } else {
      blocks = ''
    }

    return (
      <div>
        <Container className="main-container">
            <div id="tagDetailTitle" ref="tagDetailTitle"><h2>{this.state.tag}</h2></div>
          {blocks}
        </Container>
      </div>
    );
  }
}

export default TagDetail
