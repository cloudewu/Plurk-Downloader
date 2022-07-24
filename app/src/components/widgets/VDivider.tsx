type Props = {
  className?: string;
}

function VDivider({ className }: Props) {
  return (
    <div className={`inline-block px-1 text-white/25 ${className}`}>
      |
    </div>
  );
}

VDivider.defaultProps = {
  className: '',
};

export default VDivider;
