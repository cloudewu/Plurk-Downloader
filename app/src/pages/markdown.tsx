import Image from 'next/image';
import { ReactElement } from 'react';

import CollapsibleSection from '../components/CollapsibleSection';
import Layout from '../components/Layout';
import Section from '../components/Section';

function MarkdownIntroPage() {
  return (
    <Layout title="Markdown - 噗文轉存器">
      <MarkdownBrief />
      <EasyReadWrite />
      <CommonMD />
      <DemoSection />
    </Layout>
  );
}

function MarkdownBrief() {
  return (
    <Section
      className="my-12"
      header={<>什麼是 Markdown？</>}
      content={(
        <>
          <p>
            <a href="https://markdown.tw/" target="_blank" rel="noreferrer">Markdown</a>
            （縮寫為 MD）是一種輕量化的標記語言。
          </p>
          <p>它的目的是使得純文字的檔案也能夠「易讀易寫」，並且可以輕易地轉換成一般HTML（網頁）格式來進行閱讀。</p>
        </>
      )}
    />
  );
}

function EasyReadWrite() {
  return (
    <CollapsibleSection
      className="my-6"
      header={<>什麼叫易讀易寫？</>}
      content={(
        <>
          <p>
            舉個例子，在Markdown中，我們會用「**粗體**」來代表「
            <b>粗體</b>
            」，用「*斜體*」來代表「
            <i>斜體</i>
            」。
          </p>
          <p>除此之外還有標題、清單、表格、引用……等等清晰好懂的格式，讓文件就算以純文字寫成，也可以有清晰易讀的排版。</p>
          <p>也因為Markdown的易讀性，目前越來越多編輯平台都有支援類Markdown的編寫格式（有些僅部分支援），比如：</p>
          <ul>
            <li>
              <a href="https://plurk.com/" target="_blank" rel="noreferrer">噗浪 Plurk</a>
              （類 MD 語法）
            </li>
            <li>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
              （貼文支援部分 Markdown 格式）
            </li>
            <li>
              <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/about-writing-and-formatting-on-github" target="_blank" rel="noreferrer">Github</a>
              （Readme、PR、Issue 等文件部分支援 Markdown 渲染）
            </li>
          </ul>
          <p>目前也有許多工具可以協助使用者編寫Markdown，並將MD格式以更易閱讀的HTML格式顯示。比如：</p>
          <ul>
            <li>
              <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VS Code</a>
              ：跨平台文字編輯器，除了內建Markdown預覽與編寫功能，亦有
              <a href="https://marketplace.visualstudio.com/search?term=markdown&target=VSCode" target="_blank" rel="noreferrer">豐富擴充功能</a>
              可使用。
            </li>
            <li>
              <a href="https://typora.io/" target="_blank" rel="noreferrer">Typora</a>
              ：風評極佳的 Markdown 編輯器，主打「所見即所得」。
            </li>
            <li>
              <a href="https://hackmd.io/" target="_blank" rel="noreferrer">HackMD.io</a>
              ：Markdown大型多人協作平台，只需要有瀏覽器即可使用，對於不想安裝其餘軟體的使用者來說是個非常棒的選擇。
            </li>
          </ul>
        </>
      )}
      defaultCollapse={false}
    />
  );
}

type MDCase = {
  syntax: string,
  showcase: string | ReactElement,
  syntaxHighlighting: boolean,
  className?: string,
  comment?: string,
}

function CommonMD() {
  const showcases: MDCase[] = [
    {
      syntax: '# 標題', showcase: '標題', className: 'text-2xl font-bold', syntaxHighlighting: true, comment: '一～六級分別對應 1~6 個井字',
    },
    {
      syntax: '**粗體**', showcase: '粗體', className: 'font-bold', syntaxHighlighting: true,
    },
    {
      syntax: '*斜體*', showcase: '斜體', className: 'italic', syntaxHighlighting: true,
    },
    {
      syntax: '[連結標題](https://your.link/)', showcase: <a href="https://your.link/">連結標題</a>, className: 'text-blue-500 hover:underline', syntaxHighlighting: false, comment: '外部連結',
    },
    {
      syntax: '![](/img/plurk_icon.png)', showcase: <Image src="/img/plurk_icon.png" width={20} height={20} alt="Plurk icon" />, syntaxHighlighting: false, comment: '插入圖片',
    },
    {
      syntax: '---', showcase: <hr className="border-black w-16" />, syntaxHighlighting: false, comment: '分隔線',
    },
  ];

  return (
    <CollapsibleSection
      header={<>常見 Markdown 格式</>}
      content={(
        <table>
          <tbody>
            {
              showcases.map((casedata) => {
                const {
                  syntax, showcase, className, syntaxHighlighting, comment,
                } = casedata;

                return (
                  <tr className="h-10" key={syntax}>
                    <td className={`w-60 ${syntaxHighlighting ? className : ''}`}>
                      { syntax }
                    </td>
                    <td className={`w-32 ${className}`}>
                      { showcase }
                    </td>
                    {
                      comment ? <td className="w-72 text-gray-400">{ comment }</td> : null
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      )}
      defaultCollapse={false}
    />
  );
}

function DemoSection() {
  return (
    <CollapsibleSection
      className="my-6"
      header={<>Markdown 範例</>}
      content={(
        <div className="flex">
          <div className="flex-auto mx-2 border border-red-500 h-64" />
          <div className="flex-auto mx-2 border border-red-500 h-64" />
        </div>
      )}
      defaultCollapse={false}
    />
  );
}

export default MarkdownIntroPage;
