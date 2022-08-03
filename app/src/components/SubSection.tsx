import { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
  header: ReactElement | string;
  className?: string;
}

function SubSection(props: Props) {
  const { header, children, className } = props;

  return (
    <div className={className}>
      <h3 className="mt-3 mb-2 text-md text-primary font-bold">
        { header }
      </h3>
      <div>
        { children }
      </div>
    </div>
  );
}

SubSection.defaultProps = {
  className: '',
};

export default SubSection;
