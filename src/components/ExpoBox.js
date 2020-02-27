import React, { Component } from 'react';
import { getWorkData } from '../serviceClient/ExpoService';
import Expo from './Expo';

import upLeftPicture from '../Images/AW_logo_main_version_RGB.png';
import '../App.css';
import DropdownMenu from '../components/DropdownMenu';
import AutoComplete from '../components/AutoComplete';
import SearchField from '../components/SearchField';

import Dropdown from 'react-bootstrap/Dropdown';

// import ExpoHandler from '../components/ExpoHandler';

export class ExpoBox extends Component {
  state = {
    workplaces: [],
    loading: true,
    noDuplicates: [],
    selectedOption: [],
    logoWorkplaces: [],
    workplacesNumber: '',
    waitingOptions: true
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
    //filter off workplaces without logoAbsoluteUrl

    const copyWorkplaces = [...this.state.workplaces].filter(
      workplace => workplace.LogoAbsoluteUrl !== ''
    );

    this.setState({ logoWorkplaces: copyWorkplaces });

    console.log(copyWorkplaces);

    //Filters the cities so, that the same location does not appear twice inside object

    const noDuplicates = copyWorkplaces.filter(
      (ele, ind) =>
        ind ===
        copyWorkplaces.findIndex(
          elem => elem.Location === ele.Location && elem.id === ele.id
        )
    );
    this.setState({ noDuplicates: noDuplicates });
  };

  handleLocationChange = e => {
    // this.state.selectedOption.push(e);

    if (e !== []) {
      this.setState({ selectedOption: e, waitingOptions: !true });
    }
    // else if (e === []) {
    //   this.setState({ waitingOptions: !false });
    // } else {
    //   this.setState({ waitingOptions: !false });
    // }

    console.log('eeeee:', e);
  };

  waitingForm = () => {
    return (
      <div className='waitingFormClass'>
        Valitse haluamasi kaupungit vasemmalta hakuehdoista ja karuselli
        käynnistyy
      </div>
    );
  };

  showSearchResults = () => {
    const copyOfWorkplaces = [...this.state.workplaces];
    const copyOfSelected = [...this.state.selectedOption];

    //Informs sum of open workplaces based on user selections.
    const allWorkplaces = copyOfWorkplaces.filter(selection =>
      selection.Location.split(' ').some(location =>
        copyOfSelected.includes(location)
      )
    );

    console.log('allWorkplaces', allWorkplaces.length);

    return (
      <div className='showSearchResultsClass'>
        Meillä on avoinna yhteensä
        <span className='allWorkplacesNumber'>{allWorkplaces.length}</span>
        työpaikkaa.
      </div>
    );
  };

  render() {
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
            workplaces={this.state.workplaces}
            selectedOption={this.state.selectedOption}
            waitingOptions={this.state.waitingOptions}
          />
          {this.state.waitingOptions
            ? this.waitingForm()
            : this.showSearchResults()}
        </div>

        <Expo
          workplaces={this.state.workplaces}
          search={this.state.search}
          loading={this.state.loading}
          suggestions={this.props.suggestions}
          selectedOption={this.state.selectedOption}
          noDuplicates={this.state.noDuplicates}
          logoWorkplaces={this.state.logoWorkplaces}
        />
      </div>
    );
  }
}

export default ExpoBox;
