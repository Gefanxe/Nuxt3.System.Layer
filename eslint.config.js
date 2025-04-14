// 引入 Antfu 的 ESLint 配置作為基礎配置
import antfu from '@antfu/eslint-config'

// 使用 Antfu 配置並導出自定義的 ESLint 配置
export default antfu({
  vue: true, // 啟用 Vue.js 的相關 ESLint 規則
  rules: {
    'no-console': 'warn', // 警告使用 console 語句
    'semi': ['error', 'always'], // 強制在語句末尾使用分號
    'semi-spacing': ['error', { after: true, before: false }], // 分號後需要空格，分號前不能有空格
    'semi-style': ['error', 'last'], // 分號必須位於行尾
    'style/semi': ['error', 'always'], // 強制樣式規則中使用分號
    'style/semi-spacing': ['error', { after: true, before: false }], // 樣式規則中分號後需要空格，分號前不能有空格
    'style/semi-style': ['error', 'last'], // 樣式規則中分號必須位於行尾
  },
})
