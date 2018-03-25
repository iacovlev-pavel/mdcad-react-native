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

import MapPage from '../MapPage';
import DrawBar from '../DrawBar';

import { openDrawer } from '../../actions/drawer';
import { setSearchResult, setSearchSelected } from '../../actions/search';

const styles = {
  container: {
    backgroundColor: '#FBFAFA',
  },
};

class SearchPage extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    openDrawer: React.PropTypes.func,
    setSearchResult: React.PropTypes.func,
    setSearchSelected: React.PropTypes.func,
    searchResult: React.PropTypes.array,
    searchSelected: React.PropTypes.any,
  };

  paramsSerialize(params) {
    return Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&'); // eslint-disable-line prefer-template
  }

  searchFetch(text) {
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

    return fetch('https://www.cadastru.md/ecadastru/webinfo/wwv_flow.show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.paramsSerialize(params),
    }).then(response => response.text()).then((response) => {
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
    });
  }

  async searchHandle(text) {
    const searchResult = await this.searchFetch(text);
    this.props.setSearchResult(searchResult);
  }

  selectHandle(data) {
    console.warn('selectHandle', data);
  }

  render() {
    const { searchResult } = this.props;

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
            <Input placeholder="Adresa sau cod cadastral" onChangeText={(text) => { this.searchHandle(text); }} />
            <Icon active name="search" />
          </Item>
          <List
            dataArray={searchResult}
            renderRow={(data) => {
              return (
                <ListItem
                  button
                  onPress={() => this.selectHandle(data)}
                >
                  <Text>{data.address}</Text>
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
    openDrawer: () => dispatch(openDrawer()),
    setSearchResult: data => dispatch(setSearchResult(data)),
    setSearchSelected: data => dispatch(setSearchSelected(data)),
  };
}

const mapStateToProps = state => ({
  searchResult: state.search.searchResult,
  searchSelected: state.search.searchSelected,
});

const SearchPageSwagger = connect(mapStateToProps, bindAction)(SearchPage);

const DrawNav = DrawerNavigator(
  {
    Home: { screen: SearchPageSwagger },
    MapPage: { screen: MapPage },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
  }
);
let DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null,
  };
};
export default DrawNav;
