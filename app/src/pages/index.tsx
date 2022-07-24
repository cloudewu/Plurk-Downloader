import * as React from 'react';

function IndexPage() {
  const val: number = 5;

  return (
    <div className="text-red my-5">
      <p>Hello page!</p>
      <p>{ val }</p>
    </div>
  );
}

export default IndexPage;
