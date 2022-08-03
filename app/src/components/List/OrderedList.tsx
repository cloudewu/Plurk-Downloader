import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string,
}

function OrderedList({ children, className }: Props) {
  return (
    <ol className={`list-decimal list-outside my-3 mx-8 ${className}`}>
      { children }
    </ol>
  );
}

OrderedList.defaultProps = {
  className: '',
};

export default OrderedList;
