import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-columns'
import { Link } from 'react-router-dom'

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subjects: {} };
    this.getSubjects.bind(this);
  }

  getSubjects(tags) {
    const subjects = {}
    tags.forEach(tag => {
      const tokens = tag.split("--")
      const first = tokens[0].trim()
      if (!(first in subjects)) {
        subjects[first] = []
      }
      if (tokens.length > 1) {
        subjects[first].push(tokens[1].trim())
      }
    })
    return subjects
  }

  componentDidMount() {
    let { api } = this.props;
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
        this.setState({ subjects: this.getSubjects(d.tags) })
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
    const subjects = Object.keys(this.state.subjects).sort()
    const blocks = subjects.map(subject => {
      return (<h2><div key={subject}>
        <Link to={{
          pathname: "/TagDetail/" + encodeURI(subject),
          state: {
            children: this.state.subjects[subject]
          }
        }} >{subject}</Link>
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
