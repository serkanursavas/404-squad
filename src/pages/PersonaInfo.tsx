import usePersona from '../hooks/usePersona'

export default function PersonaInfo() {
  const categoryColors: Record<string, string> = {
    bireysel: '#4ade80', // Daha dolgun yeşil
    takim_dinamigi: '#fb923c', // Daha dolgun turuncu
    kaleci: '#f87171', // Daha dolgun kırmızı
    defans: '#818cf8', // Daha dolgun mor
    orta_saha: '#c084fc', // Daha dolgun lavanta
    forvet: '#38bdf8', // Daha dolgun mavi
    teknik: '#facc15', // Daha dolgun sarı
    special: 'linear-gradient(to right, #FFF, #FDE68A, #FBBF24)'
  }

  const { persona } = usePersona()
  const groupedPersonas = persona?.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = []
    }
    acc[entry.category].push(entry)
    return acc
  }, {} as Record<string, typeof persona>)

  return (
    <div className="p-6">
      <div className="p-3 mb-6 text-[10px] leading-5 text-black border-l-4 shadow-sm border-primary-error bg-gray-50">
        <p>
          Personalar, oyuncuların motivasyonunu artırmak, eğlenceyi sağlamak ve doğrudan ifade edemediğimiz düşünceleri oylama yöntemiyle paylaşmak
          için geliştirilmiştir. Her maç sonunda, rakip oyuncular da dahil olmak üzere tüm oyunculara adil ve anlamlı olacak şekilde, maksimum 3 tane,
          minimum 0 tane verilebilir. Aşağıda sistemde yer alan personelar kategorilere ayrılmış ve açıklamaları belirtilmiştir. Gerçekçi ve yapıcı
          değerlendirmeler yaparak, duyguya dayalı veya önyargılı seçimlerden kaçınalım.
        </p>
      </div>

      {groupedPersonas &&
        Object.entries(groupedPersonas)
          .sort(([keyA], [keyB]) => {
            if (keyA === 'special') return -1
            if (keyB === 'special') return 1
            return 0
          })
          .map(([category, entries]) => (
            <div
              key={category}
              className="mb-10"
            >
              <h2
                className="mb-4 text-sm text-center md:text-left"
                style={{ color: categoryColors[category] || '#6b7280' }}
              >
                {category
                  .replace(/_/g, ' ')
                  .replace(/i/g, 'İ')
                  .replace(/ı/g, 'I')
                  .replace(/ş/g, 'Ş')
                  .replace(/ğ/g, 'Ğ')
                  .replace(/ü/g, 'Ü')
                  .replace(/ö/g, 'Ö')
                  .replace(/ç/g, 'Ç')
                  .toUpperCase()}
              </h2>
              {/* Mobil tasarım için kart yapısı */}
              <div className="grid gap-4 md:hidden ">
                {entries.map(entry => (
                  <div
                    key={entry.id}
                    className="p-3 border border-gray-300 shadow-lg"
                    style={{
                      background: entry.category === 'special' ? 'linear-gradient(to right, #FFF, #FDE68A, #FBBF24)' : '#fff'
                    }}
                  >
                    <p
                      className="text-xs "
                      style={{
                        color: categoryColors[category] || '#6b7280'
                      }}
                    >
                      {entry.name}
                    </p>
                    <p className="text-gray-600 text-[9px] mt-2">{entry.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
    </div>
  )
}
