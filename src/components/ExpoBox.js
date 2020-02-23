import React, { Component } from 'react';
import { getWorkData } from '../serviceClient/ExpoService';
import Expo from './Expo';

import upLeftPicture from '../Images/AW_logo_main_version_RGB.png';
import '../App.css';
import DropdownMenu from '../components/DropdownMenu';
import AutoComplete from '../components/AutoComplete';
import SearchField from '../components/SearchField';

import Dropdown from 'react-bootstrap/Dropdown';

export class ExpoBox extends Component {
  state = {
    workplaces: [],
    loading: true,
    noDuplicates: [],
    selectedOption: []
  };

  fetchWorks = () => {
    getWorkData()
      .then(workplaces => {
        this.setState({ workplaces: workplaces });
        this.setState({ loading: !true });
        this.filter();
      })
      .catch(error => {
        this.setState({ loading: !false });
        console.error('Error:', error);
      });
  };

  componentDidMount() {
    this.fetchWorks();
  }

  filter = () => {
    const copyWorkplaces = this.state.workplaces;

    //Filtteröi kaupungit niin, että sama lokaatio ei ole objektissa kahta kertaa.
    const noDuplicates = copyWorkplaces.filter(
      (ele, ind) =>
        ind ===
        copyWorkplaces.findIndex(
          elem => elem.Location === ele.Location && elem.id === ele.id
        )
    );
    this.setState({ noDuplicates: noDuplicates });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleLocationChange = e => {
    // this.state.selectedOption.push(e);
    this.setState({ selectedOption: e });

    console.log('eeeee:', e);
  };

  render() {
    console.log('propseja2: ', this.state.noDuplicates);

    return (
      <div>
        <div className='sideByside'>
          <img
            src={upLeftPicture}
            alt='upLeftPicture'
            className='upRightPictureStyle'
          />
          <DropdownMenu
            noDuplicates={this.state.noDuplicates}
            addNew={this.handleLocationChange}
          />
          {/* <SearchField workplaces={this.state.workplaces} /> */}
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
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}

export default ExpoBox;
