import * as React from 'react';

import { useCustomHooks } from 'src/hooks';

import Loading from 'src/components/loading';
import Header from 'src/components/header';
import Post from 'src/components/section/post';
import List from 'src/components/section/list';
import Sidebar from 'src/components/sidebar';
import Footer from 'src/components/footer';

import firebase from 'src/firebase';

export default () => {
  const { state, init, post } = useCustomHooks();

  const [snsLogin, setSnsLoing] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        // 匿名ログイン
        await firebase.auth().signInAnonymously();
        return;
      }

      data.providerData.length !== 0 ? setSnsLoing(true) : '';
      init({ uid: (await firebase.auth().currentUser?.uid) as string });
    });
  }, []);

  if (state.loading[0]) {
    return <Loading />;
  }

  return (
    <div id="_wrap">
      <header>
        <Header
          su={state.su[0]}
          setLoading={state.loading[1]}
          snsLogin={snsLogin}
        />
      </header>

      <main>
        <div className="row">
          <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
            <section>
              <Post
                message={state.message[0]}
                setMessage={state.message[1]}
                uname={state.uname[0]}
                setUname={state.uname[1]}
                post={post}
              />
              <List uid={state.uid[0]} list={state.list[0]} />
            </section>
          </article>
          <aside className="col-xs-0 col-sm-0 col-md-0 col-lg-3 col-xl-3">
            <Sidebar />
          </aside>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
