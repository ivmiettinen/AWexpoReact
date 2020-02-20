import React, { Component } from 'react';
import { getWorkData } from '../serviceClient/ExpoService';
import Expo from './Expo';

import upLeftPicture from '../Images/AW_logo_main_version_RGB.png';
import '../App.css';
import DropdownMenu from '../components/DropdownMenu';
import AutoComplete from '../components/AutoComplete';
import SearchField from '../components/SearchField';

export class ExpoBox extends Component {
  state = {
    workplaces: [],
    loading: true
  };

  fetchWorks = () => {
    getWorkData()
      .then(workplaces => {
        this.setState({ workplaces: workplaces });
        this.setState({ loading: !true });
      })
      .catch(error => {
        this.setState({ loading: !false });
        console.error('Error:', error);
      });
  };

  componentDidMount() {
    this.fetchWorks();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <div className='sideByside'>
          <DropdownMenu />
          <img
            src={upLeftPicture}
            alt='upLeftPicture'
            className='upRightPictureStyle'
          />
          <SearchField workplaces={this.state.workplaces} />
        </div>

        {/* <AutoComplete
          suggestions={[
            'Alligator',
            'Bask',
            'Crocodilian',
            'Death Roll',
            'Eggs',
            'Jaws',
            'Reptile',
            'Solitary',
            'Tail',
            'Wetlands'
          ]}
        /> */}
        <Expo
          workplaces={this.state.workplaces}
          search={this.state.search}
          loading={this.state.loading}
          suggestions={this.props.suggestions}
        />
      </div>
    );
  }
}

export default ExpoBox;
