import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { routes } from '@/lib';

export const retrieveSession =
  (): GetServerSideProps =>
  async ({ req, query }) => {
    const session = await getSession({ req });
    const { page = routes.PAGE_HOME } = query;

    return session
      ? {
          redirect: {
            destination: page.toString(),
            permanent: false,
          },
        }
      : { props: {} };
  };
