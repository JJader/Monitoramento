import React from 'react';
import { Text, View } from 'react-native';
import { UrlTile } from 'react-native-maps'

const TileComponent = () => (
  <UrlTile
    urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
    maximumZ={25}
    zIndex={-3}
  />
);

export default TileComponent;
