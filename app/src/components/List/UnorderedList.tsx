import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string,
}

function UnorderedList({ children, className }: Props) {
  return (
    <ol className={`list-disc list-outside my-3 mx-6 ${className}`}>
      { children }
    </ol>
  );
}

UnorderedList.defaultProps = {
  className: '',
};

export default UnorderedList;
