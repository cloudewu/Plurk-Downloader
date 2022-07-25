import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  collapsed: boolean;
  onClick: () => void;
  className?: string;
}

function CollapsibleHeader(props : Props) {
  const {
    collapsed, onClick, className, children,
  } = props;

  const iconCollapsedCSS = collapsed ? 'rotate-0' : 'rotate-180';

  return (
    <button
      className={`sticky top-8 bg-white my-2 py-1 w-full border-b border-primary font-bold text-primary text-left ${className}`}
      type="button"
      onClick={onClick}
    >
      <span className={`inline-block mx-2 transition-transform ease-in-out ${iconCollapsedCSS}`}>
        ︿
      </span>
      <div className="inline-block text-lg">
        { children }
      </div>
    </button>
  );
}

CollapsibleHeader.defaultProps = {
  className: '',
};

export default CollapsibleHeader;
