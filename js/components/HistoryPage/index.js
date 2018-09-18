import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Text,
  List,
  ListItem,
} from 'native-base';

import { StyleSheet } from 'react-native';

import { setSearchSelected } from '../../actions/search';

const styles = StyleSheet.create({
});

class HistoryPage extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: React.PropTypes.object,
    setSearchSelected: React.PropTypes.func,
    searchHistory: React.PropTypes.array,
  };

  state = {
  };

  selectHandle(data) {
    const searchSelected = { ...data };
    this.props.setSearchSelected(searchSelected);
    this.props.navigation.navigate('MapPage');
  }

  render() {
    const { navigation, searchHistory } = this.props;

    let listBlock = null;
    if (searchHistory.length) {
      listBlock = (
        <List
          dataArray={searchHistory.slice(0).reverse()}
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
      );
    } else {
      listBlock = (<Text>Nici un obiect nu este in istorie.</Text>);
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate('DrawerOpen')}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Istorie</Title>
          </Body>
        </Header>
        <Content padder>
          {listBlock}
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setSearchSelected: data => dispatch(setSearchSelected(data)),
  };
}

const mapStateToProps = state => ({
  searchHistory: state.search.history,
});

export default connect(mapStateToProps, bindAction)(HistoryPage);
