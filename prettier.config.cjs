/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  arrowParens: 'always',
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  importOrder: [
    '^(react/(.*)$)|^(react$)', // React và các thư viện liên quan
    '<THIRD_PARTY_MODULES>', // Các module bên thứ ba (npm)
    '',
    '^types$', // Các loại dữ liệu (TypeScript)
    '^@(server|trpc)/(.*)$', // Các module server hoặc TRPC
    '^@/(.*)$', // Import nội bộ (có @)
    '',
    '^[./]', // Các import từ thư mục hiện tại hoặc cha
  ],
  importOrderSeparation: true, // Thêm dòng trống giữa từng nhóm import
  importOrderSortSpecifiers: true, // Sắp xếp destructured imports theo ABC
  importOrderBuiltinModulesToTop: true, // Đưa các module của Node.js lên trên cùng
  importOrderMergeDuplicateImports: true, // Gộp các import trùng lặp
  importOrderCombineTypeAndValueImports: true, // Gộp import kiểu TypeScript
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
}
