// 標準入力
const standardInput = () => {
  const lines: string[] = [];
  const reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on("line", (line) => {
    lines.push(line);
  });
  reader.on("close", () => main(lines));
};
standardInput();

// メイン処理
const main = (lines: string[]) => {
  // ビンゴカード作成
  // ビンゴサイズ
  const bingoSize = Number(lines[0]);
  // ビンゴカード素材
  const bingoMaterials = lines.slice(1, bingoSize + 1);
  // ビンゴカード
  const bingoCard = bingoMaterials.map((line) => line.split(" "));

  // ワードリスト作成
  // ワードリストサイズ
  const wordsSize = Number(lines[bingoSize + 1]);
  // ワード開始位置
  const wordStart = bingoSize + 2;
  // ワードリスト
  const words = lines.slice(wordStart, wordStart + wordsSize);

  // ビンゴマーキング処理
  // 各マスについて、ワードリストに含まれていた場合、その場所を「1」で表す2次元配列を作成する。
  const markedCard = bingoCard.map((line) => {
    return line.map((square) => {
      return words.some((word) => word === square) ? 1 : 0;
    });
  });

  // markedCardが空の場合、noを出力し、処理を終了する。
  if (markedCard.length === 0) {
    console.log("no");
    return;
  }

  // ビンゴ判定処理
  // ビンゴ数
  let bingoCount = 0;
  // 判定用空配列
  const bingoSizeArr = [...Array(bingoSize)];

  // 横列判定
  bingoCount += markedCard.reduce((count, line) => {
    // 行がすべて1のとき、カウントアップする。
    const bingo = line.every((square) => square === 1);
    return bingo ? count + 1 : count;
  }, 0);

  // 縦列判定
  bingoCount += bingoSizeArr.reduce((count, _, j, arr) => {
    // 列がすべて1のとき、カウントアップする。
    const bingo = arr.every((_, i) => markedCard[i][j] === 1);
    return bingo ? count + 1 : count;
  }, 0);

  // 斜列判定
  // 縦と横の座標が一致する並びがすべて1、または、
  // (縦と横の座標の和 = ビンゴサイズ-1)の並びがすべて1のとき、カウントアップする。
  const bingo =
    bingoSizeArr.every((_, i) => markedCard[i][i] === 1) ||
    bingoSizeArr.every((_, i) => markedCard[i][bingoSize - 1 - i] === 1);
  bingoCount += bingo ? 1 : 0;

  // 結果出力
  console.log(bingoCount > 0 ? "yes" : "no");
};
