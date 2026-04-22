// ─── Game Management Mock Data ───────────────────────────────────────────────

export type GameMode =1 |2 //1互动2答题
export type GameStatus =0 |1 |2 |3 //0草稿1启用2停用3测试中

export interface Game {
  id: number
  game_code: string
  game_name: string
  game_mode: GameMode
  game_status: GameStatus
  game_theme: string
  game_series: string
  game_tags: string[]
  default_difficulty_level: number
  difficulty_max_level: number
  active_rule_count: number
  cover_url: string
  created_at: string
  created_by: string
}

export const GAMES: Game[] = [
  { id:1, game_code:'GAME_BUBBLE_001', game_name:'泡泡答题', game_mode:2, game_status:1, game_theme:'语文', game_series:'基础认知系列', game_tags:['低年级','3-6岁','记忆力'], default_difficulty_level:1, difficulty_max_level:5, active_rule_count:3, cover_url:'', created_at:'2024-01-10', created_by:'张三' },
  { id:2, game_code:'GAME_JUMP_002', game_name:'跳跳答题', game_mode:2, game_status:1, game_theme:'数学', game_series:'趣味数学系列', game_tags:['中年级','6-9岁','逻辑思维'], default_difficulty_level:2, difficulty_max_level:6, active_rule_count:2, cover_url:'', created_at:'2024-01-15', created_by:'李四' },
  { id:3, game_code:'GAME_MOTION_003', game_name:'体感互动', game_mode:1, game_status:1, game_theme:'运动', game_series:'体能成长系列', game_tags:['全年龄','反应力'], default_difficulty_level:1, difficulty_max_level:3, active_rule_count:5, cover_url:'', created_at:'2024-02-01', created_by:'王五' },
  { id:4, game_code:'GAME_PUZZLE_004', game_name:'拼图游戏', game_mode:1, game_status:3, game_theme:'逻辑', game_series:'益智成长系列', game_tags:['低年级','逻辑思维'], default_difficulty_level:1, difficulty_max_level:4, active_rule_count:1, cover_url:'', created_at:'2024-02-10', created_by:'张三' },
  { id:5, game_code:'GAME_WORD_005', game_name:'识字闯关', game_mode:2, game_status:2, game_theme:'语文', game_series:'基础认知系列', game_tags:['3-6岁','记忆力'], default_difficulty_level:1, difficulty_max_level:5, active_rule_count:0, cover_url:'', created_at:'2024-02-20', created_by:'李四' },
  { id:6, game_code:'GAME_MATH_006', game_name:'数学冲关', game_mode:2, game_status:0, game_theme:'数学', game_series:'挑战进阶系列', game_tags:['高年级','9-12岁','逻辑思维'], default_difficulty_level:1, difficulty_max_level:5, active_rule_count:0, cover_url:'', created_at:'2024-03-01', created_by:'王五' },
]

export const STATUS_MAP: Record<GameStatus, {label:string; tone:'success'|'warning'|'danger'|'neutral'|'info'}> = {
0: { label:'草稿', tone:'neutral' },
1: { label:'启用', tone:'success' },
2: { label:'停用', tone:'danger' },
3: { label:'测试中', tone:'info' },
}

export const MODE_MAP: Record<GameMode, string> = {
1: '互动游戏',
2: '答题游戏',
}

// ─── Tag Dimensions ──────────────────────────────────────────────────────────
export interface TagDimension {
 id: number
 dimension_code: string
 dimension_name: string
 multi_select_enabled:0 |1
 tag_count: number
}

export const TAG_DIMENSIONS: TagDimension[] = [
 { id:1, dimension_code:'theme', dimension_name:'内容主题', multi_select_enabled:1, tag_count:8 },
 { id:2, dimension_code:'series', dimension_name:'内容系列', multi_select_enabled:1, tag_count:5 },
 { id:3, dimension_code:'age', dimension_name:'年龄段', multi_select_enabled:1, tag_count:6 },
 { id:4, dimension_code:'grade', dimension_name:'年级', multi_select_enabled:1, tag_count:6 },
 { id:5, dimension_code:'gender', dimension_name:'性别', multi_select_enabled:0, tag_count:3 },
 { id:6, dimension_code:'ability', dimension_name:'能力', multi_select_enabled:1, tag_count:7 },
 { id:7, dimension_code:'scene', dimension_name:'场景', multi_select_enabled:1, tag_count:4 },
 { id:8, dimension_code:'visual', dimension_name:'视觉主题', multi_select_enabled:1, tag_count:5 },
]

export interface TagItem {
 id: number
 dimension_id: number
 tag_code: string
 tag_name: string
 status:0 |1
 sort_no: number
}

export const TAG_ITEMS: TagItem[] = [
 { id:1, dimension_id:1, tag_code:'theme_chinese', tag_name:'语文', status:1, sort_no:1 },
 { id:2, dimension_id:1, tag_code:'theme_math', tag_name:'数学', status:1, sort_no:2 },
 { id:3, dimension_id:1, tag_code:'theme_science', tag_name:'科学', status:1, sort_no:3 },
 { id:4, dimension_id:1, tag_code:'theme_sport', tag_name:'运动', status:1, sort_no:4 },
 { id:5, dimension_id:3, tag_code:'age_3_6', tag_name:'3-6岁', status:1, sort_no:1 },
 { id:6, dimension_id:3, tag_code:'age_6_9', tag_name:'6-9岁', status:1, sort_no:2 },
 { id:7, dimension_id:3, tag_code:'age_9_12', tag_name:'9-12岁', status:1, sort_no:3 },
 { id:8, dimension_id:4, tag_code:'grade_1', tag_name:'一年级', status:1, sort_no:1 },
 { id:9, dimension_id:4, tag_code:'grade_2', tag_name:'二年级', status:1, sort_no:2 },
 { id:10, dimension_id:4, tag_code:'grade_3', tag_name:'三年级', status:1, sort_no:3 },
 { id:11, dimension_id:5, tag_code:'gender_all', tag_name:'不限', status:1, sort_no:1 },
 { id:12, dimension_id:5, tag_code:'gender_male', tag_name:'男', status:1, sort_no:2 },
 { id:13, dimension_id:5, tag_code:'gender_female', tag_name:'女', status:1, sort_no:3 },
 { id:14, dimension_id:6, tag_code:'ability_logic', tag_name:'逻辑思维', status:1, sort_no:1 },
 { id:15, dimension_id:6, tag_code:'ability_memory', tag_name:'记忆力', status:1, sort_no:2 },
 { id:16, dimension_id:6, tag_code:'ability_reaction', tag_name:'反应力', status:1, sort_no:3 },
 { id:17, dimension_id:7, tag_code:'scene_break', tag_name:'课间', status:1, sort_no:1 },
 { id:18, dimension_id:7, tag_code:'scene_home', tag_name:'首页', status:1, sort_no:2 },
]

export interface DistributionRule {
 id: number
 rule_name: string
 game_id: number
 game_name: string
 age_min: number
 age_max: number
 gender_limit:0 |1 |2
 max_exposure_total: number
 cooldown_days: number
 enabled:0 |1
 valid_from: string
 valid_to: string
 updated_at: string
}

export const DISTRIBUTION_RULES: DistributionRule[] = [
 { id:1, rule_name:'泡泡答题-低龄策略', game_id:1, game_name:'泡泡答题', age_min:3, age_max:6, gender_limit:0, max_exposure_total:10, cooldown_days:3, enabled:1, valid_from:'2024-01-01', valid_to:'2024-12-31', updated_at:'2024-03-15' },
 { id:2, rule_name:'泡泡答题-中龄策略', game_id:1, game_name:'泡泡答题', age_min:6, age_max:9, gender_limit:0, max_exposure_total:15, cooldown_days:2, enabled:1, valid_from:'2024-01-01', valid_to:'2024-12-31', updated_at:'2024-03-15' },
 { id:3, rule_name:'跳跳答题-全龄策略', game_id:2, game_name:'跳跳答题', age_min:3, age_max:12, gender_limit:0, max_exposure_total:8, cooldown_days:5, enabled:1, valid_from:'2024-02-01', valid_to:'2024-12-31', updated_at:'2024-03-14' },
 { id:4, rule_name:'体感互动-男生专属', game_id:3, game_name:'体感互动', age_min:6, age_max:12, gender_limit:1, max_exposure_total:20, cooldown_days:1, enabled:0, valid_from:'2024-03-01', valid_to:'2024-06-30', updated_at:'2024-03-13' },
]

export interface UserGameState {
 id: number
 user_id: number
 user_name: string
 game_id: number
 game_name: string
 current_level: number
 exposure_count_total: number
 play_count_total: number
 avg_accuracy: number
 mastered_flag:0 |1
 cooldown_until: string | null
 last_play_at: string
}

export const USER_GAME_STATES: UserGameState[] = [
 { id:1, user_id:1001, user_name:'小明', game_id:1, game_name:'泡泡答题', current_level:3, exposure_count_total:8, play_count_total:6, avg_accuracy:82.5, mastered_flag:0, cooldown_until:null, last_play_at:'2024-03-15' },
 { id:2, user_id:1001, user_name:'小明', game_id:2, game_name:'跳跳答题', current_level:2, exposure_count_total:5, play_count_total:3, avg_accuracy:65.0, mastered_flag:0, cooldown_until:'2024-03-18', last_play_at:'2024-03-13' },
 { id:3, user_id:1002, user_name:'小红', game_id:1, game_name:'泡泡答题', current_level:5, exposure_count_total:10, play_count_total:10, avg_accuracy:95.2, mastered_flag:1, cooldown_until:null, last_play_at:'2024-03-15' },
 { id:4, user_id:1003, user_name:'小刚', game_id:3, game_name:'体感互动', current_level:1, exposure_count_total:3, play_count_total:2, avg_accuracy:55.0, mastered_flag:0, cooldown_until:null, last_play_at:'2024-03-12' },
]
