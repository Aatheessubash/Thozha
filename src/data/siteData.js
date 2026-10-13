import {
  DraftingCompass,
  FileCheck2,
  HardHat,
  Home,
  Landmark,
  LayoutTemplate,
  Paintbrush2,
  Ruler,
} from 'lucide-react'
import { resolveAssetUrl } from '@/services/frameSequence'

const generated = (name) => resolveAssetUrl(`images/thozha/${name}.webp`)

export const serviceItems = [
  { slug: '2d-building-plans', icon: Ruler, title: '2D Building Plans', copy: 'Functional residential and commercial layouts.', image: generated('planning-studio') },
  { slug: '3d-exterior-design', icon: Home, title: '3D Exterior Design', copy: 'Realistic exterior visualization before construction.', image: generated('tropical-residence') },
  { slug: '3d-interior-design', icon: Paintbrush2, title: '3D Interior Design', copy: 'Beautiful and practical interior spaces.', image: generated('tropical-interior') },
  { slug: 'building-approval-plans', icon: FileCheck2, title: 'Building Approval Plans', copy: 'Technical drawings and documentation support.', image: generated('mixed-use-building') },
  { slug: 'dtcp-layout-approvals', icon: LayoutTemplate, title: 'DTCP Layout Approvals', copy: 'Assistance with applicable layout approval processes.', image: generated('compact-urban-home') },
  { slug: 'bank-estimates', icon: Landmark, title: 'Bank Estimates', copy: 'Construction estimates and supporting documents.', image: generated('courtyard-renovation') },
  { slug: 'building-construction', icon: HardHat, title: 'Building Construction', copy: 'Coordinated execution with attention to quality.', image: generated('construction-site') },
  { slug: 'civil-engineering-consultancy', icon: DraftingCompass, title: 'Civil Engineering Consultancy', copy: 'Engineering guidance from planning to completion.', image: generated('mixed-use-building') },
]

export const processItems = [
  { number: '01', title: 'Planning & Design', copy: 'Understanding your needs, site requirements and creating thoughtful design solutions.', image: generated('planning-studio') },
  { number: '02', title: '3D Visualization', copy: 'Realistic exterior and interior visualization to help you see your future space.', image: generated('tropical-residence') },
  { number: '03', title: 'Approvals & Documentation', copy: 'Building approval drawings, DTCP layout assistance, estimates and required documentation.', image: generated('mixed-use-building') },
  { number: '04', title: 'Construction & Handover', copy: 'Coordinated construction and technical oversight through project completion.', image: generated('construction-site') },
]

