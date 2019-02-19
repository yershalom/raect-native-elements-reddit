import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {Avatar, Card, ThemeProvider, Text} from 'react-native-elements';
import { createStackNavigator, createAppContainer, NavigationScreenProps } from 'react-navigation';
import PostsScreen from './screens/PostsScreen';
import redditApi from './services/redditApi';
import {TopicData, Topics} from './types';
import Loader from './components';

interface IState {
  topics: TopicData[];
}

export class TopicScreen extends Component<NavigationScreenProps, IState> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      topics: []
    }
  }

  static navigationOptions = {
    title: 'Topics',
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = async () => {
    const topics: TopicData[] = await redditApi.fetchTopics();
    this.setState({topics});
  };

  keyExtractor = (item: TopicData) => item.url;

  trimText = (text: string) => (text.length > 32) ? `${text.substring(0, 32)}...` : text;

  renderCardContent = (item: any) => {
    return <View style={styles.cardContainer}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          source={{
            uri: item.icon_img
          }}
        />
      </View>
      <View style={styles.textContainer}>
      <Text style={{paddingBottom: 5}} h4>{item.display_name}</Text>
      <Text>{this.trimText(item.public_description)}</Text>
      </View>
    </View>
  }

  renderItem = ({item}: any) => {
    return <TouchableOpacity onPress={() => this.navigatePostsScreen(item)}
                             children={<Card
      containerStyle={{borderRadius: 10}}
      children={this.renderCardContent(item)}
    />}/>
  };

  navigatePostsScreen = (item: any) => {
    const topic = item.display_name;
    this.props.navigation.navigate('PostsScreen', {
      topic
    })
  }

  renderContent = () => <ScrollView>
    <FlatList
      data={this.state.topics}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
    />
  </ScrollView>;

  render() {
    return (
      <ThemeProvider>
        {
          this.state.topics.length > 0
          ? this.renderContent()
          : <Loader />
        }
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatar: {
    alignItems: 'center',
    alignContent: 'center',
    paddingRight: 10,
    paddingTop: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  }
});

const AppNavigator = createStackNavigator(
  {
    Main: TopicScreen,
    PostsScreen
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
