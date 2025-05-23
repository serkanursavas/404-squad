// components/CustomOption.tsx

import { components } from 'react-select'
import Tooltip from '../../utils/Tooltip'
import { Info, Star } from 'lucide-react' // Lucide ikonları örnek olarak eklendi

const CustomOption = (props: any) => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div className={`flex items-center justify-between w-full ${data.label === 'MVP' ? '' : ''}`}>
        <span className={` ${data.label === 'MVP' ? 'text-neutral-dark  flex justify-center items-center space-x-3' : ''}`}>
          {
            <span>
              {data.label === 'MVP' ? (
                <Star
                  className="w-5 h-5 mb-1 animate-pulse"
                  style={{ color: '#FCD34D' }}
                  strokeWidth={2}
                  fill="#FCD34D"
                />
              ) : (
                ''
              )}
            </span>
          }{' '}
          <span className={`${data.label === 'MVP' ? 'tracking-[0.3em]' : ''}`}>{data.label}</span>
        </span>

        {/* Info icon + tooltip */}
        {data.description && (
          <Tooltip
            content={data.description}
            position="left"
            width="56"
          >
            <button
              type="button"
              onClick={e => e.stopPropagation()}
              className="px-4 py-1 ml-2 text-gray-500 hover:text-gray-800"
            >
              <Info
                className="w-5 h-5"
                style={{ color: '#3498db' }}
                strokeWidth={3}
              />
            </button>
          </Tooltip>
        )}
      </div>
    </components.Option>
  )
}

export default CustomOption
