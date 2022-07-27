import { ReactElement } from 'react';

interface Props {
  header: ReactElement;
  content: ReactElement;
  className?: string;
}

function Section(props: Props) {
  const { header, content, className } = props;

  return (
    <div className={className}>
      <h3 className="my-4 mb-8 text-3xl text-primary font-bold">
        { header }
      </h3>
      <div className="px-1">
        { content }
      </div>
    </div>
  );
}

Section.defaultProps = {
  className: '',
};

export default Section;
