import { useMemo, useState } from 'react'

import ImageModal from '@/components/ImageModal'
import ProjectMasonry from '@/components/ProjectMasonry'
import SectionHeader from '@/components/SectionHeader'
import { PROJECT_CATEGORIES } from '@/utils/constants'
import { cn } from '@/utils/helpers'

function ProjectsSection({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter, projects])

  return (
    <section id="projects" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Architectural Portfolio"
          title="Selected residential, commercial, and renovation works"
          description="A curated look at spaces engineered with structural rigor, spatial generosity, and enduring material craftsmanship."
          actions={
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={cn(
                    'rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition',
                    activeFilter === category
                      ? 'border border-accent bg-accent text-white shadow-sm'
                      : 'border border-stone-200 bg-white text-inkMuted hover:border-stone-300 hover:text-ink',
                  )}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          }
        />

        {filteredProjects.length ? (
          <div className="mt-10">
            <ProjectMasonry
              projects={filteredProjects}
              onSelect={setSelectedProject}
            />
          </div>
        ) : (
          <div className="panel mt-8 p-12 text-center">
            <p className="font-display text-2xl font-semibold text-ink">
              No projects in this category yet
            </p>
            <p className="mt-3 text-sm text-inkMuted">
              Publish projects from the dashboard or switch categories to explore other works.
            </p>
          </div>
        )}

        <ImageModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  )
}

export default ProjectsSection
