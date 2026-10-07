import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'

function ProjectMasonry({ projects, onSelect }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white transition-all duration-300 hover:shadow-soft"
        >
          {/* Unobstructed Architectural Image Container */}
          <div
            className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-stone-100"
            onClick={() => onSelect(project)}
          >
            <img
              src={project.image?.src}
              alt={project.image?.alt || project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Category Micro-Pill in Top Corner */}
            <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
              <span className="rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Quick Inspect Hover Icon */}
            <div className="absolute right-3.5 bottom-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Editorial Details Below The Photograph */}
          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-inkMuted">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin size={13} className="text-accent" />
                  {project.location}
                </span>
                {project.year ? (
                  <span className="font-semibold">{project.year}</span>
                ) : null}
              </div>

              <h3
                onClick={() => onSelect(project)}
                className="cursor-pointer font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent"
              >
                {project.title}
              </h3>

              <p className="line-clamp-2 text-xs leading-relaxed text-inkMuted">
                {project.summary}
              </p>
            </div>

            {/* Project Specs Pill Row */}
            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] font-medium text-inkMuted">
              <span>{project.areaLabel || 'Turnkey Scope'}</span>
              <button
                type="button"
                onClick={() => onSelect(project)}
                className="font-semibold text-accent hover:underline"
              >
                View Details →
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

export default ProjectMasonry
