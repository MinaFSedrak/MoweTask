
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  TouchableHighlight,
  ListView,
  ActivityIndicator

} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-image-progress';


export default class ListScreen extends Component {

  static navigationOptions = {
    title:'List'
  }

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
    }

  }


  // start fetching method
  componentDidMount(){

    // getting api_id from NavigationDrawer Screen
    var {params} = this.props.navigation.state;
    let api_id = params.api_id;
    console.log('Api ID:  ' + api_id);

    //Movie Api
    if(api_id == 'Movies'){

      var api_url = 'http://api.themoviedb.org/3/movie/popular?api_key=ab7f35103dac044075517a15da238890'

      this.fetchItems(api_url, api_id);

    //News Api
    } else if(api_id == 'News'){

      var api_url = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=af726a83ecbe4b1d92b92adc8df622e6'
      this.fetchItems(api_url, api_id);

    }
  }

  // Network Thread fetching all movies
  fetchItems(api_url, api_id){
    // Movies or News
    //console.log('api ID : ' + api_id);
    fetch(api_url)
    .then((response) => response.json())
    .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(api_id == 'Movies'){
             this.setState({
            isLoading: false,
            moviesDataSource: ds.cloneWithRows(responseJson.results)
          })
        } else if(api_id == 'News'){
            this.setState({
            isLoading: false,
            newsDataSource: ds.cloneWithRows(responseJson.articles)
          })
        }

      })
    .catch((error) => {
       ToastAndroid.show(error.toString(), ToastAndroid.LONG);
      });
  }

  // Method for binding ListView Row
  renderRow(item){
    //console.log('http://image.tmdb.org/t/p/w185/' + item.poster_path);
    var {navigate} = this.props.navigation;
    var {params} = this.props.navigation.state;
    let api_id = params.api_id;

    // Movies Api
    if(api_id == 'Movies'){
      return(
        <TouchableHighlight onPress = {() => navigate("DetailsScreen",
          {backdrop_path: item.backdrop_path,title: item.title,
           overview: item.overview, release_date: item.release_date,
           popularity: item.popularity,api_id: 'Movies'})}
           underlayColor = "grey">

            <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>

              <Image style={{width: 70, height: 70, margin: 5}}
                  indicator={Progress.Pie}
                  source={{uri: 'http://image.tmdb.org/t/p/w185/' + item.poster_path}}
              />

              <Text style ={{margin: 10, fontSize: 18}}>
                    {item.title}
              </Text>

            </View>

        </TouchableHighlight>

      );

    // News Api
    }else if(api_id == 'News'){
      return(

        <TouchableHighlight onPress = {() => navigate("DetailsScreen",
          {urlToImage: item.urlToImage, author: item.author,
           description: item.description, publishedAt: item.publishedAt,
           api_id: 'News'})}
           underlayColor = "grey">

            <View>
               <Text style ={{marginLeft: 10, fontSize: 18, color: 'black', fontWeight: 'bold'}}>
                    Article
               </Text>

               <Text style ={{marginLeft: 10, marginBottom: 20, fontSize: 15, color: 'blue'}}>
                    {item.title}
               </Text>
            </View>

        </TouchableHighlight>

      );
    }

  }


  render() {

    // Getting api ID from NavigationDrawer Screen
    var {params} = this.props.navigation.state;
    let api_id = params.api_id;
    // console.log('api_id: ' + api_id );

    // Show Progress Dialog if Network Thread still parsing Json
    if (this.state.isLoading) {
      return(
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
      );
    }

    // Inflate ListView rows
    // Movies Api
    if(api_id == 'Movies'){
           return (
          <View style={styles.container}>
            <ListView
              dataSource={this.state.moviesDataSource} // get Data From moviesDataSource
              renderRow={this.renderRow.bind(this)} // Binding Returning View from renderRow
            />
          </View>
        );

    // News Api
    }else if(api_id == 'News'){
      return (
          <View style={styles.container}>
            <ListView
              dataSource={this.state.newsDataSource} // get Data From newsDataSource
              renderRow={this.renderRow.bind(this)} // Binding Returning View from renderRow
            />
          </View>
        );
    }
  };
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    paddingTop: 20
  }

})

AppRegistry.registerComponent('ListScreen', () => ListScreen);
