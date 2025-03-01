module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'], // Bắt buộc phải có scope → luôn có ngoặc tròn
    'subject-case': [2, 'always', 'sentence-case'], // Chủ đề viết kiểu `Sentence case`
    'type-case': [2, 'always', 'lower-case'], // `type` phải là chữ thường
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'styles', 'perf', 'refactor', 'test', 'build', 'ci'],
    ],
  },
}
