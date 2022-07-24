type Props = {
  className?: string;
}

function WelcomePanel({ className }: Props) {
  return (
    <div className={className}>
      <p>是否經常在河道上、或者話題排行上看見經典的討論噗？</p>
      <p>是否有那麼一種噗，就算已經過了一段時間卻仍讓你回味再三，想時時點開來翻看留言，重新閱讀並思索？</p>
      <p>只要在下方貼上噗文網址，我們就可以幫你轉為純文字檔下載儲存，以供日後瀏覽喔！</p>
      <div className="border border-gray-200 rounded-full">
        <table>
          <tbody>
            <tr>
              <td><span className="text-ps">．</span></td>
              <td>
                <span className="text-ps">
                  文字格式支援Markdown語法，歡迎使用
                  <a href="https://hackmd.io/recent" target="_blank" rel="noreferrer">HackMD</a>
                  等工具增進閱讀體驗。
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

WelcomePanel.defaultProps = {
  className: '',
};

export default WelcomePanel;
