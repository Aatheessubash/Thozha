import { motion } from 'framer-motion'

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  actions = null,
}) {
  const isCentered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`mb-10 sm:mb-12 flex flex-col gap-3.5 ${
        isCentered ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      {eyebrow ? (
        <span className="eyebrow self-start sm:self-auto">
          {eyebrow}
        </span>
      ) : null}

      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        {description ? (
          <p
            className={`mt-3 text-base leading-relaxed text-inkMuted sm:text-lg ${
              isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div
          className={`mt-2 flex w-full flex-wrap ${
            isCentered ? 'justify-center' : 'justify-start'
          }`}
        >
          {actions}
        </div>
      ) : null}
    </motion.div>
  )
}

export default SectionHeader
