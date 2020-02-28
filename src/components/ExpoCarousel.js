import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import mainPicture from '../Images/AW_logo_main_version_RGB.png';
import '../App.css';

export class ExpoCarousel extends Component {
  constructor() {
    super();
    this.state = {
      indicators: false,
      controls: false,
      selectedOption: '',
      waitingCities: true,
      waitingLoading: true
    };
  }

  showOnlyCarouselLogo = () => {
    return (
      <Carousel
        indicators={this.state.indicators}
        controls={this.state.controls}
        fade={this.state.fade}
      >
        <Carousel.Item className='CarouselItem'>
          <img src={mainPicture} alt='logo' className='aw_logo_center'></img>
        </Carousel.Item>
      </Carousel>
    );
  };

  carouselOptions = () => {
    //Gives parameters for Carousel. Parameters are based on user selections.
    const copyOfSelected = [...this.props.selectedOption];
    const copyOfLogoWorks = [...this.props.logoWorkplaces];

    const filterForUserOptions = copyOfLogoWorks.filter(selection =>
      selection.Location.split(' ').some(location =>
        copyOfSelected.includes(location)
      )
    );

    var QRCode = require('qrcode.react');

    // const downloadQR = () => {
    //   const canvas = document.getElementById('123456');
    //   const pngUrl = canvas
    //     .toDataURL('image/png')
    //     .replace('image/png', 'image/octet-stream');
    //   let downloadLink = document.createElement('a');
    //   downloadLink.href = pngUrl;
    //   downloadLink.download = '123456.png';
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    // };

    return (
      <Carousel
        className='Carousel'
        indicators={this.state.indicators}
        controls={this.state.controls}
      >
        <Carousel.Item className='CarouselItem'>
          <img src={mainPicture} alt='logo' className='aw_logo_center'></img>
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
                  alt='companysLogo'
                  className='logoStyle'
                />
              </div>
              <div className='nimike'>
                {workplace.Title}
                {this.props.qrCodeCheck ? (
                  <span className='qrCode'>
                    <QRCode
                      id='123456'
                      value={workplace.Url}
                      size={90}
                      level={'H'}
                      includeMargin={true}
                    />
                  </span>
                ) : null}
              </div>

              <div className='kaupunki'>{workplace.Location}</div>
              <div className='qrCode'></div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  };

  render() {
    return (
      <div>
        {this.props.loading
          ? this.showOnlyCarouselLogo()
          : this.carouselOptions()}
      </div>
    );
  }
}

export default ExpoCarousel;
