module.exports = {
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Vue 파일 변환기 설정
    '^.+\\.js$': 'babel-jest', // JS 파일 변환기 설정
  },
  moduleFileExtensions: ['js', 'json', 'vue'], // 파일 확장자 설정
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 경로 alias 설정
  },
  "testEnvironment": "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
