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
      waitingLoading: true
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedOption: nextProps.selectedOption });

    this.eventti();
  }

  eventti = () => {
    console.log('clog:', this.state.selectedOption);

    // if (nextProps !== null) {
    //   nextProps.map(city => {
    //     console.log('IF:', city.Location);

    //     return city.Location;
    //   });
    // }};
  };

  render() {
    let hoimoi = this.props.selectedOption;

    if (hoimoi !== null) {
      hoimoi.map(city => {
        console.log('IF:', city.Location);

        return city.Location;
      });
    }

    // this.setState({ selectedOption: hoimoi });

    // let candidates = this.handleTopCandidates();

    console.log('hoimoi', hoimoi);

    // hei();

    // function hei() {
    //   if (hoimoi !== null) {
    //     hoimoi.map(city => {
    //       return city.Location;
    //     });
    //   }
    // }

    // console.log('Hei', hei);
    // if(hoimoi !== null)

    // console.log('mapPickedLocations:', mapPickedLocations);

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

    console.log('onlywithLogo:', ExpoSuggestionsFilter);

    let suggestionsMap = ExpoSuggestionsFilter.map(workplace => {
      return workplace.Location;
    });

    console.log('suggestionsMap:', suggestionsMap);

    //Palauttaa DropDownMenulle arrayn, joka sisältää vain
    //yhden kuvallisen(url-osoitteen) sisältävän kaupungin.

    let onlyOneCity = Array.from(new Set(suggestionsMap));

    console.log('onlyOneCity', onlyOneCity);

    //FilteredContacts filtteröi työpaikat halutun kaupungin
    //mukaan.

    // let onlyLocation2 = this.state.selectedOption.map(lokaatio => {
    //   console.log('onkoArray:', onlyLocation2);
    //   return lokaatio.Location;
    // });

    // console.log(
    //   'onkoArray:',
    //   this.state.selectedOption.map(lokaatio => {
    //     return lokaatio.Location;
    //   })
    // );

    let filteredContacts = ExpoSuggestionsFilter.filter(workplace => {
      return (
        workplace.Location.toLowerCase().indexOf(
          this.state.search.toLocaleLowerCase()
        ) !== -1
      );
    });

    return (
      <div>
        <div className='sideByside'>
          <p className='DropdownMenu'>AutoComplete</p>

          <DropdownMenu suggestions={onlyOneCity} />
          {/* <AutoComplete suggestions={onlyOneCity} /> */}
        </div>
        <p>Vaihtaa heti:</p>
        <input
          type='text'
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
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
