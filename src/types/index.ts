export interface Topics {
  data: TopicData;
}

export interface TopicData {
  url: string;
  display_name: string;
  public_description: string;
  icon_img: string;
}

export interface Posts {
  data: PostsData;
}

export interface PostsData {
  url: string;
  title: string;
  score: string;
}
