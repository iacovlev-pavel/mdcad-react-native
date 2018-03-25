import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Polygon } from 'react-native-maps';

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

  static propTypes = {
    navigation: React.PropTypes.object,
    searchSelected: React.PropTypes.any,
  };

  state = {
    region: null,
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

  searchZoom() {
    const { searchSelected } = this.props;
    if (!searchSelected) {
      return;
    }
    this.map.fitToCoordinates(searchSelected.geometry.google, {
      animated: false,
    });
  }

  render() {
    const { navigation, searchSelected } = this.props;

    let searchSelectedPolygon = null;
    if (searchSelected) {
      searchSelectedPolygon = (
        <Polygon
          key={searchSelected.key}
          coordinates={searchSelected.geometry.google}
          strokeColor="#FF0000"
          fillColor="rgba(255,0,0,0.1)"
          strokeWidth={2}
        />
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
            ref={(ref) => { this.map = ref; }}
            onMapReady={() => { this.searchZoom(); }}
          >
            {searchSelectedPolygon}
          </MapView>
        </View>
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

export default connect(mapStateToProps, bindAction)(MapPage);
