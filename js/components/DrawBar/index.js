import React from 'react';
import { AppRegistry, Image, View } from 'react-native';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';

const packageJson = require('../../../package.json');

const routes = [
  { component: 'Home', title: 'Căutare' },
  { component: 'MapPage', title: 'Hartă' },
  { component: 'CoordinatesPage', title: 'Coordonate' },
  { component: 'HistoryPage', title: 'Istorie' },
];

const styles = {
  logoContainer: {
    height: 80,
    backgroundColor: '#71E2EF',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: 64,
    width: 64,
  },
  version: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
};

export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.logoContainer}>
            <Image
              square
              style={styles.logoImage}
              source={require('../../../images/icon_64.png')}
            />
          </View>
          <List
            dataArray={routes}
            renderRow={(data) => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.component)}
                >
                  <Text>{data.title}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
        <View style={styles.version} padder>
          <Text style={{ color: '#9E9E9E' }}>{packageJson.name} - {packageJson.version}</Text>
        </View>
      </Container>
    );
  }
}
