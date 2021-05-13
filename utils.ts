import routes from './routes';

export const goToProfile = (user, navigation) => {
  navigation.navigate(routes.profile, {
    ...user,
  });
};
