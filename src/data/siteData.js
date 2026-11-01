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

const img = (name) => resolveAssetUrl(`images/thozha/${name}`)

export const serviceItems = [
  { slug: '2d-building-plans', icon: Ruler, title: '2D Building Plans', copy: 'Functional residential and commercial layouts.', image: img('sample-stage1-cad.jpg') },
  { slug: '3d-exterior-design', icon: Home, title: '3D Exterior Design', copy: 'Realistic exterior visualization before construction.', image: img('portfolio-anamalai.jpg') },
  { slug: '3d-interior-design', icon: Paintbrush2, title: '3D Interior Design', copy: 'Beautiful and practical interior spaces.', image: img('sample-stage3-handover.jpg') },
  { slug: 'building-approval-plans', icon: FileCheck2, title: 'Building Approval Plans', copy: 'Technical drawings and documentation support.', image: img('portfolio-commercial.jpg') },
  { slug: 'dtcp-layout-approvals', icon: LayoutTemplate, title: 'DTCP Layout Approvals', copy: 'Assistance with applicable layout approval processes.', image: img('portfolio-kinathukadavu.jpg') },
  { slug: 'bank-estimates', icon: Landmark, title: 'Bank Estimates', copy: 'Construction estimates and supporting documents.', image: img('portfolio-vettaikaranpudur.jpg') },
  { slug: 'building-construction', icon: HardHat, title: 'Building Construction', copy: 'Coordinated execution with attention to quality.', image: img('sample-stage2-rcc.jpg') },
  { slug: 'civil-engineering-consultancy', icon: DraftingCompass, title: 'Civil Engineering Consultancy', copy: 'Engineering guidance from planning to completion.', image: img('portfolio-commercial.jpg') },
]

export const processItems = [
  { number: '01', title: 'Planning & Design', copy: 'Understanding your needs, site requirements and creating thoughtful design solutions.', image: img('sample-stage1-cad.jpg') },
  { number: '02', title: '3D Visualization', copy: 'Realistic exterior and interior visualization to help you see your future space.', image: img('portfolio-anamalai.jpg') },
  { number: '03', title: 'Approvals & Documentation', copy: 'Building approval drawings, DTCP layout assistance, estimates and required documentation.', image: img('portfolio-commercial.jpg') },
  { number: '04', title: 'Construction & Handover', copy: 'Coordinated construction and technical oversight through project completion.', image: img('sample-stage2-rcc.jpg') },
]
