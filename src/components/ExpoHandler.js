// import React, { Component } from 'react';

// import Expo from './Expo';

// export default class ExpoHandler extends Component {
//   render() {
//     let hoimoi = this.props.selectedOption;

//     if (hoimoi !== null) {
//       hoimoi.map(city => {
//         console.log('IF:', city.Location);

//         return city.Location;
//       });
//     }

//     // this.setState({ selectedOption: hoimoi });

//     // let candidates = this.handleTopCandidates();

//     console.log('hoimoi', hoimoi);

//     // hei();

//     // function hei() {
//     //   if (hoimoi !== null) {
//     //     hoimoi.map(city => {
//     //       return city.Location;
//     //     });
//     //   }
//     // }

//     // console.log('Hei', hei);
//     // if(hoimoi !== null)

//     // console.log('mapPickedLocations:', mapPickedLocations);

//     //OnlyWithLogoFilter on apumuuttuja, joka filtteröi pois työpaikat,
//     //joilla ei ole logoa näkyvissä.

//     let OnlyWithLogoFilter = workplace => {
//       if (workplace.LogoAbsoluteUrl !== '') {
//         return workplace;
//       }
//     };

//     //let props suorittaa itse filtteröinnin.

//     let ExpoSuggestionsFilter = this.props.workplaces.filter(
//       OnlyWithLogoFilter
//     );

//     console.log('onlywithLogo:', ExpoSuggestionsFilter);

//     let suggestionsMap = ExpoSuggestionsFilter.map(workplace => {
//       return workplace.Location;
//     });

//     console.log('suggestionsMap:', suggestionsMap);

//     let onlyOneCity = Array.from(new Set(suggestionsMap));

//     console.log('onlyOneCity', onlyOneCity);

//     //FilteredContacts filtteröi työpaikat halutun kaupungin
//     //mukaan.

//     // let onlyLocation2 = this.state.selectedOption.map(lokaatio => {
//     //   console.log('onkoArray:', onlyLocation2);
//     //   return lokaatio.Location;
//     // });

//     // console.log(
//     //   'onkoArray:',
//     //   this.state.selectedOption.map(lokaatio => {
//     //     return lokaatio.Location;
//     //   })
//     // );

//     let filteredContacts = ExpoSuggestionsFilter.filter(workplace => {
//       return (
//         workplace.Location.toLowerCase().indexOf(
//           this.state.search.toLocaleLowerCase()
//         ) !== -1
//       );
//     });

//     return (
//       <div>
//         <Expo
//           filteredContacts={this.filteredContacts}
//           workplaces={this.props.workplaces}
//           search={this.props.search}
//           loading={this.props.loading}
//           suggestions={this.props.suggestions}
//           selectedOption={this.props.selectedOption}
//         />
//       </div>
//     );
//   }
// }
