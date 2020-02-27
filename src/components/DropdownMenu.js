import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';

import Select from 'react-select';

const styleForButton = {
  boxShadow: 'none',
  color: 'white',
  fontFamily: 'Awesome'
};

const styleForReactSelect = {
  placeholder: defaultStyles => {
    return {
      ...defaultStyles,
      color: '#white'
    };
  },

  control: (base, state) => ({
    ...base,
    background: 'rgb(5, 212, 142)',
    // match with the menu
    borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? 'white' : 'lightyellow',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'white' : 'lightyellow'
    }
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    background: 'green'
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    background: '#049a78',
    color: 'white'
  })
};

export class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props);
    this.state = {
      selectedOption: null
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ x: nextProps.noDuplicates });
  // }

  handleLocationChange = selectedOption => {
    console.log('props editointi:', this.props.waitingOptions);

    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);

    if (selectedOption !== null) {
      const userChoice = selectedOption.map(param => {
        return param.Location;
      });
      this.props.addNew(userChoice);
    } else {
      this.props.addNew([]);
    }
  };

  propsit = props => {
    console.log('propsit dropdownissa:', props);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div className='multiSelectContainer '>
        <Dropdown>
          <Dropdown.Toggle
            style={styleForButton}
            variant='yellow'
            className='DropdownToggle'
          >
            Hakuehdot
          </Dropdown.Toggle>

          <Dropdown.Menu className='DropdownMenu1'>
            <Dropdown.Item
              className='DropdownItem'
              href='#/action-1'
            ></Dropdown.Item>
            <Select
              styles={styleForReactSelect}
              value={selectedOption}
              onChange={this.handleLocationChange}
              isMulti
              isSearchable
              placeholder='Write or pick'
              // options={this.state.options}
              options={this.props.noDuplicates}
              getOptionLabel={option => option.Location}
              getOptionValue={option => option.Location}
            />

            <Dropdown.Item className='DropdownItem' href='#/action-2'>
              Another action
            </Dropdown.Item>
            <Dropdown.Item className='DropdownItem' href='#/action-3'>
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownMenu;
