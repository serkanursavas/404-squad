import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TooltipProps = {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: string
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', width }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer"
      >
        {children}
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? -10 : 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-40 p-2 text-xs text-white bg-gray-700 border border-gray-500 rounded shadow-lg 
              ${position === 'top' ? 'bottom-full mb-2' : ''}
              ${position === 'bottom' ? 'top-full mt-2' : ''}
              ${position === 'left' ? 'right-full mr-2' : ''}
              ${position === 'right' ? 'left-full ml-2' : ''}
              ${width ? `w-${width}` : 'w-auto'}
            `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip
