export interface Skill {
  name: string
  type: string
  level: 'advanced' | 'intermediate' | 'beginner'
}

export interface Education {
  id: number
  title: { en: string; pt: string }
  institution: { en: string; pt: string }
  timeframe: string
  location: string
  description: { en: string; pt: string }
  inprogress: boolean
  logo: string | null
  certification: string | null
  type: 'degree' | 'long_course' | 'certification'
  duration?: string
}

export interface Experience {
  id: number
  company: string
  role: string
  location: string
  timeframe: { en: string; pt: string }
  description: { en: string[]; pt: string[] }
  stack: string[]
  current: boolean
  logo: string | null
}

export interface Project {
  id: number
  name: string
  overview: { en: string; pt: string }
  description: { en: string[]; pt: string[] }
  stack: string[]
  github: string | null
  demo: string | null
  logo: string | null
  gallery: { id: number; image: string | null; caption: { en: string; pt: string } }[]
}