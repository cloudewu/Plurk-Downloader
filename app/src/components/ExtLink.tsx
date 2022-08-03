import { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface Props extends PropsWithChildren {
  href: string,
  className?: string,
  title?: string,
}

function ExtLink(props: Props) {
  const {
    children, className, href, title,
  } = props;

  const linkTitle = title || href;

  return (
    <a
      className={`px-1 decoration-dotted underline hover:no-underline ${className}`}
      href={href}
      rel="noreferrer"
      target="_blank"
      title={linkTitle}
    >
      { children }
      <FontAwesomeIcon
        className="relative -bottom-0.5 pl-0.5 text-rxs opacity-75"
        icon={faArrowUpRightFromSquare}
      />
    </a>
  );
}

ExtLink.defaultProps = {
  className: '',
  title: null,
};

export default ExtLink;
