
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  ScrollView

} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-image-progress';



export default class Details extends Component {

  static navigationOptions = {
    title:'Details'
  }




  render() {
      var {params} = this.props.navigation.state;
      let api_id = params.api_id;

      // Movie Api Layout
      if(api_id == 'Movies'){
         return (
          <ScrollView>

            <View style={{paddingTop: 20}}>

              <View style={styles.container}>

                    <Image style={styles.image}
                           indicator={Progress.Pie}
                        source={{uri: 'http://image.tmdb.org/t/p/w185/' + params.backdrop_path}}
                    />

                     <Text style ={{margin: 10, fontSize: 25}}>
                              {params.title}
                    </Text>

                     <Text style ={{margin: 10, fontSize: 18, textAlign: 'center'}}>
                          {params.overview}
                    </Text>

                    <Text style ={styles.text}>
                           Release Date {params.release_date}
                    </Text>

                    <Text style ={styles.text}>
                          Popularity {params.popularity}
                    </Text>

              </View>

            </View>

        </ScrollView>

        );

      // News Api layout
      }else if(api_id == 'News'){
        return(

        <ScrollView>

            <View style={{paddingTop: 20}}>

              <View style={styles.container}>

                <Image style={styles.image}
                       indicator={Progress.Pie}
                    source={{uri: params.urlToImage}}
                />

                 <Text style ={{margin: 10, fontSize: 25}}>
                          {params.author}
                </Text>

                 <Text style ={styles.text}>
                      {params.description}
                </Text>

                <Text style ={styles.text}>
                       Published at {params.publishedAt}
                </Text>

              </View>

            </View>

        </ScrollView>


        );
      }




  };
}

const styles = StyleSheet.create({

  container:{
      flexDirection: 'column',
      alignItems: 'center'
  },

  image:{
      width: 150,
      height: 150,
      margin: 5
  },

  text:{
      margin: 10,
      fontSize: 15,
      textAlign: 'center'
  }

})

AppRegistry.registerComponent('Details', () => Details);
