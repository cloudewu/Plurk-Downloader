import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

function Card(props: Props) {
  const {
    className, children,
  } = props;

  return (
    <div className={`p-6 border border-gray-300 rounded rounded-xl shadow ${className}`}>
      { children }
    </div>
  );
}

Card.defaultProps = {
  className: '',
};

export default Card;
