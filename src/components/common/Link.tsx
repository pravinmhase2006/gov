import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string;
  to?: string;
  className?: string;
  children?: React.ReactNode;
  replace?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, to, children, className, target, rel, onClick, ...props }, ref) => {
    const destination = to || href || '#';

    // External link handling
    if (
      destination.startsWith('http://') ||
      destination.startsWith('https://') ||
      destination.startsWith('mailto:') ||
      destination.startsWith('tel:')
    ) {
      return (
        <a
          ref={ref}
          href={destination}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={className}
          onClick={onClick}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink
        ref={ref}
        to={destination}
        className={className}
        target={target}
        rel={rel}
        onClick={onClick}
        {...(props as any)}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
