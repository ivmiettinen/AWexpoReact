import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css'

import Select from 'react-select'

//Styles for QRCode:

//Styles for React Select:
const styleForReactSelect = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#white',
        }
    },

    control: (base, state) => ({
        ...base,
        background: 'rgb(5, 212, 142)',
        borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
        borderColor: 'rgb(5, 212, 142)',

        '&:hover': {
            borderColor: 'green',
            color: 'green',
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
        background: 'green',
    }),
    menuList: (base) => ({
        ...base,
        padding: 0,
        background: '#049a78',
        color: 'white',
    }),
}

const styleForButton = {
    boxShadow: 'none',
    color: 'white',
    fontFamily: 'Awesome',
}

export class DropdownMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedOption: null,
        }
    }

    handleLocationChange = (selectedOption) => {
        this.setState({ selectedOption })

        if (selectedOption !== null) {
            const userChoice = selectedOption.map((param) => {
                return param.Location
            })
            this.props.addNew(userChoice)
        } else {
            this.props.addNew([])
        }
    }

    render() {
        const { selectedOption } = this.state

        return (
            <div className='multiSelectContainer '>
                <Dropdown>
                    <Dropdown.Toggle
                        style={styleForButton}
                        variant='yellow'
                        className='DropdownToggle'
                    >
                        Hakuehdot
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='DropdownMenu1'>
                        <Select
                            styles={styleForReactSelect}
                            value={selectedOption}
                            onChange={this.handleLocationChange}
                            isMulti
                            isSearchable
                            placeholder='Write or pick'
                            options={this.props.noDuplicates}
                            getOptionLabel={(option) => option.Location}
                            getOptionValue={(option) => option.Location}
                        />

                        <Dropdown.Item
                            className='DropdownItem'
                            href='#/action-2'
                        >
                            QRcode{' '}
                            <input
                                className='qrCodeCheckbox'
                                name='qrCodeCheck'
                                type='checkbox'
                                defaultChecked={this.props.qrCodeCheck}
                                value={!this.props.qrCodeCheck}
                                onChange={this.props.handleQRcodeChange}
                            />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default DropdownMenu
