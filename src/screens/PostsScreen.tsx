import React, {Component} from 'react';
import {FlatList, Linking, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {NavigationScreenProps} from 'react-navigation';
import redditApi from '../services/redditApi';
import {PostsData} from '../types';
import Loader from '../components';

interface IState {
  posts: PostsData[];
}

export default class PostsScreen extends Component<NavigationScreenProps, IState> {
  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      posts: []
    };
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: `Posts from ${navigation.getParam('topic', 'gaming')}`,
    };
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.getPosts(navigation.getParam('topic', 'gaming'))
  }

  getPosts = async (topic: string) => {
    const posts = await redditApi.fetchPosts(topic);
    this.setState({posts});
  };

  keyExtractor = (item: any) => `${item.url}_${item.score}`;

  renderContent = () => <ScrollView>
    <FlatList
      data={this.state.posts}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
    />
  </ScrollView>;

  renderCardContent = (item: any) => {
    return <View style={styles.textContainer}>
      <Text style={{paddingBottom: 10}}>{item.title}</Text>
      <Text>Score: {item.score}</Text>
    </View>
  }

  renderItem = ({item}: any) => {
    return <TouchableOpacity
      onPress={() => Linking.openURL(item.url)}
      children={
        <Card
          containerStyle={{borderRadius: 10}}
          children={this.renderCardContent(item)}
        />}
    />
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.posts.length > 0 ? this.renderContent() : <Loader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  }
});
