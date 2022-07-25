type Props = {
  className?: string;
}

function VDivider({ className }: Props) {
  return (
    <div className={`inline-block px-1 ${className}`}>
      |
    </div>
  );
}

VDivider.defaultProps = {
  className: '',
};

export default VDivider;
