import axios from 'axios';
import {Topics} from '../types';

const REDDIT_URL = 'https://www.reddit.com';

const _parseTopics = (topics: any[]) => {
  return topics.map((topic: Topics) => {
    return {
      url: topic['data']['url'],
      display_name: topic['data']['display_name'],
      public_description: topic['data']['public_description'],
      icon_img: (topic['data']['icon_img'])
        ? topic['data']['icon_img']
        : 'https://b.thumbs.redditmedia.com/S6FTc5IJqEbgR3rTXD5boslU49bEYpLWOlh8-CMyjTY.png'
    }
  });
};

const _parsePosts = (posts: any[]) => {
  return posts.map(({data}) => {
    return {
      url: data.url,
      title: data.title,
      score: data.score
    }
  })
};

export class RedditApi {

  fetchTopics = async () => {
    const {data} = await axios.get(`${REDDIT_URL}/subreddits/default.json`);
    const topics = data['data']['children'];
    return _parseTopics(topics);
  };

  fetchPosts = async (topic: string) => {
    const {data} = await axios.get(`${REDDIT_URL}/r/${topic}/hot.json`);
    const posts =  data['data']['children'];
    return _parsePosts(posts);
  };
}

export default new RedditApi();
