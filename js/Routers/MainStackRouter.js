import { StackNavigator } from 'react-navigation';

import SearchPage from '../components/SearchPage/';
import MapPage from '../components/MapPage';

export default (StackNav = StackNavigator({
  Home: { screen: SearchPage },
  MapPage: { screen: MapPage },
}));
