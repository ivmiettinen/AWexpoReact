import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';
import AutoComplete from './AutoComplete';
import { Button } from 'reactstrap';

export class DropdownMenu extends Component {
  render() {
    // let propsit = this.props;

    // console.log('propsit:', propsit);

    // onClick={this.}

    return (
      <div className='DropdownMenu'>
        <Dropdown>
          <Dropdown.Toggle
            variant='success'
            id='dropdown-basic'
            className='DropdownToggle'
          >
            Hakuehdot
          </Dropdown.Toggle>

          <Dropdown.Menu className='DropdownMenu1'>
            <Dropdown.Item className='DropdownItem' href='#/action-1'>
              <Button className='DropdownmenusButton' onClick={this.select}>
                Hae kaupungin mukaan
              </Button>
            </Dropdown.Item>
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
