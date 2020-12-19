import * as React from 'react';
const reactStringReplace = require('react-string-replace');
import moment from 'moment';
moment.locale('ja');

export default (params: {
  uid: string;
  list: {
    uid: string;
    message: string;
    createdAt: number;
  }[];
}) => {
  return React.useMemo(() => {
    const html = params.list.map((m, i) => {
      if (m.uid === params.uid) {
        // 左吹き出し
        return (
          <div key={i}>
            <div className="clearfix">
              <div className="balloon2 float-right">
                {reactStringReplace(
                  m.message,
                  /(https?:\/\/\S+)/g,
                  (match: string, j: number) => (
                    <a
                      href={match}
                      key={match + j}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {match}
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="clearfix">
              <div className="float-right">
                <time style={{ fontSize: 12 }}>
                  {moment(new Date(m.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
                </time>
              </div>
            </div>
            <br />
          </div>
        );
      }

      // 右吹き出し
      return (
        <div key={i}>
          <div style={{ fontSize: 12, color: '#fff' }}>{m.uid}</div>
          <div className="clearfix">
            <div className="balloon1 float-left">
              {reactStringReplace(
                m.message,
                /(https?:\/\/\S+)/g,
                (match: string, j: number) => (
                  <a
                    href={match}
                    key={match + j}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {match}
                  </a>
                )
              )}
            </div>
          </div>
          <div className="clearfix">
            <div>
              <time style={{ fontSize: 12 }}>
                {moment(new Date(m.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
              </time>
            </div>
          </div>
          <br />
        </div>
      );
    });

    return <div className="line-bc">{html}</div>;
  }, [JSON.stringify(params.list)]);
};
