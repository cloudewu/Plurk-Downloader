import { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
  header: ReactElement | string;
  className?: string;
}

function Section(props: Props) {
  const { header, children, className } = props;

  return (
    <div className={className}>
      <h3 className="my-4 mb-8 text-3xl text-primary font-bold">
        { header }
      </h3>
      <div className="px-1">
        { children }
      </div>
    </div>
  );
}

Section.defaultProps = {
  className: '',
};

export default Section;
