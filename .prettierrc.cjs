module.exports = {
  printWidth: 120, // 换行字符串阈值
  tabWidth: 2, // 缩进
  singleQuote: true, // 单引号
  semi: false, // 取消末尾分号
  trailingComma: 'all', // 尾随逗号
  bracketSpacing: true, // 对象，数组加空格
  jsxBracketSameLine: false, // jsx > 是否同一行
  arrowParens: 'avoid', // (x) => {} 是否要有小括号
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  ignorePatterns: ['*.html'],
}
