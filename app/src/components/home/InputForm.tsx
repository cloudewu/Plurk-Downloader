import { FormEvent, useState } from 'react';

import { callAPI } from '../../lib/api';

function InputForm() {
  const [inputPlurkInfo, setInputPlurkInfo] = useState('');

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: add input validation
    if (inputPlurkInfo) {
      callAPI(inputPlurkInfo);
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
      </form>
    </div>
  );
}

export default InputForm;
