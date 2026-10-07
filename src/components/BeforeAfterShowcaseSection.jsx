import { motion } from 'framer-motion'

import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import SectionHeader from '@/components/SectionHeader'

function BeforeAfterShowcaseSection({ company, projects = [] }) {
  const dashboardTransformation =
    company.featured_before_image_url && company.featured_after_image_url
      ? {
          id: 'dashboard-before-after',
          title:
            company.featured_before_after_title ||
            'Courtyard Residence Transformation',
          beforeImage: {
            src: company.featured_before_image_url,
            alt: `${company.name} before`,
          },
          afterImage: {
            src: company.featured_after_image_url,
            alt: `${company.name} after`,
          },
        }
      : null

  const projectTransformation = projects.find(
    (project) => project.beforeImage && project.afterImage,
  )

  const featuredTransformation = dashboardTransformation || projectTransformation

  if (!featuredTransformation) {
    return null
  }

  return (
    <section className="section-space bg-stone-50/40">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Visible Transformation"
          title="From initial site condition to completed architecture"
          description="Drag the interactive slider to see how disciplined civil engineering, structural re-alignment, and tactile finishes transform spaces."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <BeforeAfterSlider
            before={featuredTransformation.beforeImage}
            after={featuredTransformation.afterImage}
            title={featuredTransformation.title}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default BeforeAfterShowcaseSection
