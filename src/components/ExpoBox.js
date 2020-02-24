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
    waitingCities: true
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

    // if (this.state.selectedOption !== null) {
    //   let onlyLocation1 = [...this.state.selectedOption];
    //   let onlyLocation2 = onlyLocation1.map(lokaatio => {
    //     console.log('onkoArray:', onlyLocation2);
    //     return lokaatio.Location;
    //   });
    // } else {
    //   return [];
    // }

    // let funktio2 = () => {
    //   if (this.state.selectedOption !== null) {
    //     let concat = this.state.selectedOption.concat();
    //     let mappi = concat.map(param => {
    //       console.log('mappi:', mappi);
    //       return param.Location;
    //     });
    //   } else {
    //     return [];
    //   }
    // };

    // let funktio = funktio2;

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
        {/* 
        <ExpoHandler
          workplaces={this.state.workplaces}
          search={this.state.search}
          loading={this.state.loading}
          suggestions={this.props.suggestions}
          selectedOption={this.state.selectedOption}
        /> */}
      </div>
    );
  }
}

export default ExpoBox;
