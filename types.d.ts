import { ParamListBase } from '@react-navigation/routers';
import { StackNavigationProp } from '@react-navigation/stack';

export type RouteProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

export type UserType = {
  id: number;
  avatar?: string;
  username: string;
};

export type PhotoType = {
  id: number;
  user: UserType;
  caption: string;
  file: string;
  isLiked: boolean;
  likes: number;
  commentNumber: number;
};
