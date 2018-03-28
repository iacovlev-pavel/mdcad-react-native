import { StackNavigator } from 'react-navigation';

import SearchPage from '../components/SearchPage/';

export default (StackNav = StackNavigator({
  Home: { screen: SearchPage },
}));
