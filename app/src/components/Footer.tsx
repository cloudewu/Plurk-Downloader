import ExtLink from './ExtLink';
import VDivider from './widgets/VDivider';

type Props = {
  className?: string;
}

function Footer({ className }: Props) {
  return (
    <div
      className={`w-full mt-6 mb-3 py-0.5 italic text-sm text-center text-gray-500 ${className}`}
    >
      <hr className="my-3 mx-auto w-2/3 border-black/25" />
      <p>
        Plurk Downloader, 2020 - 2022
        <VDivider className="ml-1 text-black/25 not-italic" />
        <ExtLink href="https://github.com/cloudewu/Plurk-Downloader" title="Plurk Downloader | GitHub">GitHub</ExtLink>
      </p>
    </div>
  );
}

Footer.defaultProps = {
  className: '',
};

export default Footer;
