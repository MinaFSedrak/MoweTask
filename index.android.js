
import React, { Component } from 'react';

import {  AppRegistry,  Text,  View, Navigator
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import NavigationDrawer from './app/NavigationDrawerScreen';
import ListScreen from './app/ListScreen';
import DetailsScreen from './app/DetailsScreen';


  const navigation = StackNavigator({
    NavigationDrawerScreen: {screen: NavigationDrawer},
    ListScreen: {screen: ListScreen},
    DetailsScreen: {screen: DetailsScreen}
  });


AppRegistry.registerComponent('FirstApp', () => navigation);
