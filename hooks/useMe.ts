import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';
import { USER_FRAGMENT } from '../fragments';
import { UserType } from '../types';

const ME_QUERY = gql`
  query me {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return data;
}

export default useMe;
