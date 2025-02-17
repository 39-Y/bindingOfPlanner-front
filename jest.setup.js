import { config } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import {VTextField} from "vuetify/components";

// Vuetify 인스턴스 생성
const vuetify = createVuetify();

// Vue Test Utils에 Vuetify 플러그인 설정
config.global.plugins = [vuetify];

config.global.components = {
  'v-text-field': VTextField
}

// // <v-app> 루트 컴포넌트와 테스트 컴포넌트로 대체될 요소 생성
// const app = document.createElement("div");
// app.setAttribute("id", "app");
// app.setAttribute("data-app", "true");
//
// // <body>에 추가
// document.body.appendChild(app);
