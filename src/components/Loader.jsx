import { AnimatePresence, motion } from 'framer-motion'

function Loader({ active }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF9F6]/95 backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative flex h-14 items-end justify-center gap-1.5">
              <motion.span
                className="w-2 rounded-full bg-accent"
                animate={{ height: [12, 36, 12] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-2 rounded-full bg-stone-400"
                animate={{ height: [28, 14, 28] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: 0.15, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-2 rounded-full bg-ink"
                animate={{ height: [16, 44, 16] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
              />
            </div>
            <div className="space-y-1">
              <p className="font-display text-lg font-bold tracking-tight text-ink">
                Thozha Associates
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-inkMuted">
                Architectural Portfolio
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
