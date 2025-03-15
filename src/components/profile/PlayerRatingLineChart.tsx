'use client'

import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts'

interface PlayerRatingLineChartProps {
  ratings: number[]
}

export default function PlayerRatingLineChart({ ratings }: PlayerRatingLineChartProps) {
  // Maç verisini uygun formata çeviriyoruz
  const chartData = ratings.map((rating, index) => ({
    match: index + 1, // X ekseni için sadece index kullanıyoruz (gizlenecek)
    Rating: rating // Y ekseni için: Rating değeri
  }))

  return (
    <div className="w-full px-4">
      <div className="w-full max-w-md p-3 mx-auto border border-neutral-dark bg-neutral-light shadow-pixel">
        <h2 className="mb-2 text-base tracking-[6px] text-center text-primary">FORM</h2>
        <ResponsiveContainer
          width="100%"
          height={160} // Daha minimal hale getirdik
        >
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }} // Boşlukları azalttık
          >
            {/* X Ekseni (Tamamen Gizlendi) */}
            <XAxis hide />

            {/* Y Ekseni (Daha Minimal ve Manuel Ayarlanmış) */}
            <YAxis
              domain={[4, 10]} // 0-10 arasında olacak
              ticks={[3, 4, 6, 10]} // Manuel tick değerleri
              tick={{ fill: '#4B5563', fontSize: 10 }} // Daha küçük font
              width={30} // Y ekseni genişliğini küçülttük
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }} // Daha ince çizgi
              tickLine={false} // Gereksiz iç çizgileri kaldırdık
            />
            <CartesianGrid
              stroke="#ddd"
              strokeDasharray="5 5"
            />

            {/* Tooltip (Hover ile bilgi gösterme) */}
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { dataKey, value } = payload[0]
                  return (
                    <div style={{ background: '#4B5563', border: '1px solid #000', color: '#fff', padding: '5px', fontSize: '12px' }}>
                      <p>{`${dataKey}: ${value}`}</p>
                    </div>
                  )
                }
                return null
              }}
              contentStyle={{ background: '#4B5563', border: '1px solid #000', color: '#fff' }}
            />

            {/* Rating Çizgisi */}
            <Area
              type="monotone"
              dataKey="Rating"
              stroke="#3498db" // Üçüncü renk (mavi ton)
              fill="#3498db" // Dolgu rengi
              strokeWidth={3} // Daha ince çizgi
              dot={{ stroke: '#C084FC', strokeWidth: 4 }} // Noktalar accent rengi (turuncu)
              activeDot={{ r: 8 }} // Aktif nokta büyüklüğü
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
