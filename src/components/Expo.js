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
      fade: true
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    // let hoimoi = this.props.workplaces;

    // console.log('hoimoi', hoimoi);

    //OnlyWithLogoFilter on apumuuttuja, joka filtteröi pois työpaikat,
    //joilla ei ole logoa näkyvissä.

    let OnlyWithLogoFilter = workplace => {
      if (workplace.LogoAbsoluteUrl !== '') {
        return workplace;
      }
    };

    //let props suorittaa itse filtteröinnin.

    let ExpoSuggestionsFilter = this.props.workplaces.filter(
      OnlyWithLogoFilter
    );

    let suggestionsMap = ExpoSuggestionsFilter.map(workplace => {
      return workplace.Location;
    });

    console.log('suggestionsMap:', suggestionsMap);

    let onlyOneCity = Array.from(new Set(suggestionsMap));

    console.log('onlyOneCity', onlyOneCity);

    //FilteredContacts filtteröi työpaikat halutun kaupungin
    //mukaan.

    // console.log('onkoArray:', filterprops);

    let filteredContacts = ExpoSuggestionsFilter.filter(workplace => {
      return (
        workplace.Location.toLowerCase().indexOf(
          this.state.search.toLocaleLowerCase()
        ) !== -1
      );
    });

    // let suggestions = suggestions1.map(workplace => {
    //   return workplace.Location;
    // });

    // console.log('Kokeilu:', suggestions);

    //Roskaa:
    // let mappingThrough = this.props.workplaces.map(workplace => {
    //   return workplace;
    // });
    // console.log('mapping', mappingThrough);
    // console.log('Foreachi:', foreachi);

    return (
      <div>
        <div className='sideByside'>
          {/* <p className='DropdownMenu'>AutoComplete</p> */}

          {/* <DropdownMenu suggestions={onlyOneCity} />
          <AutoComplete suggestions={onlyOneCity} /> */}
        </div>
        {/* <p>Vaihtaa heti:</p>
        <input
          type='text'
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        /> */}
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
            {filteredContacts.map(workplace => {
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
            ;
          </Carousel>
        )}
      </div>
    );
  }
}

export default Expo;
