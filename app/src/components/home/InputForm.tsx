import { FormEvent, useState } from 'react';

import { callAPI } from '../../utils/api';

function InputForm() {
  const [inputPlurkInfo, setInputPlurkInfo] = useState<string>('');
  const [result, setResult] = useState<string>('');

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: add input validation
    if (inputPlurkInfo) {
      callAPI(inputPlurkInfo)
        .then((response) => {
          if (response.success === true) {
            setResult(response.response);
          } else {
            setResult(response.reason);
          }
        });
    }
  }

  return (
    <div>
      <form action="/markdown" onSubmit={onFormSubmit}>
        <div className="flex w-full">
          <input
            className={'flex-auto px-2 py-1 border border-gray-300 rounded-l-full border-r-0 '
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
        {
          // TODO: generate a file download
          result ? <div>{ result }</div> : <div>Requst First!</div>
        }
      </form>
    </div>
  );
}

export default InputForm;
