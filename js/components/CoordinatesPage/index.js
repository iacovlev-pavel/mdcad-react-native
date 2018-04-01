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
  Right,
  Body,
  Text,
  List,
  ListItem,
} from 'native-base';

import { StyleSheet, Share } from 'react-native';

const styles = StyleSheet.create({
});

class CoordinatesPage extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: React.PropTypes.object,
    searchSelected: React.PropTypes.any,
  };

  state = {
  };

  shareText() {
    const { searchSelected } = this.props;
    if (!searchSelected) {
      return '';
    }

    let index = 0;
    return searchSelected.geometry.cadastre.map((coordinate) => {
      index += 1;
      return `${index < 10 ? '0' + index : '' + index}\t${coordinate[0].toFixed(2)}\t${coordinate[1].toFixed(2)}`; // eslint-disable-line prefer-template
    }).join('\n');
  }

  share() {
    const content = {
      title: 'Coordonate',
      message: this.shareText(),
    };
    Share.share(content);
  }

  render() {
    const { navigation, searchSelected } = this.props;

    let listBlock = null;
    if (searchSelected) {
      let index = 0;
      listBlock = (
        <List
          dataArray={searchSelected.geometry.cadastre}
          renderRow={(coordinate) => {
            index += 1;
            return (
              <ListItem>
                <Text>{index < 10 ? `0${index}` : `${index}`} - {coordinate[0].toFixed(2)} - {coordinate[1].toFixed(2)}</Text>
              </ListItem>
            );
          }}
        />
      );
    } else {
      listBlock = (
        <Text>Nici un obiect nu este selectat.</Text>
      );
    }

    let shareButton = null;
    if (searchSelected) {
      shareButton = (
        <Button
          transparent
          onPress={() => this.share()}
        >
          <Icon name="share" />
        </Button>
      );
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
            <Title>Coordonate</Title>
          </Body>
          <Right>
            {shareButton}
          </Right>
        </Header>
        <Content padder>
          {listBlock}
        </Content>
      </Container>
    );
  }
}

function bindAction(/* dispatch */) {
  return {
  };
}

const mapStateToProps = state => ({
  searchSelected: state.search.selected,
});

export default connect(mapStateToProps, bindAction)(CoordinatesPage);
