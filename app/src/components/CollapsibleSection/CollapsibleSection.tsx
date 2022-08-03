import { ReactElement, useCallback, useState } from 'react';

import CollapsibleContent from './CollapsibleContent';
import CollapsibleHeader from './CollapsibleHeader';

interface Props {
  header: ReactElement | string;
  content: ReactElement;
  className?: string;
  defaultCollapse?: boolean;
}

function CollapsibleSection(props: Props) {
  const {
    header, content, className, defaultCollapse,
  } = props;
  const [collapsed, setCollapsed] = useState(defaultCollapse);

  const onClick = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <div className={className}>
      <CollapsibleHeader collapsed={collapsed} onClick={onClick}>
        { header }
      </CollapsibleHeader>
      <CollapsibleContent collapsed={collapsed}>
        { content }
      </CollapsibleContent>
    </div>
  );
}

CollapsibleSection.defaultProps = {
  className: '',
  defaultCollapse: false,
};

export default CollapsibleSection;
