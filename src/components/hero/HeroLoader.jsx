import { AnimatePresence, motion } from 'framer-motion'

/**
 * Minimal editorial loading indicator for the architectural walkthrough.
 * Displays only while the first critical frames decode, then fades away cleanly.
 */
function HeroLoader({ active = true, progress = 0 }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="hero-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FAF9F6] text-[#202623]"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            {/* Architectural Mark */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}images/thozha/thozha-logo.png`}
                alt="தோழா - Thozha Associates"
                className="h-16 w-auto object-contain animate-pulse"
              />
              <span className="font-display text-xs font-bold tracking-[0.3em] uppercase text-[#202623]">
                THOZHA ASSOCIATES
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-display text-2xl font-light tracking-tight text-[#202623] sm:text-3xl">
                Preparing Architectural Journey
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-[#5C6661]">
                Loading experience... {progress}%
              </p>
            </div>

            {/* Ultra-thin architectural precision line */}
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-stone-200">
              <motion.div
                className="h-full bg-[#0071E3]"
                style={{ width: `${Math.max(8, progress)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default HeroLoader

