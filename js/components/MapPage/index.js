import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class MapPage extends Component {
  static navigationOptions = {
    header: null,
  };

  getDelta(lat, lon, distance) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    };
  }

  render() {
    const { props: { navigation } } = this;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Hartă</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <MapView
            showsUserLocation
            showsMyLocationButton
            loadingEnabled
            mapType="hybrid"
            style={styles.map}
            initialRegion={this.getDelta(47, 28.85, 40 * 1000)}
          />
        </View>
      </Container>
    );
  }
}

export default MapPage;
