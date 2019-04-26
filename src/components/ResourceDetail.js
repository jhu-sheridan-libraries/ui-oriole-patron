import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const record = state
  console.log(state)
}

class ResourceDetail extends Component {

  componentDidMount () {
    const {altId} = this.props.match.params;
  }

      render() {
        return (
        <div className='item'>
          FOOO
{/*
          <span className='itemTitle'><a href={ "http://proxy.library.jhu.edu/login?url=" + record.url } target='_new'>{ record.title }</a></span><br />
          <span className='itemDescription'>{ record.description } </span>
*/}
          <p></p>
        </div>
      )
    }
  }

export default connect(mapStateToProps)(ResourceDetail);
