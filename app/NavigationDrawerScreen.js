
import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        DrawerLayoutAndroid,
        TouchableHighlight

} from 'react-native';


export default class Navigation_drawer extends Component {

  static navigationOptions = {
    title:'Main'
  }

  render() {

    var {navigate} = this.props.navigation;

    // NavigationView Items
    // Movies - News
    var navigationView = (
        <View style={{flex: 1}}>

           <TouchableHighlight onPress = {() => navigate("ListScreen", {api_id: "Movies"})} underlayColor = "grey">

              <Text style={[styles.navigationViewText, styles.redColor]}>
                             Movies
              </Text>

           </TouchableHighlight>


           <TouchableHighlight onPress = {() => navigate("ListScreen",{api_id: "News"} )}underlayColor = "grey">

              <Text style={[styles.navigationViewText, styles.blueColor]}>
                            News
              </Text>

           </TouchableHighlight>

        </View>
    );


    return (
      <DrawerLayoutAndroid
        drawerWidth={200}
        drawerBackgroundColor="#FFFFFF"
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>


        <View style={{flex: 1, alignItems: 'center'}}>

          <Text style={{color:"black", margin: 50, fontSize: 20, textAlign: 'right',
            fontWeight: 'bold'}}>
                         Open Navigation Drawer
          </Text>

          <Text style={[styles.drawerText, styles.redColor]}>
                         Movie API
          </Text>

          <Text style={[styles.drawerText, styles.blueColor]}>
                         News API
          </Text>

        </View>

      </DrawerLayoutAndroid>
    );
  }
}


const styles = StyleSheet.create({

  drawerText: {
    margin: 10,
    fontSize: 15,
    textAlign: 'right',
    fontWeight: 'bold'
  },

  navigationViewText:{
    margin: 10,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  redColor:{
    color: 'red'
  },

  blueColor:{
    color: 'blue'
  }




});

AppRegistry.registerComponent('Navigation_drawer', () => Navigation_drawer);
