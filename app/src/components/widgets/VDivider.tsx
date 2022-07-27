type Props = {
  className?: string;
}

function VDivider({ className }: Props) {
  return (
    <span className={`inline-block px-1 ${className}`}>
      |
    </span>
  );
}

VDivider.defaultProps = {
  className: '',
};

export default VDivider;
