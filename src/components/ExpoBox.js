import React, { Component } from 'react';
import { getWorkData } from '../serviceClient/ExpoService';
import ExpoCarousel from './ExpoCarousel';

import upLeftPicture from '../Images/AW_logo_main_version_RGB.png';
import '../App.css';
import DropdownMenu from '../components/DropdownMenu';

export class ExpoBox extends Component {
  state = {
    workplaces: [],
    loading: true,
    noDuplicates: [],
    selectedOption: [],
    logoWorkplaces: [],
    waitingOptions: true,
    qrCodeCheck: true
  };

  fetchWorks = () => {
    getWorkData()
      .then(workplaces => {
        this.setState({ workplaces: workplaces });
        this.setState({ loading: !true });
        this.filterOptions();
      })
      .catch(error => {
        this.setState({ loading: !false });
        console.error('Error:', error);
      });
  };

  componentDidMount() {
    this.fetchWorks();
  }

  filterOptions = () => {
    //filter off workplaces without logoAbsoluteUrl

    const copyWorkplaces = [...this.state.workplaces].filter(
      workplace => workplace.LogoAbsoluteUrl !== ''
    );

    this.setState({ logoWorkplaces: copyWorkplaces });
    console.log(copyWorkplaces);

    //Filters the cities so, that the same location does not appear twice inside object
    //and sort them.

    const noDuplicates = copyWorkplaces
      .filter(
        (ele, ind) =>
          ind ===
          copyWorkplaces.findIndex(
            elem => elem.Location === ele.Location && elem.id === ele.id
          )
      )
      .sort((a, b) => (a.Location > b.Location ? 1 : -1));

    this.setState({ noDuplicates: noDuplicates });
  };

  handleLocationChange = event => {
    this.setState({ selectedOption: event, waitingOptions: !true });
  };

  waitingForm = () => {
    return (
      <div className='waitingFormClass'>
        <p>
          Valitse haluamasi kaupungit vasemmalta hakuehdoista ja karuselli
          käynnistyy
        </p>
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

    return (
      <div className='showSearchResultsClass'>
        <p>
          Meillä on avoinna yhteensä
          <span className='allWorkplacesNumber'>{allWorkplaces.length}</span>
          työpaikkaa.
        </p>
      </div>
    );
  };

  handleQRcodeChange = event => {
    this.setState({ qrCodeCheck: JSON.parse(event.target.value) });
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
            qrCodeCheck={this.state.qrCodeCheck}
            handleQRcodeChange={this.handleQRcodeChange}
          />
          {this.state.waitingOptions
            ? this.waitingForm()
            : this.showSearchResults()}
        </div>

        <ExpoCarousel
          workplaces={this.state.workplaces}
          loading={this.state.loading}
          selectedOption={this.state.selectedOption}
          logoWorkplaces={this.state.logoWorkplaces}
          qrCodeCheck={this.state.qrCodeCheck}
        />
      </div>
    );
  }
}

export default ExpoBox;
