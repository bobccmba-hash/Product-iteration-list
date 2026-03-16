'use client'

import Link from 'next/link'

export default function CommentRulesImplementation() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/prd" className="mb-6 inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
          ← 返回 PRD 目录
        </Link>

        <header className="mb-8 space-y-3">
          <h1 className="text-3xl font-black">评论规则管理 · 实现指南</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            详细说明各灌水识别规则的实现方式、算法原理和代码示例。
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">一、基础规则（纯字符串判断）</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-bold">1.1 禁止纯符号</h3>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-bold">实现方式：正则表达式</p>
                  <p className="mb-3 text-sm text-slate-600">检查评论是否仅包含符号字符（不含汉字、字母、数字）</p>
                  <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                    <pre>{`const isOnlySymbols = (text) => {
  const withoutSymbols = text.replace(/[^\\u4e00-\\u9fff\\w]/g, '');
  return withoutSymbols.length === 0 && text.length > 0;
}
isOnlySymbols('！！！。。。') // true`}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold">1.2 禁止纯数字 / 纯字母</h3>
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                    <pre>{`const isOnlyNumbers = (text) => /^\\d+$/.test(text);
const isOnlyLetters = (text) => /^[a-zA-Z]+$/.test(text);`}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold">1.3 最小字符数 / 最小汉字数</h3>
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                    <pre>{`const validateLength = (text, minChars, minChinese) => {
  const totalLength = text.length;
  const chineseCount = (text.match(/[\\u4e00-\\u9fff]/g) || []).length;
  return totalLength >= minChars && chineseCount >= minChinese;
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">二、连续重复字符限制</h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-sm font-bold">实现方式：正则表达式 + 阈值比较</p>
              <p className="mb-3 text-sm text-slate-600">检查是否存在连续重复的字符超过阈值</p>
              <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                <pre>{`const hasExcessiveRepeat = (text, threshold = 3) => {
  const pattern = new RegExp(\`(.)\\\\1{\${threshold - 1},}\`);
  return pattern.test(text);
}
hasExcessiveRepeat('哈哈哈哈', 3) // true (哈 连续4次)`}</pre>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-200">
                <p className="text-xs font-bold text-blue-900">💡 纯正则表达式，无需模型，毫秒级判断</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">三、重复字符占比限制</h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-sm font-bold">实现方式：字符频率统计</p>
              <p className="mb-3 text-sm text-slate-600">统计每个字符出现的次数，计算占比是否超过阈值</p>
              <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                <pre>{`const hasHighRepeatRatio = (text, threshold = 50) => {
  const charCount = {};
  for (const char of text) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  const maxCount = Math.max(...Object.values(charCount));
  const ratio = (maxCount / text.length) * 100;
  return ratio > threshold;
}
hasHighRepeatRatio('哈哈哈好', 50) // true (哈占75%)`}</pre>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-200">
                <p className="text-xs font-bold text-blue-900">💡 纯数学计算，O(n) 时间复杂度</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">四、无意义短词拦截</h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-sm font-bold">实现方式：词库匹配</p>
              <p className="mb-3 text-sm text-slate-600">检查评论是否仅由词库中的无意义词汇组成</p>
              <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                <pre>{`const meaninglessWords = ['好', '可以', '不错', '行'];
const isOnlyMeaninglessWords = (text, wordList) => {
  const cleaned = text.replace(/[\\s\\p{P}]/gu, '');
  for (const char of cleaned) {
    if (!wordList.includes(char)) return false;
  }
  return cleaned.length > 0;
}`}</pre>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-200">
                <p className="text-xs font-bold text-blue-900">💡 词库由运营在后台维护，开发只需做字符匹配</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">五、模板评论拦截</h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-sm font-bold">实现方式：精确字符串匹配</p>
              <p className="mb-3 text-sm text-slate-600">检查评论是否完全匹配词库中的模板</p>
              <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                <pre>{`const templates = ['很好，下次再来', '挺好的', '非常满意'];
const isTemplateComment = (text, templateList) => {
  return templateList.includes(text.trim());
}
isTemplateComment('很好，下次再来', templates) // true`}</pre>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-200">
                <p className="text-xs font-bold text-blue-900">💡 精确匹配，最简单高效</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">六、乱码/随机拼接拦截</h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-sm font-bold">实现方式：综合判断（无需模型）</p>
              <p className="mb-3 text-sm text-slate-600">结合已有规则：汉字占比低 + 纯字母/数字 + 无意义</p>
              <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                <pre>{`const isRandomText = (text, minChinese = 2) => {
  const chineseCount = (text.match(/[\\u4e00-\\u9fff]/g) || []).length;
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  const numberCount = (text.match(/\\d/g) || []).length;
  
  if (chineseCount < minChinese) {
    const nonChineseRatio = (letterCount + numberCount) / text.length;
    return nonChineseRatio > 0.7;
  }
  return false;
}`}</pre>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-200">
                <p className="text-xs font-bold text-blue-900">💡 统计字符类型占比，无需 NLP 模型</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">七、相似评论拦截</h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-sm font-bold">实现方式：编辑距离算法（Levenshtein Distance）</p>
              <p className="mb-3 text-sm text-slate-600">计算当前评论与用户近7天内历史评论的相似度</p>
              <div className="rounded-lg bg-slate-900 p-3 text-sm text-slate-50 font-mono overflow-x-auto">
                <pre>{`const getSimilarity = (str1, str2) => {
  const m = str1.length, n = str2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  
  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return ((maxLen - distance) / maxLen) * 100;
}`}</pre>
              </div>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-200">
                <p className="text-xs font-bold text-blue-900">💡 经典算法，无需 ML 模型。需在服务端实现（查询历史数据）</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-black">总结：前后端职责划分</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-emerald-50 p-4 ring-1 ring-emerald-200">
                <p className="mb-3 text-sm font-bold text-emerald-900">前端实时校验</p>
                <ul className="space-y-1 text-xs text-emerald-800">
                  <li>✓ 最小字符数 / 最小汉字数</li>
                  <li>✓ 禁止纯符号 / 纯数字 / 纯字母</li>
                  <li>✓ 连续重复字符限制</li>
                  <li>✓ 重复字符占比限制</li>
                  <li>✓ 无意义短词拦截</li>
                  <li>✓ 模板评论拦截</li>
                  <li>✓ 乱码识别</li>
                </ul>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4 ring-1 ring-indigo-200">
                <p className="mb-3 text-sm font-bold text-indigo-900">服务端最终校验</p>
                <ul className="space-y-1 text-xs text-indigo-800">
                  <li>✓ 所有前端规则再次校验</li>
                  <li>✓ 相似评论拦截</li>
                  <li>✓ 账号维度风控</li>
                  <li>✓ 频率限制</li>
                  <li>✓ 积分是否发放</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
            <h2 className="mb-3 text-lg font-black text-amber-900">❌ 不需要的技术</h2>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>✗ NLP 模型（BERT、GPT 等）— 过度设计，成本高</li>
              <li>✗ 文字识别（OCR）— 这里是文本输入，不是图片</li>
              <li>✗ 深度学习 — 规则已足够应对灌水场景</li>
              <li>✗ 复杂的相似度算法 — 编辑距离已够用</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
