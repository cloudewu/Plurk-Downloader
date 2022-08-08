import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Props {
  className?: string
}

function LoadingIcon({ className }: Props) {
  return (
    <span className={`inline-block opacity-50 animate-spin ${className}`}>
      <FontAwesomeIcon icon={faSpinner} />
    </span>
  );
}

LoadingIcon.defaultProps = {
  className: '',
};

export default LoadingIcon;
