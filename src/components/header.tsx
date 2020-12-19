import * as React from 'react';
import constant from 'src/constants';

export default (params: { su: number }) => {
  return React.useMemo(() => {
    return (
      <>
        <header>
          <h1 style={{ fontSize: 20 }}>{constant.title}</h1>
          <p>接続ユーザ数: {params.su}</p>
        </header>
      </>
    );
  }, [params.su]);
};
