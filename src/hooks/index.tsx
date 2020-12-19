import * as React from 'react';
import * as _ from 'lodash';
import firebase from 'src/firebase';
import constant from 'src/constants';
import { pushNotification } from 'src/util';

export const useCustomHooks = () => {
  const state = {
    uid: React.useState(''),
    uname: React.useState('名無し'),
    loading: React.useState(true),
    list: React.useState(
      [] as {
        uid: string;
        message: string;
        createdAt: number;
      }[]
    ),
    message: React.useState(''),
    su: React.useState(0),
  };

  const post = async () => {
    if (state.uname[0].trim().length === 0) {
      alert('ハンネを入力してください');
      return;
    }

    if (state.message[0].trim().length === 0) {
      alert('メッセージを入力してください');
      return;
    }

    await state.message[1]('');
    document.getElementById('textarea')?.blur();

    await firebase
      .database()
      .ref(constant.table.boards)
      .push({
        uid: await firebase.auth().currentUser?.uid,
        uname: state.uname[0],
        message: state.message[0].trim(),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });

    document.getElementById('textarea')?.focus();

    // lineに通知
    pushNotification(`${state.uid[0]}\n\n${state.message[0]}`);
  };

  const init = (params: { uid: string }) => {
    // lineに通知
    pushNotification(params.uid);

    state.uid[1](params.uid);

    // 投稿リスト監視
    firebase
      .database()
      .ref(constant.table.boards)
      .orderByChild('createdAt')
      .limitToLast(50)
      .on('value', snapshot => {
        let _data: any[] = [];
        snapshot.forEach(childSnapshot => {
          _data.push(childSnapshot.val());
        });

        state.list[1](_.orderBy(_data, 'createdAt', 'desc'));
        state.loading[1](false);

        // 同時接続数監視
        (async () => {
          const presenceRef = firebase.database().ref('/.info/connected');
          const listRef = firebase
            .database()
            .ref(
              (constant.table.connections +
                '/' +
                (await firebase.auth().currentUser?.uid)) as string
            );
          const userRef = listRef.push();

          presenceRef.on('value', async snap => {
            if (snap.val()) {
              userRef.onDisconnect().remove();
              userRef.set((await firebase.auth().currentUser?.uid) as string);
            }
          });

          firebase
            .database()
            .ref('connections')
            .on('value', s => {
              state.su[1](s.numChildren());
            });
        })();
      });
  };

  return {
    state,
    init,
    post,
  };
};
