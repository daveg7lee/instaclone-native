import routes from '../routes';

export const goToProfile = (user, navigation) => {
  navigation.navigate(routes.profile, {
    ...user,
  });
};

export const unfollowUserUpdate = (
  cache: any,
  result: any,
  username: string,
  me: any
) => {
  const {
    data: {
      unfollowUser: { success },
    },
  } = result;
  if (success) {
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev: number) {
          return prev - 1;
        },
      },
    });
    cache.modify({
      id: `User:${me?.username}`,
      fields: {
        totalFollowers(prev: number) {
          return prev - 1;
        },
      },
    });
  }
};
export const followUserUpdate = (
  cache: any,
  result: any,
  username: string,
  me: any
) => {
  const {
    data: {
      followUser: { success },
    },
  } = result;
  if (!success) {
    return;
  }
  cache.modify({
    id: `User:${username}`,
    fields: {
      isFollowing() {
        return true;
      },
      totalFollowers(prev: number) {
        return prev + 1;
      },
    },
  });
  cache.modify({
    id: `User:${me?.username}`,
    fields: {
      totalFollowers(prev: number) {
        return prev + 1;
      },
    },
  });
};

export const toggleFollow = async (
  isFollowing,
  unfollowUserMutation,
  followUserMutation
) => {
  if (isFollowing) {
    await unfollowUserMutation();
  } else {
    await followUserMutation();
  }
};
