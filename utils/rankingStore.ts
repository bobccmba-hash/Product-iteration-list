import { mockRankingConfigs, type RankingConfig } from './rankingMock'

// 模块级可变数组，模拟全局状态（前端原型用）
let _configs: RankingConfig[] = [...mockRankingConfigs]
let _listeners: Array<() => void> = []

function notify() {
  _listeners.forEach((fn) => fn())
}

export const rankingStore = {
  getConfigs(): RankingConfig[] {
    return _configs
  },
  addConfig(config: RankingConfig) {
    _configs = [config, ..._configs]
    notify()
  },
  updateConfig(id: string, config: RankingConfig) {
    _configs = _configs.map((c) => (c.id === id ? config : c))
    notify()
  },
  toggleEnabled(id: string) {
    _configs = _configs.map((c) => (c.id === id ? { ...c, displayEnabled: !c.displayEnabled } : c))
    notify()
  },
  subscribe(fn: () => void) {
    _listeners.push(fn)
    return () => {
      _listeners = _listeners.filter((l) => l !== fn)
    }
  },
}
