import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-columns'
import { Link } from 'react-router-dom'
import { getTags } from '../apis/oriole'

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: {} };
  }

  componentDidMount() {
    getTags().then(tags => {
      this.setState({ tags })
    })
  }

  render() {
    let queries = [{
      columns: 2,
      query: 'min-width: 500px'
    }, {
      columns: 3,
      query: 'min-width: 1000px',
    }]
    let gap = "15px"
    const mainTags = Object.keys(this.state.tags).sort()
    const blocks = mainTags.map(tag => {
      return (<h2><div key={tag}>
        <Link to={{
          pathname: "/TagDetail/" + encodeURI(tag),
          state: {
            children: this.state.tags[tag]
          }
        }} >{tag}</Link>
      </div></h2>);
    });
    return (
      <div className='resource-content'>
      <div class="jhutext">Browse recommended databases by subject:</div><br />
        <Fragment>
            <Columns gap={gap} queries={queries}>{blocks}</Columns>
        </Fragment>
      </div>
    );
  }
}

TagList.propTypes = {
  api: PropTypes.string.isRequired
}

export default TagList
