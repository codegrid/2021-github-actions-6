const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const { owner, repo } = github.context.repo;
  const token = core.getInput('token');
  const base = core.getInput('base');
  const head = core.getInput('head');

  const title = `Release ${new Date().toString()}`;
  const body = `
- [ ] IE11の動作確認
- [ ] タブレット端末での動作確認
`;

  const octokit = github.getOctokit(token);

  const pullsRes = await octokit.pulls.list({
    owner, repo, base, head,
    state: 'open',
  });
  if (pullsRes.data.length !== 0) {
    core.info('既にプルリクエストが存在しています。')
    return;
  }

  await octokit.pulls.create({
    owner, repo, base, head,
    title: title,
    body: body,
  });
}

(async function() {
  try {
    await run();
  } catch (error) {
    core.setFailed(error.message);
  }
})();

// You can also pass in additional options as a second parameter to getOctokit
// const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

// const { data: pullRequest } = await octokit.pulls.get({
//   owner: 'octokit',
//   repo: 'rest.js',
//   pull_number: 123,
//   mediaType: {
//     format: 'diff'
//   }
// });
// console.log(pullRequest);
