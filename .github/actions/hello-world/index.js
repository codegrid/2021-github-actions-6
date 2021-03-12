const core = require('@actions/core');
const github = require('@actions/github');

try {
  // 入力項目の値の取得
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const time = (new Date()).toTimeString();
  // 実行された時間をワークフロー側に渡す
  core.setOutput('time', time);

  // ワークフローをトリガーした際の様々な情報をJSON形式にして取得
  const repo = JSON.stringify(github.context.repo, undefined, 2)
  console.log(`github.context.repo: ${repo}`);

} catch (error) {
  // エラーをキャッチした場合、ワークフローの実行結果を失敗とする
  core.setFailed(error.message);
}
