module.exports = {
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Vue 파일 변환기 설정
    '^.+\\.(ts|js|mjs)x?$': 'babel-jest', // JS 파일 변환기 설정
  },
  moduleFileExtensions: ['js', 'json', 'vue'], // 파일 확장자 설정
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // 경로 alias 설정
    ,"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
    ,"\\.(css|less|scss|sass)$": "identity-obj-proxy"
    // "/^components\/(.*)$/": "<rootDir>/src/components/$1",
    // "^vuetify/components$": "./node_modules/vuetify/lib/components/index.mjs",
    // "^vuetify/directives$": "./node_modules/vuetify/lib/directives/index.mjs",
  },
  "testEnvironment": "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vuetify)'
  ],
  setupFilesAfterEnv: [
    './jest.setup.js'
  ]
};
