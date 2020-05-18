import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../selectors/resource'
import { fetchRecord } from '../actions'
import { Container } from 'reactstrap'
import _ from 'lodash'


const mapStateToProps = (state) => {
  return {
    resource: selectors.getResource(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleFetch: (props) => {
    const { resource } = props
    if (typeof resource === 'undefined') { // If resource not in Store
      dispatch(fetchRecord(props.match.params.altId))
    }
  }
})

function returnAccessRestrictions(accessRestrictionsArray) {
  let htmlAccessRestrictions = ""
  if (accessRestrictionsArray.length > 0) {
    let accessRestrictionsList = []
    for (var i = 0; i < accessRestrictionsArray.length; i++) {
      accessRestrictionsList.push(accessRestrictionsArray[i].content)
    }
    accessRestrictionsList = accessRestrictionsList.join("<br />")
    htmlAccessRestrictions = `<b>Note:</b><br /> ` + accessRestrictionsList + `<p />`
    return {__html: htmlAccessRestrictions}
  }
  return null
}

function returnDescription(description) {
  return {__html: description}
}

function getSubTag(tag) {
  let tokens = tag.split(' -- ')
  if (tokens.length > 0) {
    return tokens[0];
  } else {
    return undefined
  }
}

function returnTagsList(tags) {
  let tagsList = []
  let thisTag = ""
  let htmlTagsList = ""
  for (var i = 0; i < tags.tagList.length; i++) {
    thisTag = getSubTag(tags.tagList[i])
    tagsList.push("<a href=" + window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/databases/subject/" + encodeURI(thisTag) + ">" + thisTag + "</a>")
  }
  tagsList = _.uniq(tagsList)
  tagsList = tagsList.sort()
  tagsList = tagsList.join("<br />")
  htmlTagsList = "<b>Recommended for these subject areas:</b><br /> " + tagsList
  return {__html: htmlTagsList}
}

class ResourceDetail extends Component {

  render() {
    const record = this.props.resource

    if (typeof record !== 'undefined') {

      document.title = "Johns Hopkins Libraries Databases: " + record.title

      let theURL = window.location.protocol + "//" + window.location.hostname + "/databases/proxy/" + record.altId

      return (
        <Container className="main-container">
          <div className='item' itemScope itemType="http://schema.org/DigitalDocument">
            <span className='resourceDetailTitle'><h2><a href={ theURL } target='_new'><div itemProp="name">{ record.title }</div></a></h2></span><p />
            <span className='itemDescription'><b>Durable URL:</b> <div><i>This is the permanent URL for the database. It should be used in syllabi, lists of resources, and all other links provided to Johns Hopkins users.</i></div> <div itemProp="url"><a href={ theURL}>{ theURL }</a></div></span><p />
            <span className='itemDescription'><b>About this Database:</b> <div itemProp="description" dangerouslySetInnerHTML={returnDescription(record.description)} /></span><p />
            <span className='itemDescription' dangerouslySetInnerHTML={returnAccessRestrictions(record.accessRestrictions)} />
            <span className='itemDescription'><b>Provider:</b> <div itemProp="provider">{ record.provider }</div></span><p />
            <span className='itemDescription' itemProp="keywords" dangerouslySetInnerHTML={returnTagsList(record.tags)} /><p />
            <p></p>
            </div>
        </Container>
        )
    } else {
      return (
        <div></div>
      )
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail)
