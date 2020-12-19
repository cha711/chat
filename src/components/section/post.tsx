import * as React from 'react';

export default (params: {
  message: string;
  setMessage: (m: string) => void;
  post: () => Promise<void>;
}) => {
  return React.useMemo(() => {
    return (
      <>
        <div className="form-group">
          <textarea
            style={{ maxWidth: 400, margin: '0 auto' }}
            className="form-control"
            id="textarea"
            placeholder="メッセージ 150文字以内"
            maxLength={150}
            value={params.message}
            rows={3}
            onChange={e => params.setMessage(e.target.value)}
            onKeyDown={e => (e.keyCode === 13 ? params.post() : '')}
          ></textarea>
        </div>

        <div className="text-center">
          <button className="btn btn-primary" onClick={() => params.post()}>
            投稿
          </button>
        </div>
      </>
    );
  }, [params.message]);
};
