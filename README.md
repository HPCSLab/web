# Web係向け

## 開発環境構築方法

1. node, npmをインストール (`volta`がオススメだがなんでも良い)
2. `npm install -g pnpm`で`pnpm`をインストール（別の方法でインストールしても良い）
3. `pnpm install`
4. `pnpm run dev`で`5173`ポートで立ち上がるのでそれをみながら編集
5. `pnpm run fmt`でのフォーマットと`pnpm run build`で警告が出てないことを確認(バンドルサイズの警告は無視して良い)

## 編集対象ファイル

- `./src/resource/articles/members/alumni.yml`
  - OBOGの一覧ファイル
- `./src/resource/articles/members/profiles/*.yml`
  - 現在のメンバーのファイル
  - ファイルを追加/削除した場合は自動反映されるので他をいじる必要はなし
  - 画像は`./src/resource/img/icons`以下に配置。画像のルートは`./src/resource/img`なので`/icons/mnakano.jpg`のようなパスで指定する
- `./src/resource/articles/publications/*/*.yml`
  - こちらも追加/削除時は自動で反映される
  - ファイル名、西暦のディレクトリ名は単にファイル整理のためのものだが、YAML内の`year`と`slug`に揃えるのを推奨
  - 分類についていじりたい場合は以下のファイルを修正する必要がある
    - `./src/resource/publications.ts`
    - `./src/resource/index.ts`
    - `./src/routes/publications/**/*.tsx`
- `./src/resource/articles/news/*/*.mdx`
  - こちらも追加/削除時の自動反映
  - 画像は`./src/resource/img/misc`以下に配置し、`/misc/*`の形式で参照すること

## 開発時ノート

静的サイトなので基本はstaticなHTMLで高速に描画したいが、hamburger menuなど一部動的なコンテンツがある。これらを生のJSで書くのは結構しんどい。
