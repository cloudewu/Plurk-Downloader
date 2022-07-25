import { ReactElement } from 'react';

interface Props {
  header: ReactElement;
  content: ReactElement;
  className?: string;
}

function SubSection(props: Props) {
  const { header, content, className } = props;

  return (
    <div className={className}>
      <h3 className="mt-3 mb-2 text-md text-primary font-bold">
        { header }
      </h3>
      <div className="">
        { content }
      </div>
    </div>
  );
}

SubSection.defaultProps = {
  className: '',
};

export default SubSection;
