import React from 'react';
import { AppRegistry, Image, View } from 'react-native';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';

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
              source={require('../../../images/logo_64.png')}
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
      </Container>
    );
  }
}
