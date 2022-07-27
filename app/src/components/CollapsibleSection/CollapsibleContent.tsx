import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  collapsed: boolean;
  className?: string;
}

function CollapsibleContent(props: Props) {
  const { collapsed, children, className } = props;

  const collapsedCSS = collapsed ? 'max-h-0 overflow-hidden' : 'py-2 max-h-unreachable overflow-auto';

  return (
    <div className={`px-4 transition-max-h duration-500 ease-in-out ${collapsedCSS} ${className}`}>
      { children }
    </div>
  );
}

CollapsibleContent.defaultProps = {
  className: '',
};

export default CollapsibleContent;
