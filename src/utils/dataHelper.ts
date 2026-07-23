import type { Skill, Education, Experience } from '../types'

// ── Skills ─────────────────────────────────────────────

/** Groups skills by type */
export function groupSkillsByType(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = []
    acc[skill.type].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
}

/** Filters skills by type */
export function filterSkillsByType(skills: Skill[], type: string): Skill[] {
  return skills.filter(s => s.type === type)
}

/** Filter skills by level */
export function filterSkillsByLevel(skills: Skill[], level: Skill['level']): Skill[] {
  return skills.filter(s => s.level === level)
}

// ── Education ──────────────────────────────────────────

/** Filters education by type (degree | long_course | certification) */
export function filterEducationByType(items: Education[], type: Education['type']): Education[] {
  return items.filter(e => e.type === type)
}

/** Returns only items with certification (PDF available) */
export function getCertifiedItems(items: Education[]): Education[] {
  return items.filter(e => e.certification !== null)
}

// ── Experience ─────────────────────────────────────────

/** Returns the current job */
export function getCurrentExperience(items: Experience[]): Experience | undefined {
  return items.find(e => e.current)
}

// ── Language utility ────────────────────────────

/** Extracts the correct value from a field { en: T, pt: T } */
export function getLang<T>(obj: { en: T; pt: T }, lang: string): T {
  return obj[lang as keyof typeof obj] ?? obj.en
}