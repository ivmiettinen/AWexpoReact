import React, { Component, useState } from 'react';
import ExpoItem from './ExpoItem';
import Carousel from 'react-bootstrap/Carousel';
import ExpoCarousel from './ExpoCarousel';
import mainPicture from '../Images/AW_logo_main_version_RGB.png';
import AutoComplete from './AutoComplete';
import DropdownMenu from './DropdownMenu';

import '../App.css';

export class Expo extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      indicators: false,
      controls: false,
      selectedOption: '',
      waitingCities: true,
      waitingLoading: true,
      noDuplicates: '',
      logoWorkplaces: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedOption: nextProps.selectedOption });
  }

  render() {
    //Gives parameters for Carousel. Parameters are based on user selections.
    const copyOfSelected = [...this.props.selectedOption];
    const copyOfLogoWorks = [...this.props.logoWorkplaces];

    const filterForUserOptions = copyOfLogoWorks.filter(selection =>
      selection.Location.split(' ').some(location =>
        copyOfSelected.includes(location)
      )
    );

    console.log('filterForUserOptions', filterForUserOptions);

    return (
      <div>
        {this.props.loading ? (
          <Carousel
            indicators={this.state.indicators}
            controls={this.state.controls}
            fade={this.state.fade}
          >
            <Carousel.Item className='CarouselItem'>
              <img
                src={mainPicture}
                alt='logo'
                className='aw_logo_center'
              ></img>
            </Carousel.Item>
          </Carousel>
        ) : (
          <Carousel
            className='Carousel'
            indicators={this.state.indicators}
            controls={this.state.controls}
          >
            <Carousel.Item className='CarouselItem'>
              <img
                src={mainPicture}
                alt='logo'
                className='aw_logo_center'
              ></img>
            </Carousel.Item>
            {filterForUserOptions.map(workplace => {
              return (
                <Carousel.Item
                  className='CarouselItem'
                  // style={carouselItemStyle}
                  key={workplace.AdvertId}
                >
                  <div className='logo'>
                    <img
                      src={workplace.LogoAbsoluteUrl}
                      className='logoStyle'
                    />
                  </div>
                  <div className='nimike'>{workplace.Title}</div>
                  <div className='kaupunki'>{workplace.Location}</div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </div>
    );
  }
}

export default Expo;
