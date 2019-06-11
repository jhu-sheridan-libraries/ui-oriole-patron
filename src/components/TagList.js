import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subjects: [] };
    this.getSubjects.bind(this);
  }

  getSubjects(tags) {
    const subjects = new Set();
    tags.forEach(tag => {
      const tokens = tag.split("--");
      subjects.add(tokens[0].trim());
    });
    return Array.from(subjects);
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
        this.setState({ subjects: this.getSubjects(d.tags) });
      })
  }

  render() {
    const subjects = Array.from(this.state.subjects);
    const blocks = subjects.map(subject => {
      return (<div key={subject}>{subject}</div>);
    });
    return (
      <Fragment>
        {blocks}
      </Fragment>
    );
  }
}

TagList.propTypes = {
  api: PropTypes.string.isRequired
}

export default TagList


