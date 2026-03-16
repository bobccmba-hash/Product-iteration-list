'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CommentRulesAdmin() {
  const [config, setConfig] = useState({
    minChars: 8,
    minChinese: 2,
    forbidSymbols: true,
    forbidNumbers: true,
    forbidLetters: true,
    forbidEmpty: true,
    repeatCharLimit: { enabled: true, threshold: 3 },
    repeatRatio: { enabled: true, threshold: 50 },
    meaninglessWords: { enabled: true },
    templateComments: { enabled: true },
    randomText: { enabled: true },
    similarComments: { enabled: true, threshold: 80 },
    tips: {
      tooShort: '评价内容过短，请补充真实体验',
      repeatChar: '请不要只输入符号或重复字符',
      notSpecific: '为了帮助其他用户，请填写更具体的评价内容',
      similar: '评论内容重复度较高，请重新填写',
    },
    frontendValidation: true,
    backendValidation: true,
  })

  const [showPublishConfirm, setShowPublishConfirm] = useState(false)
  const [showWordLibModal, setShowWordLibModal] = useState<'meaningless' | 'template' | null>(null)
  const [wordLib, setWordLib] = useState({
    meaningless: ['好', '可以', '不错'],
    template: ['很好，下次再来', '挺好的'],
  })
  const [newWord, setNewWord] = useState('')

  const handleSave = () => alert('配置已保存为草稿')
  const handlePublish = () => setShowPublishConfirm(true)
  const confirmPublish = () => { setShowPublishConfirm(false); alert('配置已发布生效') }
  const handleReset = () => { if (confirm('确认恢复默认配置吗？')) setConfig({ minChars: 8, minChinese: 2, forbidSymbols: true, forbidNumbers: true, forbidLetters: true, forbidEmpty: true, repeatCharLimit: { enabled: true, threshold: 3 }, repeatRatio: { enabled: true, threshold: 50 }, meaninglessWords: { enabled: true }, templateComments: { enabled: true }, randomText: { enabled: true }, similarComments: { enabled: true, threshold: 80 }, tips: { tooShort: '评价内容过短，请补充真实体验', repeatChar: '请不要只输入符号或重复字符', notSpecific: '为了帮助其他用户，请填写更具体的评价内容', similar: '评论内容重复度较高，请重新填写' }, frontendValidation: true, backendValidation: true }) }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-8 py-8">
            <header className="mb-8 space-y-3">
              <h1 className="text-3xl font-black">评论规则管理</h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600">配置评论提交时的内容校验规则，前端实时提示，服务端最终校验。</p>
            </header>

            <div className="mb-6 flex gap-3">
              <button onClick={handleSave} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">保存配置</button>
              <button onClick={handlePublish} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">发布生效</button>
              <button onClick={handleReset} className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300">恢复默认</button>
            </div>

            {showPublishConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="text-lg font-bold">确认发布</h3>
                  <p className="mt-2 text-slate-600">发布后将影响评论提交流程，确认发布吗？</p>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => setShowPublishConfirm(false)} className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700">取消</button>
                    <button onClick={confirmPublish} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white">确认</button>
                  </div>
                </div>
              </div>
            )}

            {showWordLibModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-[420px] rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="text-lg font-bold">
                    {showWordLibModal === 'meaningless' ? '无意义短词词库管理' : '模板评论词库管理'}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">
                    该词库为<strong className="font-semibold text-slate-700"> 评论规则专用 </strong>，
                    建议后端落库为一张「评论词库表」，字段包含：
                    <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">text</code>、
                    <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">type</code>（无意义短词 / 模板评论）、
                    <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">enabled</code> 及可选
                    <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">remark</code>。
                  </p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">当前词条</span>
                        <span className="text-[10px] text-slate-400">
                          共 {showWordLibModal === 'meaningless' ? wordLib.meaningless.length : wordLib.template.length} 条
                        </span>
                      </div>
                      <div className="max-h-40 space-y-1 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs">
                        {(showWordLibModal === 'meaningless' ? wordLib.meaningless : wordLib.template).length === 0 && (
                          <div className="text-[11px] text-slate-400">暂无词条，可在下方新增。</div>
                        )}
                        {(showWordLibModal === 'meaningless' ? wordLib.meaningless : wordLib.template).map((item, index) => (
                          <div key={index} className="flex items-center justify-between rounded bg-white px-2 py-1">
                            <span className="mr-2 truncate" title={item}>
                              {item}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (showWordLibModal === 'meaningless') {
                                  setWordLib({
                                    ...wordLib,
                                    meaningless: wordLib.meaningless.filter((_, i) => i !== index),
                                  })
                                } else {
                                  setWordLib({
                                    ...wordLib,
                                    template: wordLib.template.filter((_, i) => i !== index),
                                  })
                                }
                              }}
                              className="text-[11px] font-semibold text-rose-500 hover:text-rose-600"
                            >
                              删除
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">新增词条</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newWord}
                          onChange={(e) => setNewWord(e.target.value)}
                          placeholder={showWordLibModal === 'meaningless' ? '例如：好、可以、不错' : '例如：很好，下次再来'}
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const value = newWord.trim()
                            if (!value) return
                            if (showWordLibModal === 'meaningless') {
                              if (!wordLib.meaningless.includes(value)) {
                                setWordLib({ ...wordLib, meaningless: [...wordLib.meaningless, value] })
                              }
                            } else {
                              if (!wordLib.template.includes(value)) {
                                setWordLib({ ...wordLib, template: [...wordLib.template, value] })
                              }
                            }
                            setNewWord('')
                          }}
                          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                        >
                          添加
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">仅做简单列表管理，实际持久化由后端按接口落库。</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => {
                        setShowWordLibModal(null)
                        setNewWord('')
                      }}
                      className="flex-1 rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
                    >
                      关闭
                    </button>
                    <button
                      onClick={() => {
                        setShowWordLibModal(null)
                        setNewWord('')
                      }}
                      className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
                    >
                      保存（示意）
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(260px,1fr)]">
              <div className="space-y-6">
                <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h2 className="mb-4 text-xl font-black">基础校验规则</h2>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-bold">最小字符数</label>
                        <input type="number" min="1" value={config.minChars} onChange={(e) => setConfig({ ...config, minChars: parseInt(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                        <p className="mt-1 text-xs text-slate-500">评论总长度不得低于该值</p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold">最小汉字数</label>
                        <input type="number" min="1" value={config.minChinese} onChange={(e) => setConfig({ ...config, minChinese: parseInt(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                        <p className="mt-1 text-xs text-slate-500">评论中至少包含的汉字数量</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[{ key: 'forbidSymbols', label: '禁止纯符号', desc: '评论仅包含符号（如！！！、。。。）则拦截' }, { key: 'forbidNumbers', label: '禁止纯数字', desc: '评论仅包含数字（如111、2222）则拦截' }, { key: 'forbidLetters', label: '禁止纯字母', desc: '评论仅包含字母（如aaa、ABC）则拦截' }, { key: 'forbidEmpty', label: '禁止空内容', desc: '评论为空或仅包含空格则拦截' }].map((item) => (
                        <div key={item.key} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                          <input type="checkbox" checked={config[item.key as keyof typeof config] as boolean} onChange={(e) => setConfig({ ...config, [item.key]: e.target.checked })} className="mt-1 h-4 w-4 rounded" />
                          <div className="flex-1">
                            <label className="text-sm font-bold">{item.label}</label>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h2 className="mb-4 text-xl font-black">灌水识别规则</h2>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-bold">连续重复字符限制</label>
                          <p className="mt-1 text-xs text-slate-500">同一字符连续出现超过阈值次数则拦截（如「哈哈哈哈」、「1111」）。</p>
                        </div>
                        <input type="checkbox" checked={config.repeatCharLimit.enabled} onChange={(e) => setConfig({ ...config, repeatCharLimit: { ...config.repeatCharLimit, enabled: e.target.checked } })} className="h-4 w-4 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">阈值：</span>
                        <input
                          type="number"
                          min="2"
                          max="10"
                          value={config.repeatCharLimit.threshold}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              repeatCharLimit: {
                                ...config.repeatCharLimit,
                                threshold: parseInt(e.target.value),
                              },
                            })
                          }
                          disabled={!config.repeatCharLimit.enabled}
                          className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
                        />
                        <span className="text-xs text-slate-500">次</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-bold">重复字符占比限制</label>
                          <p className="mt-1 text-xs text-slate-500">某个字符在整条评论中所占比例超过阈值则拦截（如「哈哈哈好」中“哈”占75%）。</p>
                        </div>
                        <input type="checkbox" checked={config.repeatRatio.enabled} onChange={(e) => setConfig({ ...config, repeatRatio: { ...config.repeatRatio, enabled: e.target.checked } })} className="h-4 w-4 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">阈值：</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={config.repeatRatio.threshold}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              repeatRatio: {
                                ...config.repeatRatio,
                                threshold: parseInt(e.target.value),
                              },
                            })
                          }
                          disabled={!config.repeatRatio.enabled}
                          className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
                        />
                        <span className="text-xs text-slate-500">%</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-bold">无意义短词拦截</label>
                          <p className="mt-1 text-xs text-slate-500">评论仅包含词库中的无意义词汇则拦截（如「好」、「可以」、「不错」）。</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={config.meaninglessWords.enabled}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              meaninglessWords: { ...config.meaninglessWords, enabled: e.target.checked },
                            })
                          }
                          className="h-4 w-4 rounded"
                        />
                      </div>
                      <button onClick={() => setShowWordLibModal('meaningless')} className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-indigo-600 ring-1 ring-indigo-200 hover:bg-indigo-50">管理词库</button>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-bold">模板评论拦截</label>
                          <p className="mt-1 text-xs text-slate-500">评论完全匹配词库中的模板则拦截（如「很好，下次再来」、「挺好的」）。</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={config.templateComments.enabled}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              templateComments: { ...config.templateComments, enabled: e.target.checked },
                            })
                          }
                          className="h-4 w-4 rounded"
                        />
                      </div>
                      <button onClick={() => setShowWordLibModal('template')} className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-indigo-600 ring-1 ring-indigo-200 hover:bg-indigo-50">管理模板</button>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={config.randomText.enabled}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              randomText: { ...config.randomText, enabled: e.target.checked },
                            })
                          }
                          className="mt-1 h-4 w-4 rounded"
                        />
                        <div className="flex-1">
                          <label className="block text-sm font-bold">乱码/随机拼接拦截</label>
                          <p className="mt-1 text-xs text-slate-500">结合最小汉字数、纯字母/数字限制综合判断，识别无意义的随机拼接。</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-bold">相似评论拦截</label>
                          <p className="mt-1 text-xs text-slate-500">同账号近7天内评论相似度超过阈值则拦截（服务端判断）。</p>
                        </div>
                        <input type="checkbox" checked={config.similarComments.enabled} onChange={(e) => setConfig({ ...config, similarComments: { ...config.similarComments, enabled: e.target.checked } })} className="h-4 w-4 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">相似度阈值：</span>
                        <input
                          type="number"
                          min="50"
                          max="100"
                          value={config.similarComments.threshold}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              similarComments: {
                                ...config.similarComments,
                                threshold: parseInt(e.target.value),
                              },
                            })
                          }
                          disabled={!config.similarComments.enabled}
                          className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
                        />
                        <span className="text-xs text-slate-500">%</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h2 className="mb-4 text-xl font-black">提示文案配置</h2>
                  <div className="space-y-4">
                    {[{ key: 'tooShort', label: '内容过短提示' }, { key: 'repeatChar', label: '符号/重复字符提示' }, { key: 'notSpecific', label: '内容不够具体提示' }, { key: 'similar', label: '模板/相似评论提示' }].map((item) => (
                      <div key={item.key}>
                        <label className="block text-sm font-bold">{item.label}</label>
                        <textarea value={config.tips[item.key as keyof typeof config.tips]} onChange={(e) => setConfig({ ...config, tips: { ...config.tips, [item.key]: e.target.value } })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={2} />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h2 className="mb-4 text-xl font-black">生效方式</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={config.frontendValidation} onChange={(e) => setConfig({ ...config, frontendValidation: e.target.checked })} className="h-4 w-4 rounded" />
                      <label className="text-sm font-bold">前端实时校验</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={config.backendValidation} disabled className="h-4 w-4 rounded" />
                      <label className="text-sm font-bold">服务端最终校验（必启用）</label>
                    </div>
                  </div>
                </section>

                <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6">
                  <button onClick={handleSave} className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-bold text-white hover:bg-emerald-700">保存配置</button>
                  <button onClick={handlePublish} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-bold text-white hover:bg-indigo-700">发布生效</button>
                </div>
              </div>

              <aside className="hidden self-start rounded-2xl bg-slate-900/95 p-5 text-slate-100 shadow-xl ring-1 ring-slate-800 lg:block">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">实现规则说明</h2>
                <p className="mb-4 text-xs leading-relaxed text-slate-300">
                  所有规则均基于<strong className="font-semibold text-slate-100"> 纯文本字符串判断 </strong>实现，
                  不依赖 OCR 或大模型。前端仅做基础提示，最终拦截由服务端统一校验。
                </p>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-100">连续重复字符限制</h3>
                    <p className="text-slate-300">
                      遍历评论，统计同一字符连续出现的最大次数 <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">maxRepeatLen</code>。
                      若 <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">maxRepeatLen &gt;= 阈值</code>，则命中规则。
                    </p>
                    <p className="mt-1 text-slate-400">示例：阈值=3，「哈哈哈」命中，「好呀好呀」不命中。</p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  <div>
                    <h3 className="mb-1 font-semibold text-slate-100">重复字符占比限制</h3>
                    <p className="text-slate-300">
                      去掉空格等无效字符后，统计每个字符出现次数，取最大值
                      <code className="ml-1 rounded bg-slate-800 px-1 py-0.5 text-[10px]">maxCount</code>，总长度为
                      <code className="ml-1 rounded bg-slate-800 px-1 py-0.5 text-[10px]">len</code>。
                    </p>
                    <p className="mt-1 text-slate-300">
                      若 <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">maxCount / len × 100 ≥ 阈值%</code>，判定为灌水。
                    </p>
                    <p className="mt-1 text-slate-400">示例：阈值=50，「哈哈哈哈好」中“哈”占 80%，命中。</p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  <div>
                    <h3 className="mb-1 font-semibold text-slate-100">无意义短词 / 模板评论</h3>
                    <p className="text-slate-300">
                      维护一张评论词库表（字段：<code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">text</code>、
                      <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">type</code>、<code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">enabled</code> 等），
                      本页「管理词库 / 管理模板」按钮负责管理这张表的数据。
                      评论整体去空格后，若与词库完全匹配或长度≤N 且高度相似（编辑距离 &lt;=1），则命中。
                    </p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  <div>
                    <h3 className="mb-1 font-semibold text-slate-100">乱码 / 随机拼接</h3>
                    <p className="text-slate-300">
                      统计非中英文数字符号占比、连续无意义片段长度等，结合「最小汉字数」「禁止纯字母/数字」规则综合判断。
                      占比超过内部固定阈值（如 40%）则视为乱码。
                    </p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  <div>
                    <h3 className="mb-1 font-semibold text-slate-100">相似评论拦截</h3>
                    <p className="text-slate-300">
                      服务端以「学生ID + 业务ID」为维度，取最近 7 天内历史评论，使用简单文本相似度（如
                      分词+余弦/编辑距离）与本次评论计算。
                    </p>
                    <p className="mt-1 text-slate-300">
                      若与任一历史评论的相似度 ≥ 页面配置的阈值（例如 80%），则返回对应错误码并提示「评论内容重复度较高」。
                    </p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  <div>
                    <h3 className="mb-1 font-semibold text-slate-100">前后端配合约定</h3>
                    <p className="text-slate-300">
                      前端可按相同规则做即时提示，但<strong className="font-semibold text-slate-100"> 不作为安全边界 </strong>。
                      服务端在接收评论时统一按上述算法校验，并返回明确的
                      <code className="ml-1 rounded bg-slate-800 px-1 py-0.5 text-[10px]">errorCode</code> 与提示文案 key。
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      )
    }
