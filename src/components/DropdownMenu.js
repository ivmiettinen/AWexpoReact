import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';

// import AutoComplete from './AutoComplete';
import { Button } from 'reactstrap';
// import ms from '../multiselect.component.css';

// import { Multiselect } from 'multiselect-react-dropdown';

// const selectStyle = {
//   width: '200px'
// };

import Select from 'react-select';
import { css } from 'emotion';

const colorStyles = { backgroundColor: 'red' };

export class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props);
    this.state = {
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ],
      selectedOption: null
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ x: nextProps.noDuplicates });
  // }

  handleLocationChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);

    //Gives props to ExpoBox
    this.props.addNew(selectedOption);
  };

  propsit = props => {
    console.log('propsit dropdownissa:', props);
  };

  render() {
    const { selectedOption } = this.state;
    // let propsit = this.props;

    // const noDuplicates = this.props.noDuplicates;

    // console.log(noDuplicates);

    // let propseja2 = propseja.filter(
    //   (ele, ind) =>
    //     ind ===
    //     propseja.findIndex(
    //       elem => elem.Location === ele.Location && elem.id === ele.id
    //     )
    // );

    // let pp = propseja.filter(
    //   (ele, ind) =>
    //     ind ===
    //     propseja.findIndex(
    //       elem => elem.Location === ele.Location && elem.id === ele.id
    //     )
    // );
    // console.log(pp);

    // console.log('propsit:', propsit);

    // onClick={this.}

    return (
      <div className='multiSelectContainer '>
        <Dropdown>
          <Dropdown.Toggle
            variant='success'
            id='dropdown-basic'
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
              value={selectedOption}
              onChange={this.handleLocationChange}
              isMulti
              isSearchable
              placeholder='Write or pick'
              styles={colorStyles}
              // options={this.state.options}
              options={this.props.noDuplicates}
              getOptionLabel={option => option.Location}
              getOptionValue={option => option.Location}
            />
            {/* <Button
                className='DropdownmenusButton'
                onClick={this.select}
              ></Button> */}

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
