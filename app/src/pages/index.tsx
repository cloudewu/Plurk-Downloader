import { FormEvent, useCallback, useState } from 'react';
import fileDownload from 'js-file-download';

import Card from '../components/Card';
import CollapsibleSection from '../components/CollapsibleSection';
import DownloadButton from '../components/widgets/DownloadButton';
import Layout from '../components/Layout';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import { MDInfo, callAPI } from '../utils/api';

function HomePage() {
  return (
    <Layout title="首頁 - 噗文轉存器">
      <SectionWelcome />
      <SubmitForm />
      <SectionIntro />
      <SectionFeature />
      <SectionFAQ />
    </Layout>
  );
}

function SectionWelcome() {
  return (
    <Section
      className="my-12"
      header="噗文轉存器"
      content={(
        <>
          <p>是否經常在河道上、或者話題排行上看見經典的討論噗？</p>
          <p>是否有那麼一種噗，就算已經過了一段時間卻仍讓你回味再三，想時時點開來翻看留言，重新閱讀並思索？</p>
          <p>只要在下方貼上噗文網址，我們就可以幫你轉為純文字檔下載儲存，以供日後瀏覽喔！</p>
          <SectionMDTips />
        </>
      )}
    />
  );
}

function SectionMDTips() {
  return (
    <div className="my-4 px-2 text-gray-500 text-sm">
      <span className="inline-block w-2">·</span>
      <p className="inline-block py-0">
        文字格式支援 Markdown 語法，歡迎使用
        <a className="underline hover:no-underline mx-1" href="https://hackmd.io/recent/" target="_blank" rel="noreferrer">
          HackMD
        </a>
        等工具增進閱讀體驗！
      </p>
    </div>
  );
}

type QueryStatus = 'idle' | 'pending' | 'success' | 'error';

function SubmitForm() {
  const [inputPlurkInfo, setInputPlurkInfo] = useState<string>('');
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [result, setResult] = useState<MDInfo>(null);

  const onFormSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    // TODO: add input validation
    if (!inputPlurkInfo) return;

    setStatus('pending');
    callAPI(inputPlurkInfo)
      .then((res) => {
        if (res.success === true) {
          const { data } = res;

          setStatus('success');
          setResult(data);
          fileDownload(data.content, `${data.title}.md`);
        } else {
          setStatus('error');
          setResult(res.reason);
        }
      });
  }, [inputPlurkInfo, setStatus, setResult]);

  return (
    <Card className="my-4">
      <div>
        <p>在下方輸入噗文網址或 ID，並點擊送出：</p>
      </div>
      <form
        className="my-4"
        action="/markdown"
        onSubmit={onFormSubmit}
      >
        <div className="flex w-full">
          <input
            className={'flex-auto px-4 py-1 border border-gray-300 rounded-l-full border-r-0 '
                       + 'bg-transparent outline-none focus:outline-none'}
            type="text"
            placeholder="https://www.plurk.com/p/xxxxx"
            value={inputPlurkInfo}
            onChange={(e) => setInputPlurkInfo(e.target.value)}
          />
          <button
            className={'flex-initial px-2 border border-primary rounded-r-full '
                       + 'bg-primary text-sm text-white'}
            type="submit"
          >
            送出
          </button>
        </div>
      </form>
      {
        /* eslint-disable no-nested-ternary */
        // TODO: refactor
        status === 'pending' ? <p>Requesting...</p>
          : status === 'success' ? <DownloadButton filename={`${result.title}.md`} content={result.content} />
            : status === 'error' ? <p>Request failed</p>
              : null
      }
    </Card>
  );
}

function SectionIntro() {
  return (
    <CollapsibleSection
      className="mt-6"
      header="這是什麼？"
      content={(
        <>
          <p>
            由於噗浪的網頁的特殊性，
            一般的網頁閱讀工具通常無法完整地抓取所有留言以供閱讀與備份，
            若要將整則噗完整截圖、或者直接將網頁原始檔下載下來進行保存，
            又容易產生多個檔案不易整理，亦相當占空間。
          </p>
          <p>
            在噗文轉存器中，我們提供使用者一個輕便的噗文儲存方式，
            只要貼上該噗網址，我們就會將內容及留言擷取下來，轉換為純文字格式供使用者進行閱讀與儲存，
            由於是純文字，轉換後的txt檔不會站太大空間
            （經過實測，2000則留言的噗文下載後僅需要490KB！），
            所以無論是作為備份亦或攜帶都十分方便。
          </p>
        </>
      )}
    />
  );
}

function SectionFeature() {
  return (
    <CollapsibleSection
      className="mt-4"
      header="功能介紹"
      content={(
        <>
          <p>
            在上方的輸入欄貼上噗文網址，點擊送出後，即可在彈出頁面中檢視純文字結果，於下載頁面的右方點擊懸浮的 Download 按鈕即可進行下載。
          </p>
          <p>
            ps. 目前
            <b>不支援</b>
            私噗抓取
          </p>
        </>
      )}
    />
  );
}

function SectionFAQ() {
  return (
    <CollapsibleSection
      className="mt-4"
      header="常見問題"
      content={(
        <>
          <SubSection
            header="圖片跟表符會被保存下來嗎？"
            content={(
              <>
                <p>
                  不會。因為我們希望做到的是輕量化純文字，所以圖片並不會一起被下載，
                  也因此我們才能維持如此迷你易攜帶的檔案大小。
                </p>
                <p>
                  不過，儘管圖片不會一起被下載，但圖片網址會被保存！
                  若有需要，使用者可以透過網址查看圖片內容。
                  在上方的輸入欄貼上噗文網址，點擊送出後，即可在彈出頁面中檢視純文字結果，
                  於下載頁面的右方點擊懸浮的 Download 按鈕即可進行下載。
                </p>
              </>
            )}
          />
          <SubSection
            header="為什麼我點擊送出後顯示錯誤？"
            content={(
              <>
                <p>
                  可以檢查噗文網址是否正確，以及未登入者是否有權限存取。
                  目前需要登入才能查看的噗是不支援轉存的，比如私噗與私人河道上的噗。
                </p>
                <p>若您很確定網址正確且並非私噗，希望您能協助填寫問題回報，十分感謝！</p>
              </>
            )}
          />
          <SubSection
            header="我送出後顯示成功，但什麼都沒出現。"
            content={(
              <p>
                轉存結果預設會以新分頁開啟，若未出現可能是瀏覽器攔截了彈出視窗，
                請手動點擊輸入欄下的連結即可。
              </p>
            )}
          />
          <SubSection
            header="我遇到了未知的問題，我懷疑你們網站有Bug。"
            content={(
              <>
                <p className="text-black/25 text-xs line-through">
                  It&lsquo;s not a bug; it&lsquo;s a feature.
                </p>
                <p>開玩笑的，很抱歉讓您有不愉快的體驗，</p>
                <p>
                  但人生就是這樣，總會碰上些莫可奈何——
                  若您願意花費一點時間幫我們填寫問題回報，我們會十分感激。
                </p>
              </>
            )}
          />
        </>
      )}
    />
  );
}

export default HomePage;
