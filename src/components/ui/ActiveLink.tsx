import { Button, Link, SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type NavLinksProps = {
  text: string;
  href: string;
};

const nonActiveStyles: SxProps = {
  backgroundColor: 'rgba(0,0,0,0.0)',
  color: grey[900],
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease-in-out',
  },
};

export const NavLinks = ({ text, href }: NavLinksProps) => {
  const { asPath } = useRouter();

  const isPathActive = useMemo(() => asPath === href, [asPath, href]);

  return (
    <NextLink href={href} legacyBehavior passHref>
      <Link>
        <Button
          sx={isPathActive ? {} : nonActiveStyles}
          color={isPathActive ? 'secondary' : 'primary'}
        >
          {text}
        </Button>
      </Link>
    </NextLink>
  );
};
