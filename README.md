## リアルタイムチャット

https://chat-line.netlify.app

## 使用ライブラリ周り

- Netlify(ホスティング)
- Netlify Functions(プッシュ通知)
- FireBase Realtime Database
- TypeScript
- React
- BootStrap4

## Realtime Database Rule

```json
{
  "rules": {
    ".write": false,
    "connections": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth.uid === $uid"
      }
    },
    "boards": {
      ".read": "auth != null",
      ".write": "auth.uid != null",
      ".indexOn": ["uid", "createdAt"],
      "$bid": {
        ".validate": "newData.hasChildren(['uid', 'uname', 'message', 'createdAt', 'updatedAt'])",
        "uid": {
          ".validate": "newData.isString() && newData.val() === auth.uid"
        },
        "uname": {
          ".validate": "newData.isString() && 0 < newData.val().length && newData.val().length <= 15"
        },
        "message": {
          ".validate": "newData.isString() && 0 < newData.val().length && newData.val().length <= 150"
        },
        "createdAt": {
          ".validate": "newData.isNumber()"
        },
        "updatedAt": {
          ".validate": "newData.isNumber()"
        },
        "$other": { ".validate": false }
      }
    }
  }
}
```

## モックソースコード
https://github.com/cha711/cha711.github.io

## モックプレビュー
https://cha711.github.io
