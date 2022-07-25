import fileDownload from 'js-file-download';
import { useCallback } from 'react';

interface Props {
  filename: string;
  content: string;
}

function DownloadButton(props: Props) {
  const { filename, content } = props;

  const onClick = useCallback(() => {
    fileDownload(content, filename);
  }, [filename, content]);

  return (
    <button
      className="px-3 py-2 border border-black/50 rounded-lg"
      type="button"
      onClick={onClick}
    >
      下載
    </button>
  );
}

export default DownloadButton;
