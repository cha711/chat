import * as React from 'react';
import constant from 'src/constants';
import firebase from 'src/firebase';

export default (params: {
  su: number;
  setLoading: (b: boolean) => void;
  snsLogin: boolean;
}) => {
  return React.useMemo(() => {
    return (
      <>
        <div className="row">
          <div className="col-12 clearfix">
            <div className="float-left">
              <h1 style={{ fontSize: 20 }}>{constant.title}</h1>
            </div>

            <div className="float-right">
              {params.snsLogin === false ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={async () => {
                    // ローディング画面にする
                    params.setLoading(true);

                    // delete connections
                    firebase
                      .database()
                      .ref(constant.table.connections)
                      .child((await firebase.auth().currentUser?.uid) as string)
                      .remove();

                    const provider = new firebase.auth.TwitterAuthProvider();
                    firebase
                      .auth()
                      .signInWithPopup(provider)
                      .then(async result => {
                        location.reload();
                      })
                      .catch(e => location.reload());
                  }}
                >
                  ログイン
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    firebase.database().goOffline();
                    firebase
                      .auth()
                      .signOut()
                      .then(() => {
                        location.reload();
                      })
                      .catch(error => {});
                  }}
                >
                  ログアウト
                </button>
              )}
            </div>
          </div>
        </div>

        <p>接続ユーザ数: {params.su}</p>
        <hr />
      </>
    );
  }, [params.su]);
};
