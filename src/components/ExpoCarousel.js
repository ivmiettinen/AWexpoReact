import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import mainPicture from '../Images/AW_logo_main_version_RGB.png'
import '../App.css'
import ClipLoader from 'react-spinners/ClipLoader'

export class ExpoCarousel extends Component {
    constructor() {
        super()
        this.state = {
            indicators: false,
            controls: false,
            selectedOption: '',
            color: 'white',
        }
    }

    loader = () => {
        return (
            <>
                <div className='loader'>
                    Just a sec - Waking up Heroku backend and fetching data...{' '}
                    <p>
                        <ClipLoader
                            color={this.state.color}
                            className='loader'
                            size={200}
                        />
                    </p>
                </div>
            </>
        )
    }

    showOnlyCarouselLogo = () => {
        return (
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
        )
    }

    carouselOptions = () => {
        let QRCode = require('qrcode.react')
        const copyOfSelected = [...this.props.selectedOption]
        const copyOfLogoWorks = [...this.props.logoWorkplaces]
        const filterForUserOptions = copyOfLogoWorks.filter((selection) =>
            selection.Location.split(' ').some((location) =>
                copyOfSelected.includes(location)
            )
        )

        return (
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
                {filterForUserOptions.map((workplace) => {
                    return (
                        <Carousel.Item
                            className='CarouselItem'
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
                                            value={workplace.Url}
                                            size={90}
                                            level={'H'}
                                            includeMargin={true}
                                        />
                                    </span>
                                ) : null}
                            </div>

                            <div className='kaupunki'>{workplace.Location}</div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        )
    }

    render() {
        return (
            <div>
                {this.props.loading ? this.loader() : this.carouselOptions()}
            </div>
        )
    }
}

export default ExpoCarousel
