'use client'

import { useMemo, useState } from 'react'
import type { QrType } from '../mock-data'
import { QRS, makeMockQrDataUri } from '../mock-data'
import { COPY_KEYS } from '../copywriting'
import { useGeoLocale } from './GeoLocaleContext'

type QrImageStatus = '图片加载中' | '加载失败' | '已失效待更新' | '已展开'

const INTERACTIVE_COPY = {
  zh: {
    loading: '加载中…',
    close: '关闭',
    longPress: '长按图片可识别/保存；如未显示请刷新或稍后重试。',
    replace: '更换二维码',
    manual: '需要人工咨询？请使用二维码添加“小黄鹿咨询客服”。（mock 数据开发版）',
    formTitle: '合作表单：提交合作申请',
    compactTitle: '合作表单',
    source: '需要我们联系你时，请准确填写机构与联系方式。来源页：',
    orgName: '机构名称',
    orgPlaceholder: '例如：晋江某学校/社区/机构',
    contactName: '联系人',
    contactPlaceholder: '联系人姓名',
    mobile: '联系电话',
    mobilePlaceholder: '11 位手机号',
    city: '所在城市',
    cityPlaceholder: '例如：晋江',
    cooperationType: '合作类型',
    cooperationPlaceholder: '请选择合作类型',
    requirement: '合作需求说明',
    requirementPlaceholder: '请简要说明你们希望合作的内容、时间范围与预期目标。',
    submit: '提交合作申请',
    submitting: '提交中…',
    footer: '提交后我们会进行初步沟通与需求确认，并给出合作推进建议（mock 数据开发版，后续可接后端接口）。',
    options: {
      activity: '联合举办安全主题活动',
      welfare: '联合策划本地公益研学',
      festival: '共建节日亲子活动',
      venue: '场馆与基地联动',
      other: '其他合作',
    },
  },
  en: {
    loading: 'Loading…',
    close: 'Close',
    longPress: 'Long press to scan/save. If it does not load, refresh or try again later.',
    replace: 'Refresh QR',
    manual: 'Need manual support? Use the QR code to contact Fawn Academy service. (mock data)',
    formTitle: 'Cooperation Form',
    compactTitle: 'Cooperation Form',
    source: 'Please provide accurate organization and contact details. Source page: ',
    orgName: 'Organization',
    orgPlaceholder: 'e.g. local school / community / institution',
    contactName: 'Contact Person',
    contactPlaceholder: 'Name',
    mobile: 'Phone Number',
    mobilePlaceholder: '11-digit mobile number',
    city: 'City',
    cityPlaceholder: 'e.g. Jinjiang',
    cooperationType: 'Cooperation Type',
    cooperationPlaceholder: 'Select cooperation type',
    requirement: 'Requirement Description',
    requirementPlaceholder: 'Briefly describe the collaboration scope, timing, and goals.',
    submit: 'Submit Application',
    submitting: 'Submitting…',
    footer: 'After submission, we will conduct an initial review and follow up with collaboration suggestions. (mock data)',
    options: {
      activity: 'Joint safety-themed activities',
      welfare: 'Local public-interest study tours',
      festival: 'Festival family events',
      venue: 'Venue / base collaboration',
      other: 'Other cooperation',
    },
  },
}

function useQrAsset(qrType: QrType) {
  return useMemo(() => QRS.find((q) => q.qr_type === qrType) ?? null, [qrType])
}

export function QrCodeButton({
  qrType,
  buttonText,
  secondaryText,
}: {
  qrType: QrType
  buttonText: string
  secondaryText?: string
}) {
  const asset = useQrAsset(qrType)
  const { locale } = useGeoLocale()
  const t = INTERACTIVE_COPY[locale]
  const [open, setOpen] = useState(false)
  const [imageStatus, setImageStatus] = useState<QrImageStatus>('图片加载中')
  const [imageDataUrl, setImageDataUrl] = useState<string>('')

  const invalidText =
    qrType === 'miniapp'
      ? COPY_KEYS.qr_miniapp_invalid
      : COPY_KEYS.qr_customer_service_invalid

  if (!asset) return null

  function doOpen() {
    if (!asset) return
    setOpen(true)
    setImageStatus('图片加载中')
    setImageDataUrl(asset.image_data_url)
  }

  function doClose() {
    setOpen(false)
  }

  function requestReplace() {
    if (!asset) return
    setImageStatus('图片加载中')
    const next = makeMockQrDataUri(
      `${asset.title}（已更新）`,
      qrType === 'miniapp' ? '#0f766e' : '#111827',
      '#FFFFFF',
    )
    setImageDataUrl(next)
    setImageStatus('图片加载中')
  }

  return (
    <>
      <button
        type="button"
        onClick={doOpen}
        className="geo-btn-primary inline-flex h-10 items-center justify-center px-5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {buttonText}
      </button>
      {secondaryText ? (
        <div className="mt-2 text-xs text-[#4f6378]">{secondaryText}</div>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#533afd]/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-black">{asset.title}</div>
                <div className="mt-1 text-xs text-[#4f6378]">
                  {t.longPress}
                </div>
              </div>
              <button
                type="button"
                onClick={doClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#061b31]"
                aria-label="关闭"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#e5edf5] bg-[#f6f9fc] p-4">
              {imageStatus === '图片加载中' ? (
                <div className="flex items-center justify-center py-10 text-sm text-[#4f6378]">
                  {t.loading}
                </div>
              ) : null}

              <div className="flex flex-col items-center gap-3">
                {imageDataUrl ? (
                  <img
                    src={imageDataUrl}
                    alt={asset.title}
                    className="h-auto w-56 rounded-lg bg-white shadow-sm"
                    onLoad={() => setImageStatus('已展开')}
                    onError={() =>
                      setImageStatus(qrType === 'miniapp' ? '已失效待更新' : '加载失败')
                    }
                  />
                ) : null}

                {imageStatus !== '已展开' ? (
                  <div className="text-center">
                    <div className="font-semibold text-rose-600">{invalidText}</div>
                    <div className="mt-1 text-xs text-[#4f6378]">{asset.fallback_text}</div>
                  </div>
                ) : null}

                {imageStatus !== '已展开' ? (
                  <div className="mt-1 flex w-full gap-2">
                    <button
                      type="button"
                      onClick={requestReplace}
                      className="flex-1 rounded-lg bg-[#533afd] px-3 py-2 text-sm font-semibold text-white hover:bg-[#4434d4]"
                    >
                      {t.replace}
                    </button>
                    <button
                      type="button"
                      onClick={doClose}
                      className="rounded-lg border border-[#e5edf5] bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-[#f6f9fc]"
                    >
                      {t.close}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-3 rounded-lg bg-white p-3 text-xs text-[#4f6378]">
              {t.manual}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export function ContactCooperationForm({
  sourcePage,
  compact,
}: {
  sourcePage: string
  compact?: boolean
}) {
  const { locale } = useGeoLocale()
  const t = INTERACTIVE_COPY[locale]
  const [orgName, setOrgName] = useState('')
  const [contactName, setContactName] = useState('')
  const [mobile, setMobile] = useState('')
  const [city, setCity] = useState('')
  const [cooperationType, setCooperationType] = useState('')
  const [requirementDesc, setRequirementDesc] = useState('')

  const [formState, setFormState] = useState<
    '未填写' | '填写中' | '校验失败' | '提交中' | '提交成功' | '提交失败'
  >('未填写')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function validate() {
    if (!orgName.trim()) return COPY_KEYS.form_org_name_required
    if (!contactName.trim()) return COPY_KEYS.form_contact_name_required
    if (!mobile.trim()) return COPY_KEYS.form_mobile_required
    const isMobile = /^1\d{10}$/.test(mobile.trim())
    if (!isMobile) return COPY_KEYS.form_mobile_invalid
    if (!city.trim()) return COPY_KEYS.form_city_required
    if (!cooperationType.trim()) return COPY_KEYS.form_cooperation_type_required
    if (!requirementDesc.trim()) return COPY_KEYS.form_requirement_required
    return null
  }

  function syncFormState() {
    const anyFilled =
      orgName.trim() ||
      contactName.trim() ||
      mobile.trim() ||
      city.trim() ||
      cooperationType.trim() ||
      requirementDesc.trim()
    setFormState(anyFilled ? '填写中' : '未填写')
  }

  function simulateSubmit() {
    setLoading(true)
    setFormState('提交中')
    setError(null)
    setToast(null)
    window.setTimeout(() => {
      setLoading(false)
      setFormState('提交成功')
      setToast(COPY_KEYS.toast_submit_success)
    }, 900)
  }

  return (
    <div
      className={
        compact ? '' : 'rounded-2xl border border-[#e5edf5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5'
      }
    >
      <form
        className="space-y-4"
        onChange={syncFormState}
        onSubmit={(e) => {
          e.preventDefault()
          const v = validate()
          if (v) {
            setError(v)
            setFormState('校验失败')
            setToast(null)
            return
          }
          simulateSubmit()
        }}
      >
        <div>
          <div className="text-sm font-black">{compact ? t.compactTitle : t.formTitle}</div>
          <div className="mt-1 text-xs text-[#4f6378]">
            {t.source}{sourcePage}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4f6378]">
              {t.orgName}
            </label>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              maxLength={50}
              placeholder={t.orgPlaceholder}
              className="h-10 w-full rounded-lg border border-[#e5edf5] px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4f6378]">
              {t.contactName}
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              maxLength={20}
              placeholder={t.contactPlaceholder}
              className="h-10 w-full rounded-lg border border-[#e5edf5] px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4f6378]">
              {t.mobile}
            </label>
            <input
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/[^\d]/g, '').slice(0, 11))
              }
              inputMode="tel"
              placeholder={t.mobilePlaceholder}
              className="h-10 w-full rounded-lg border border-[#e5edf5] px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4f6378]">
              {t.city}
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t.cityPlaceholder}
              className="h-10 w-full rounded-lg border border-[#e5edf5] px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-[#4f6378]">
            {t.cooperationType}
          </label>
          <select
            value={cooperationType}
            onChange={(e) => setCooperationType(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#e5edf5] bg-white px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">{t.cooperationPlaceholder}</option>
            <option value="activity">{t.options.activity}</option>
            <option value="welfare">{t.options.welfare}</option>
            <option value="festival">{t.options.festival}</option>
            <option value="venue">{t.options.venue}</option>
            <option value="other">{t.options.other}</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-[#4f6378]">
            {t.requirement}
          </label>
          <textarea
            value={requirementDesc}
            onChange={(e) => setRequirementDesc(e.target.value.slice(0, 500))}
            maxLength={500}
            rows={4}
            placeholder={t.requirementPlaceholder}
            className="w-full rounded-lg border border-[#e5edf5] px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {error ? <div className="text-sm text-rose-600">{error}</div> : null}

        <button
          type="submit"
          disabled={loading}
          className="geo-btn-primary flex h-11 w-full items-center justify-center text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? t.submitting : t.submit}
        </button>

        {toast ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
            {toast}
          </div>
        ) : null}
      </form>

      <div className="mt-3 text-xs text-slate-500">
        {t.footer}
      </div>
    </div>
  )
}

