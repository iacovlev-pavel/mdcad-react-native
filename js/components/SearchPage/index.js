import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Item,
  Input,
  List,
  ListItem,
} from 'native-base';
import proj4 from 'proj4';
import debouncePromise from '../debouncePromise';

import DrawBar from '../DrawBar';
import MapPage from '../MapPage';
import CoordinatesPage from '../CoordinatesPage';
import HistoryPage from '../HistoryPage';

import { setSearchText, setSearchResult, setSearchSelected } from '../../actions/search';

proj4.defs('EPSG:4026', '+proj=tmerc +lat_0=0 +lon_0=28.4 +k=0.9999400000000001 +x_0=200000 +y_0=-5000000 +ellps=GRS80 +units=m +no_defs');

const styles = {
  container: {
    backgroundColor: '#FBFAFA',
  },
};

let DrawerNav = null;

class SearchPage extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: React.PropTypes.object,
    setSearchText: React.PropTypes.func,
    setSearchResult: React.PropTypes.func,
    setSearchSelected: React.PropTypes.func,
    searchText: React.PropTypes.string,
    searchResult: React.PropTypes.array,
    searchSelected: React.PropTypes.object,
  };

  state = {
  };

  componentWillMount() {
    this.props.setSearchSelected(null);
  }

  searchFetchDebounced = debouncePromise(fetch, 50);

  paramsSerialize(params) {
    return Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&'); // eslint-disable-line prefer-template
  }

  async searchFetch(text) {
    //
    const params = {
      p_request: 'APPLICATION_PROCESS=jQuery_Auto',
      p_instance: 826170114501181,
      p_flow_id: 100,
      p_flow_step_id: 1,
      x01: text,
      x02: 'f',
      x03: 11,
      x04: 1,
    };
    const request = await this.searchFetchDebounced('https://www.cadastru.md/ecadastru/webinfo/wwv_flow.show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.paramsSerialize(params),
    });
    if (request.bodyUsed) {
      return [];
    }
    const response = await request.text();

    //
    const result = [];
    const re = /(\d+)\s:\s(.*)/g;
    let m;
    while ((m = re.exec(response)) !== null) { // eslint-disable-line no-cond-assign
      if (m.index === re.lastIndex) {
        re.lastIndex++; // eslint-disable-line no-plusplus
      }
      result.push({
        key: m[1],
        address: m[2].split(', ').reverse().join(', '),
      });
    }
    return result;
  }

  async geometryFetch(key) {
    const params = {
      p_request: 'APPLICATION_PROCESS=GET_OBJ_DATA',
      p_instance: 956637105435086,
      p_flow_id: 100,
      p_flow_step_id: 1,
      x01: key.substring(0, 4),
      x02: key.substring(0, 2),
      x03: key.substring(2, 4),
      x04: key.substring(4, 5),
      x05: key.substring(5, 7),
      x06: key.substring(7, key.length),
      x07: '',
    };
    const request = await fetch('https://www.cadastru.md/ecadastru/webinfo/wwv_flow.show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.paramsSerialize(params),
    });
    const response = await request.text();

    //
    const cadastre = response.substring(10, response.length - 2).split(',').map(coordinates => coordinates.trim().split(' ').map(parseFloat));
    const google = cadastre.map((coordinates) => {
      const wgs84Coordinates = proj4('EPSG:4026', 'EPSG:4326', [coordinates[0], coordinates[1]]);
      return {
        latitude: wgs84Coordinates[1],
        longitude: wgs84Coordinates[0],
      };
    });
    google.pop();
    return {
      cadastre,
      google,
    };
  }

  async searchHandle(text) {
    this.props.setSearchText(text);
    if (text) {
      const result = await this.searchFetch(text);
      this.props.setSearchResult(result);
    } else {
      this.props.setSearchResult([]);
    }
  }

  async selectHandle(data) {
    const searchSelected = { ...data };
    searchSelected.geometry = await this.geometryFetch(data.key);
    this.props.setSearchSelected(searchSelected);
    this.props.navigation.navigate('MapPage');
  }

  render() {
    const { searchText, searchResult } = this.props;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => DrawerNav.navigate('DrawerOpen')}
            >
              <Icon active name="menu" />
            </Button>
          </Left>

          <Body>
            <Title>Căutare</Title>
          </Body>
        </Header>
        <Content padder>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Adresa sau cod cadastral" onChangeText={(data) => { this.searchHandle(data); }}>{searchText}</Input>
            <Icon button active name="backspace" onPress={() => this.searchHandle('')} />
          </Item>
          <List
            dataArray={searchResult}
            renderRow={(data) => {
              return (
                <ListItem
                  button
                  onPress={() => this.selectHandle(data)}
                >
                  <Text>{data.address} - {data.key}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setSearchText: data => dispatch(setSearchText(data)),
    setSearchResult: data => dispatch(setSearchResult(data)),
    setSearchSelected: data => dispatch(setSearchSelected(data)),
  };
}

const mapStateToProps = state => ({
  searchText: state.search.text,
  searchResult: state.search.result,
  searchSelected: state.search.selected,
});

const SearchPageSwagger = connect(mapStateToProps, bindAction)(SearchPage);

const DrawNav = DrawerNavigator( // eslint-disable-line new-cap
  {
    Home: { screen: SearchPageSwagger },
    MapPage: { screen: MapPage },
    CoordinatesPage: { screen: CoordinatesPage },
    HistoryPage: { screen: HistoryPage },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
  }
);

DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null,
  };
};
export default DrawNav;
