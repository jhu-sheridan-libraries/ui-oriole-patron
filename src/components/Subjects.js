import React, { Component } from 'react'
import { Container, Nav, NavLink, NavItem, ListGroup, ListGroupItem } from 'reactstrap'
import Picker from 'react-mobile-picker'

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        filterName: 'African Americans'
      },
      optionGroups: {
        filterName: ['Available Filters:','Aeronautics',
                    'Africa',
                    'African Americans',
                    'African diaspora',
                    'American literature',
                    'Anthropology',
                    'Archaeology',
                    'Area Studies',
                    'Art and history',
                    'Asia',
                    'Astronomy',
                    'Astrophysics',
                    'Bioethics',
                    'Biography',
                    'Biotechnology',
                    'Book industries',
                    'Book reviews',
                    'Business',
                    'Career development',
                    'Chemical engineering',
                    'Chemistry',
                    'Classical literature',
                    'Cognitive science',
                    'Commerce',
                    'Computer science',
                    'Computer security',
                    'Counseling',
                    'Dictionaries',
                    'Earth sciences',
                    'Economics',
                    'Education',
                    'Encyclopedias',
                    'Energy policy',
                    'Engineering',
                    'English language',
                    'English literature'],
      }
    };
  }

  // Update the value in response to user picking event
  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  render() {
    const {optionGroups, valueGroups} = this.state;

    return (
      <Picker
        height={300}
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this.handleChange} />
    );
  }
}

export default Subjects
