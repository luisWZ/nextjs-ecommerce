import { Button, Link } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type NavLinksProps = {
  text: string;
  href: string;
};

export const NavLinks = ({ text, href }: NavLinksProps) => {
  const { asPath } = useRouter();

  const isPathActive = useMemo(() => asPath === href, [asPath, href]);

  return (
    <NextLink href={href} legacyBehavior passHref>
      <Link>
        <Button color={isPathActive ? 'secondary' : 'primary'}>{text}</Button>
      </Link>
    </NextLink>
  );
};
