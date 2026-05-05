import type { StudyContent } from '../types'
import { CONTENT_A } from './content-a'
import { CONTENT_B1_B4 } from './content-b1-b4'
import { CONTENT_B5_B8 } from './content-b5-b8'
import { CONTENT_C1_C2 } from './content-c1-c2'
import { CONTENT_C3_C5 } from './content-c3-c5'
import { CONTENT_D1_D3 } from './content-d1-d3'
import { CONTENT_D4_D6 } from './content-d4-d6'
import { CONTENT_E1_E3 } from './content-e1-e3'
import { CONTENT_E4_E6 } from './content-e4-e6'
import { CONTENT_F } from './content-f'

export const STUDY_CONTENT: Record<string, StudyContent> = {
  ...CONTENT_A,
  ...CONTENT_B1_B4,
  ...CONTENT_B5_B8,
  ...CONTENT_C1_C2,
  ...CONTENT_C3_C5,
  ...CONTENT_D1_D3,
  ...CONTENT_D4_D6,
  ...CONTENT_E1_E3,
  ...CONTENT_E4_E6,
  ...CONTENT_F,
}
