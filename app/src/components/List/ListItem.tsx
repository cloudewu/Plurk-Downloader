import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

function ListItem({ children, className }: Props) {
  return (
    <li className={`pl-1 my-1 ${className}`}>
      { children }
    </li>
  );
}

ListItem.defaultProps = {
  className: '',
};

export default ListItem;
