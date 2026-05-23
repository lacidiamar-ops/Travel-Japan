import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wordSections } from './wordContent.js'
import {
  CalendarDays, Map, UtensilsCrossed, Sparkles, Wallet, Briefcase,
  Menu, Bell, SunMedium, ChevronRight, MapPin, Clock3, Footprints,
  Camera, WalletCards, Globe, Smartphone, Hotel, Plane, Train, Phone,
  Languages, Mic, Volume2, Search, Send, PlusCircle, Trash2, Download,
  Flame, Route, Navigation, HeartPulse, FileText
} from 'lucide-react'

const assets = {
  logo: '/assets/logo-famille-lacidi.png',
  icon: '/assets/app-icon-famille-lacidi.png',
  splash: '/assets/splash-famille-lacidi.png',
  banner: '/assets/home-banner-famille-lacidi.png',
}

const days = [
  { id: 1, date: '11 juil.', city: 'Osaka', title: 'Tokyo → Osaka → Dotonbori', image: 'https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e?auto=format&fit=crop&w=1200&q=80', summary: 'Haneda, Shinkansen, check-in Candeo Hotel Osaka Namba, soirée Dotonbori.', timeRange: '11:00 – 22:00', steps: '13 850 pas', highlights: ['Haneda', 'Tokyo Station', 'Dotonbori', 'Street food'], restaurants: ['Kukuru Takoyaki', 'Creo-ru', 'Rikuro Ojisan'], spots: ['Glico Running Man', 'Tombori Riverwalk'] },
  { id: 2, date: '12 juil.', city: 'Osaka', title: 'Namba Yasaka → Osaka Castle → Shinsekai', image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=1200&q=80', summary: 'Tête de lion, château d’Osaka, Tempozan, Tsutenkaku et kushikatsu.', timeRange: '08:30 – 21:00', steps: '15 100 pas', highlights: ['Namba Yasaka', 'Osaka Castle', 'Shinsekai'], restaurants: ['Daruma Kushikatsu', 'Tempozan Food Court'], spots: ['Tsutenkaku', 'Osaka Castle'] },
  { id: 3, date: '13 juil.', city: 'Osaka', title: 'Universal Studios Japan', image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1200&q=80', summary: 'Super Nintendo World, Harry Potter, Jurassic Park et Umeda en soirée.', timeRange: '06:30 – 22:00', steps: '20 500 pas', highlights: ['USJ', 'Nintendo', 'Harry Potter'], restaurants: ['USJ snacks', 'Ichiran Shinjuku'], spots: ['Super Nintendo World', 'Hogwarts'] },
  { id: 4, date: '14 juil.', city: 'Nara / Kyoto', title: 'Nara → arrivée Gion', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80', summary: 'Daims de Nara puis installation à Kyoto et soirée Gion.', timeRange: '08:00 – 21:30', steps: '14 600 pas', highlights: ['Nara Park', 'Kasuga Taisha', 'Gion'], restaurants: ['Nakatanidou', 'Gyoza ChaoChao'], spots: ['Daims', 'Yasaka Shrine'] },
  { id: 5, date: '15 juil.', city: 'Kyoto', title: 'Kyoto – Jour 1 ⛩️', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80', summary: 'Kiyomizu-dera, Sannenzaka, Yasaka Shrine, Nishiki Market, Gion & Shirakawa.', timeRange: '08:00 – 21:30', steps: '15 420 pas', highlights: ['Kiyomizu-dera', 'Nishiki Market', 'Gion'], restaurants: ['Nishiki Market', 'Ramen Sen no Kaze'], spots: ['Kiyomizu-dera', 'Sannenzaka', 'Gion Shirakawa'] },
  { id: 6, date: '16 juil.', city: 'Kyoto', title: 'Fushimi Inari → Arashiyama', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80', summary: 'Torii rouges, forêt de bambous, Tenryu-ji et Pontocho.', timeRange: '07:30 – 21:00', steps: '16 200 pas', highlights: ['Fushimi Inari', 'Bamboo Grove', 'Pontocho'], restaurants: ['% Arabica', 'Pontocho Alley'], spots: ['Torii rouges', 'Togetsukyo Bridge'] },
  { id: 7, date: '17 juil.', city: 'Kyoto / Séoul', title: 'Gion Matsuri → Séoul', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80', summary: 'Festival Gion Matsuri, Haruka Express, vol KIX → Incheon, Myeongdong.', timeRange: '08:00 – 23:00', steps: '10 800 pas', highlights: ['Gion Matsuri', 'Haruka', 'Myeongdong'], restaurants: ['Myeongdong Street Food'], spots: ['Shijo Kawaramachi', 'Myeongdong night'] },
  { id: 8, date: '18 juil.', city: 'Séoul', title: 'Gyeongbokgung → Bukchon → Myeongdong', image: 'https://images.unsplash.com/photo-1538485399081-7c8ed2c331ca?auto=format&fit=crop&w=1200&q=80', summary: 'Palais royal, village hanok, Insadong et street food Myeongdong.', timeRange: '09:00 – 21:30', steps: '14 900 pas', highlights: ['Gyeongbokgung', 'Bukchon', 'Myeongdong'], restaurants: ['Myeongdong Kyoja', 'Insadong Geujib'], spots: ['Bukchon Hanok', 'Myeongdong neon'] },
  { id: 9, date: '19 juil.', city: 'Séoul', title: 'N Seoul Tower → Hongdae', image: 'https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?auto=format&fit=crop&w=1200&q=80', summary: 'Vue Namsan, marchés, Hongdae et dîner BBQ coréen.', timeRange: '10:00 – 22:00', steps: '13 400 pas', highlights: ['N Seoul Tower', 'Hongdae'], restaurants: ['Wangbijib', 'Hongdae Chicken'], spots: ['Namsan', 'Hongdae'] },
  { id: 10, date: '20 juil.', city: 'Busan', title: 'Séoul → Busan + Haeundae', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=80', summary: 'KTX vers Busan, Haeundae Beach, Dongbaekseom et The Bay 101.', timeRange: '08:00 – 21:30', steps: '12 100 pas', highlights: ['KTX', 'Haeundae', 'The Bay 101'], restaurants: ['Haeundae Market', 'The Bay 101'], spots: ['Haeundae', 'Skyline Busan'] },
  { id: 11, date: '21 juil.', city: 'Busan', title: 'Temple mer → Gamcheon → Gwangalli', image: 'https://images.unsplash.com/photo-1605322535860-0f657f4eae2d?auto=format&fit=crop&w=1200&q=80', summary: 'Temple Haedong Yonggungsa, Gamcheon, Jagalchi et Gwangalli.', timeRange: '09:00 – 22:00', steps: '16 050 pas', highlights: ['Temple mer', 'Gamcheon', 'Gwangalli'], restaurants: ['Jagalchi', 'BIFF Square'], spots: ['Gamcheon', 'Gwangalli Bridge'] },
  { id: 12, date: '22 juil.', city: 'Tokyo', title: 'Busan → Narita → Shinjuku', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80', summary: 'Gimhae Airport, vol vers Narita, Narita Express puis Shinjuku.', timeRange: '08:30 – 22:00', steps: '9 400 pas', highlights: ['Blue Line Park', 'NEX', 'Shinjuku'], restaurants: ['Shinjuku late dinner'], spots: ['Kabukicho'] },
]

const instagramBuzz = [
  { city: 'Osaka', area: 'Dotonbori / Namba', top: ['Takoyaki Dotonbori Kukuru', 'Creo-ru Takoyaki', 'Kani Doraku', 'Rikuro Ojisan', 'Kuromon Ichiba'], note: 'Néons, street food, foule très forte le soir.' },
  { city: 'Kyoto', area: 'Nishiki / Gion / Higashiyama', top: ['Nishiki Market', 'KUMONOCHA Gion', 'Ninenzaka sweets', 'Arashiyama cafés'], note: 'Ultra photogénique entre 11h et 16h.' },
  { city: 'Tokyo', area: 'Harajuku / Shibuya / Asakusa', top: ['Takeshita Street', 'Totti Candy Factory', 'Flipper’s', 'Asakusa Kagetsudo', 'Tsukiji'], note: 'Très viral, desserts, crossing et marchés.' },
  { city: 'Séoul', area: 'Myeongdong / Hongdae / Gwangjang', top: ['Myeongdong Street Food', 'Myeongdong Kyoja', 'Gwangjang Market', 'Jayeondo Salt Bread', 'Seongsu cafés'], note: 'Street food, K-pop, cafés tendance.' },
  { city: 'Busan', area: 'Haeundae / Gwangalli / Nampo', top: ['Haeundae Market', 'The Bay 101', 'Jagalchi', 'BIFF Square', 'Cheongsapo cafes'], note: 'Vue mer, skyline et cafés viraux.' },
]

const quickLinks = [
  { key: 'days', label: 'Jours', icon: CalendarDays, color: 'violet' },
  { key: 'map', label: 'Carte', icon: Map, color: 'blue' },
  { key: 'food', label: 'Food', icon: UtensilsCrossed, color: 'orange' },
  { key: 'ai', label: 'IA Assistant', icon: Sparkles, color: 'green' },
  { key: 'budget', label: 'Budget', icon: Wallet, color: 'pink' },
  { key: 'tools', label: 'Outils', icon: Briefcase, color: 'teal' },
]

const usefulInfo = [
  { icon: Globe, title: 'Passeport', line1: 'Vérifiez la validité', line2: '6+ mois', tone: 'violet' },
  { icon: Smartphone, title: 'eSIM', line1: 'Japon & Corée', line2: 'Installée', tone: 'pink' },
  { icon: SunMedium, title: 'Météo Tokyo', line1: '25°C', line2: 'Ensoleillé', tone: 'yellow' },
  { icon: SunMedium, title: 'Météo Séoul', line1: '24°C', line2: 'Peu nuageux', tone: 'blue' },
]

const reservationItems = [
  { icon: Train, title: 'Shinkansen Tokyo → Osaka', text: '11 juillet · Tokyo Station', maps: 'Tokyo Station Tokaido Shinkansen' },
  { icon: Hotel, title: 'Candeo Hotel Osaka Namba', text: '11 au 14 juillet', maps: 'Candeo Hotel Osaka Namba' },
  { icon: Hotel, title: 'Rinn Kiyomizu Gion', text: 'Kyoto · quartier Gion', maps: 'Rinn Kiyomizu Gion Kyoto' },
  { icon: Plane, title: 'Haruka Express → KIX', text: '17 juillet · Kyoto Station', maps: 'Kyoto Station Haruka Express' },
  { icon: Hotel, title: 'Mohenic Hotel Myeongdong', text: 'Séoul · Myeongdong', maps: 'Mohenic Hotel Seoul Myeongdong' },
  { icon: Train, title: 'KTX Séoul → Busan', text: '20 juillet · Seoul Station', maps: 'Seoul Station KTX' },
  { icon: Hotel, title: 'Sunset Hotel Haeundae', text: 'Busan · Haeundae Beach', maps: 'Sunset Hotel Haeundae Busan' },
  { icon: Train, title: 'Narita Express → Shinjuku', text: '22 juillet · Narita T1', maps: 'Narita Express Terminal 1' },
  { icon: Hotel, title: 'Shinjuku Prince Hotel', text: 'Tokyo', maps: 'Shinjuku Prince Hotel Tokyo' },
  { icon: Train, title: 'Romancecar Shinjuku → Hakone', text: '28 juillet', maps: 'Odakyu Shinjuku Station Romancecar' },
]

function euro(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })
  const update = (next) => {
    const resolved = typeof next === 'function' ? next(value) : next
    setValue(resolved)
    localStorage.setItem(key, JSON.stringify(resolved))
  }
  return [value, update]
}

function openMaps(place, mode = 'search') {
  const q = encodeURIComponent(place)
  const url = mode === 'directions'
    ? `https://www.google.com/maps/dir/?api=1&destination=${q}`
    : `https://www.google.com/maps/search/?api=1&query=${q}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function SectionTitle({ title, linkLabel, onLink }) {
  return (
    <div className="section-head">
      <h3>{title}</h3>
      {linkLabel && <button className="text-link" onClick={onLink}>{linkLabel}</button>}
    </div>
  )
}

function SplashScreen({ onStart }) {
  return (
    <div className="splash-screen">
      <img src={assets.splash} alt="Écran d’entrée Famille Lacidi" />
      <button
        className="start-hotspot"
        onClick={onStart}
        aria-label="Commencer l’aventure"
        title="Commencer l’aventure"
      >
        Commencer l’aventure
        <Plane size={22} />
      </button>
    </div>
  )
}

function QuickAction({ item, active, onClick }) {
  const Icon = item.icon
  return (
    <button className={`quick-action ${item.color} ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="quick-icon"><Icon size={28} /></span>
      <span>{item.label}</span>
    </button>
  )
}

function BudgetOverviewCard({ spent, total, onOpen }) {
  const remaining = total - spent
  const ratio = Math.max(0, Math.min(100, (spent / total) * 100))
  return (
    <div className="panel card-panel">
      <SectionTitle title="Budget global" />
      <div className="budget-stats">
        <div><small>Budget total</small><strong>{euro(total)}</strong></div>
        <div><small>Dépensé</small><strong>{euro(spent)}</strong><span>{ratio.toFixed(1)}%</span></div>
        <div><small>Restant</small><strong className="green">{euro(remaining)}</strong></div>
      </div>
      <div className="progress"><span style={{ width: `${ratio}%` }} /></div>
      <button className="line-action" onClick={onOpen}><WalletCards size={18} /> Voir le détail du budget <ChevronRight size={18} /></button>
    </div>
  )
}

function DayPreviewCard({ day, onOpen }) {
  return (
    <div className="next-day-card">
      <img src={day.image} alt={day.title} />
      <div className="next-day-content">
        <div className="date-badge">
          <strong>{String(day.id).padStart(2, '0')}</strong>
          <span>{day.date}</span>
        </div>
        <div className="next-day-text">
          <h4>{day.title}</h4>
          <p className="location"><MapPin size={15} /> {day.city}</p>
          <p className="summary">{day.summary}</p>
          <div className="meta-chips">
            <span className="chip green"><Clock3 size={15} /> {day.timeRange}</span>
            <span className="chip sand"><Footprints size={15} /> {day.steps}</span>
            <button className="chip blue" onClick={onOpen}><Camera size={15} /> Spots photo</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsefulCard({ info }) {
  const Icon = info.icon
  return (
    <div className="useful-card">
      <div className={`useful-icon ${info.tone}`}><Icon size={26} /></div>
      <div>
        <strong>{info.title}</strong>
        <p>{info.line1}</p>
        <span>{info.line2}</span>
      </div>
    </div>
  )
}


const weatherCodes = {
  0: 'Ciel dégagé', 1: 'Principalement clair', 2: 'Partiellement nuageux', 3: 'Couvert',
  45: 'Brouillard', 48: 'Brouillard givrant', 51: 'Bruine faible', 53: 'Bruine', 55: 'Bruine forte',
  61: 'Pluie faible', 63: 'Pluie', 65: 'Pluie forte', 71: 'Neige faible', 73: 'Neige', 75: 'Neige forte',
  80: 'Averses faibles', 81: 'Averses', 82: 'Averses fortes', 95: 'Orage'
}

function WeatherLiveCard() {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('Active la géolocalisation pour afficher la météo autour de toi.')
  const [loading, setLoading] = useState(false)

  const loadWeather = () => {
    if (!navigator.geolocation) {
      setStatus('La géolocalisation n’est pas disponible sur ce téléphone.')
      return
    }
    setLoading(true)
    setStatus('Recherche de ta position...')
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        const response = await fetch(url)
        const data = await response.json()
        setWeather({ ...data.current, latitude, longitude })
        setStatus('Météo mise à jour selon ta position actuelle.')
      } catch {
        setStatus('Impossible de charger la météo. Vérifie la connexion internet.')
      } finally {
        setLoading(false)
      }
    }, () => {
      setStatus('Autorisation géolocalisation refusée ou position indisponible.')
      setLoading(false)
    })
  }

  return (
    <div className="panel card-panel weather-card">
      <SectionTitle title="Météo autour de moi" linkLabel={weather ? 'Actualiser' : null} onLink={loadWeather} />
      {weather ? (
        <div className="weather-content">
          <div className="weather-main">
            <SunMedium size={32} />
            <div>
              <strong>{Math.round(weather.temperature_2m)}°C</strong>
              <span>{weatherCodes[weather.weather_code] || 'Météo actuelle'}</span>
            </div>
          </div>
          <div className="weather-details">
            <span>Ressenti {Math.round(weather.apparent_temperature)}°C</span>
            <span>Humidité {weather.relative_humidity_2m}%</span>
            <span>Vent {Math.round(weather.wind_speed_10m)} km/h</span>
          </div>
          <p className="soft">{status}</p>
        </div>
      ) : (
        <div className="weather-empty">
          <p className="soft">{status}</p>
          <button className="primary-action" onClick={loadWeather} disabled={loading}>
            {loading ? 'Chargement météo...' : 'Activer la météo en temps réel'} <MapPin size={17} />
          </button>
        </div>
      )}
    </div>
  )
}

function HomePage({ nextDay, spent, total, onGo }) {
  const [showAll, setShowAll] = useState(false)
  return (
    <motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="page-stack">
      <BudgetOverviewCard spent={spent} total={total} onOpen={() => onGo('budget')} />
      <WeatherLiveCard />

      <div className="panel card-panel">
        <SectionTitle title="Prochain jour" linkLabel={showAll ? 'Réduire' : 'Voir tout'} onLink={() => setShowAll(!showAll)} />
        <DayPreviewCard day={nextDay} onOpen={() => onGo('food')} />
      </div>

      {showAll && (
        <div className="days-list">
          {days.map((day) => (
            <div key={day.id} className="small-day-card" onClick={() => onGo('map')}>
              <img src={day.image} alt={day.title} />
              <div>
                <b>{day.date} · {day.city}</b>
                <p>{day.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <SectionTitle title="Informations utiles" />
        <div className="useful-grid">
          {usefulInfo.map((info) => <UsefulCard key={info.title} info={info} />)}
        </div>
      </div>
    </motion.div>
  )
}

function MapPage() {
  const around = ['restaurant', 'café', 'toilettes', 'station métro', 'taxi', 'spot photo']
  return (
    <motion.div key="map" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="page-stack">
      <div className="panel card-panel">
        <SectionTitle title="Autour de moi" />
        <p className="soft">Recherche rapide autour de ta position via Google Maps.</p>
        <div className="pill-grid">
          {around.map((item) => <button key={item} className="pill-btn" onClick={() => openMaps(item, 'search')}>{item}</button>)}
        </div>
      </div>
      <div className="panel card-panel">
        <SectionTitle title="Points clés du voyage" />
        <div className="simple-list">
          {reservationItems.slice(0, 6).map((item) => (
            <button key={item.title} className="simple-row" onClick={() => openMaps(item.maps)}>
              <span className="simple-left"><item.icon size={18} /> {item.title}</span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FoodPage() {
  return (
    <motion.div key="food" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="page-stack">
      {days.map((day) => (
        <div className="panel card-panel" key={day.id}>
          <SectionTitle title={`${day.date} · ${day.city}`} />
          <h4 className="panel-title">{day.title}</h4>
          <p className="soft">{day.summary}</p>
          <div className="tag-wrap">
            {day.restaurants.map((r) => <button key={r} className="tag" onClick={() => openMaps(r)}>{r}</button>)}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function AIAssistantPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Pose une question sur le voyage : restaurant proche, trajet, idées de visite, etc.')
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    if (!question.trim()) return
    setLoading(true)
    try {
      const r = await fetch('/api/ask', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })
      const data = await r.json()
      setAnswer(data.answer || data.error || 'Réponse indisponible.')
    } catch {
      setAnswer('La route /api/ask devra être activée sur Vercel avec OPENAI_API_KEY.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div key="ai" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="page-stack">
      <div className="panel card-panel">
        <SectionTitle title="IA Assistant" />
        <p className="soft">Assistant de voyage embarqué : transports, restaurants, itinéraires, conseils terrain.</p>
        <textarea className="text-control" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ex : Où dîner ce soir à Kyoto près de Gion ?" />
        <button className="primary-action" onClick={ask}>{loading ? 'Envoi...' : 'Envoyer la question'} <Send size={17} /></button>
      </div>
      <div className="panel card-panel">
        <SectionTitle title="Réponse" />
        <p className="answer-box">{answer}</p>
      </div>
    </motion.div>
  )
}

function BudgetPage() {
  const [total, setTotal] = useLocalStorage('budget_total', 5000)
  const [spent, setSpent] = useLocalStorage('budget_spent', 1425)
  const [expenses, setExpenses] = useLocalStorage('budget_items', [])
  const [form, setForm] = useState({ label: '', amount: '' })

  const addExpense = () => {
    const amount = Number(form.amount)
    if (!form.label || !amount) return
    const item = { id: Date.now(), label: form.label, amount }
    setExpenses([item, ...expenses])
    setSpent((prev) => prev + amount)
    setForm({ label: '', amount: '' })
  }

  const removeExpense = (item) => {
    setExpenses(expenses.filter((x) => x.id !== item.id))
    setSpent((prev) => Math.max(0, prev - item.amount))
  }

  const exportCsv = () => {
    const rows = [['Libellé', 'Montant €'], ...expenses.map((x) => [x.label, x.amount])]
    const csv = rows.map((r) => r.join(';')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'budget-voyage.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div key="budget" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="page-stack">
      <BudgetOverviewCard spent={spent} total={total} onOpen={() => {}} />
      <div className="panel card-panel">
        <SectionTitle title="Réglages" />
        <div className="input-grid two">
          <label><span>Budget total (€)</span><input className="text-input" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value || 0))} /></label>
          <label><span>Dépensé (€)</span><input className="text-input" type="number" value={spent} onChange={(e) => setSpent(Number(e.target.value || 0))} /></label>
        </div>
      </div>
      <div className="panel card-panel">
        <SectionTitle title="Ajouter une dépense" />
        <div className="input-grid two">
          <input className="text-input" placeholder="Ex : ramen Kyoto" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <input className="text-input" placeholder="Montant en €" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        </div>
        <button className="primary-action" onClick={addExpense}><PlusCircle size={17} /> Ajouter</button>
      </div>
      <div className="panel card-panel">
        <SectionTitle title="Historique" linkLabel="Exporter CSV" onLink={exportCsv} />
        <div className="simple-list">
          {expenses.length === 0 && <p className="soft">Aucune dépense enregistrée.</p>}
          {expenses.map((item) => (
            <div className="simple-row no-hover" key={item.id}>
              <span>{item.label} <small>{euro(item.amount)}</small></span>
              <button className="icon-btn" onClick={() => removeExpense(item)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function TranslatorPhotoBlock() {
  const [preview, setPreview] = useState('')
  const [file, setFile] = useState(null)
  const [result, setResult] = useState('La traduction apparaîtra ici.')
  const [loading, setLoading] = useState(false)

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const translate = async () => {
    if (!file) return setResult('Choisis une photo de menu avant de traduire.')
    setLoading(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        const r = await fetch('/api/translate-photo', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, targetLanguage: 'français' })
        })
        const d = await r.json()
        setResult(d.translation || d.error || 'Traduction indisponible.')
      } catch {
        setResult('La route /api/translate-photo devra être branchée sur Vercel.')
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="panel card-panel">
      <SectionTitle title="Traducteur photo" />
      <label className="upload-box">
        <Camera size={26} />
        <span>Prendre une photo ou choisir une image</span>
        <small>Carte restaurant, panneau, étiquette</small>
        <input type="file" accept="image/*" capture="environment" onChange={onFile} hidden />
      </label>
      {preview && <img className="preview-img" src={preview} alt="Aperçu" />}
      <button className="primary-action" onClick={translate}>{loading ? 'Traduction...' : 'Traduire la photo'} <Languages size={17} /></button>
      <p className="answer-box">{result}</p>
    </div>
  )
}

function VoiceBlock() {
  const [source, setSource] = useState('fr-FR')
  const [target, setTarget] = useState('japonais')
  const [transcript, setTranscript] = useState('')
  const [translation, setTranslation] = useState('La traduction apparaîtra ici.')
  const labels = { 'fr-FR': 'français', 'ja-JP': 'japonais', 'ko-KR': 'coréen', 'en-US': 'anglais' }

  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setTranslation('La reconnaissance vocale navigateur n’est pas disponible ici. Chrome Android est le plus fiable.')
      return
    }
    const rec = new SR()
    rec.lang = source
    rec.onresult = async (e) => {
      const text = e.results?.[0]?.[0]?.transcript || ''
      setTranscript(text)
      try {
        const r = await fetch('/api/voice-translate', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, from: labels[source], to: target })
        })
        const d = await r.json()
        setTranslation(d.translation || d.error || 'Traduction indisponible.')
      } catch {
        setTranslation(`Route /api/voice-translate à brancher. Texte reconnu : ${text}`)
      }
    }
    rec.start()
  }

  const speak = () => {
    if (!window.speechSynthesis || !translation) return
    const utterance = new SpeechSynthesisUtterance(translation)
    utterance.lang = target === 'japonais' ? 'ja-JP' : target === 'coréen' ? 'ko-KR' : 'fr-FR'
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="panel card-panel">
      <SectionTitle title="Traducteur vocal" />
      <div className="voice-preset-grid">
        <button className="pill-btn" onClick={() => { setSource('fr-FR'); setTarget('japonais') }}>🇫🇷 → 🇯🇵</button>
        <button className="pill-btn" onClick={() => { setSource('ja-JP'); setTarget('français') }}>🇯🇵 → 🇫🇷</button>
        <button className="pill-btn" onClick={() => { setSource('fr-FR'); setTarget('coréen') }}>🇫🇷 → 🇰🇷</button>
        <button className="pill-btn" onClick={() => { setSource('ko-KR'); setTarget('français') }}>🇰🇷 → 🇫🇷</button>
      </div>
      <div className="input-grid two">
        <select className="text-input" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="fr-FR">Français</option><option value="ja-JP">Japonais</option><option value="ko-KR">Coréen</option>
        </select>
        <select className="text-input" value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="français">Français</option><option value="japonais">Japonais</option><option value="coréen">Coréen</option>
        </select>
      </div>
      <button className="primary-action" onClick={listen}><Mic size={17} /> Appuyer et parler</button>
      <div className="two-boxes">
        <div className="mini-box"><small>Texte reconnu</small><p>{transcript || 'La phrase reconnue apparaîtra ici.'}</p></div>
        <div className="mini-box"><small>Traduction</small><p>{translation}</p></div>
      </div>
      <button className="secondary-action" onClick={speak}><Volume2 size={17} /> Lire la traduction</button>
    </div>
  )
}

function BuzzBlock() {
  return (
    <div className="panel card-panel">
      <SectionTitle title="Instagram Buzz" />
      <p className="soft">Section totalement séparée du planning : seulement les lieux qui buzzent le plus sur Instagram.</p>
      <div className="buzz-stack">
        {instagramBuzz.map((item) => (
          <div className="buzz-card" key={item.city + item.area}>
            <div className="buzz-head"><Camera size={17} /> <strong>{item.city} · {item.area}</strong></div>
            <p>{item.note}</p>
            <div className="tag-wrap">
              {item.top.map((place) => (
                <span key={place} className="buzz-actions">
                  <button className="tag" onClick={() => openMaps(place)}>{place}</button>
                  <button className="tag instagram-tag" onClick={() => window.open(`https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(place)}`, '_blank', 'noopener,noreferrer')}>Instagram</button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function FullWordGuide() {
  const [selected, setSelected] = useState(1)
  const section = wordSections.find((s) => s.id === selected) || wordSections[0]
  return (
    <div className="panel card-panel">
      <SectionTitle title="Carnet Word complet par jour" />
      <p className="soft">Tous les textes du fichier Word sont intégrés ici par section/jour, avec les photos extraites du document. Sélectionne une journée pour consulter le détail complet.</p>
      <select className="text-input word-select" value={selected} onChange={(e) => setSelected(Number(e.target.value))}>
        {wordSections.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
      </select>
      <div className="word-detail">
        <h4>{section.title}</h4>
        {section.images?.length > 0 && (
          <div className="word-gallery">
            {section.images.map((src, idx) => <img key={`${src}-${idx}`} src={src} alt={`Photo ${idx + 1} ${section.title}`} loading="lazy" />)}
          </div>
        )}
        <div className="word-text">
          {section.paragraphs.map((p, idx) => {
            const isTitle = /^([📍>]*\s*)?(jour|JOUR|📅|✈️|🚄|🏯|Tokyo|Le |le |\d{1,2}\s+juillet|Programme)/.test(p)
            return <p key={idx} className={isTitle ? 'word-line word-heading' : 'word-line'}>{p}</p>
          })}
        </div>
      </div>
    </div>
  )
}

function ToolsPage() {
  return (
    <motion.div key="tools" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="page-stack">
      <div className="panel card-panel">
        <SectionTitle title="Réservations clés" />
        <div className="simple-list">
          {reservationItems.map((item) => (
            <button className="simple-row" key={item.title} onClick={() => openMaps(item.maps)}>
              <span className="simple-left"><item.icon size={18} /> <span><b>{item.title}</b><small>{item.text}</small></span></span>
              <Navigation size={18} />
            </button>
          ))}
        </div>
      </div>
      <FullWordGuide />
      <div className="panel card-panel">
        <SectionTitle title="Urgence & santé" />
        <div className="input-grid two">
          <a className="call-card" href="tel:110"><Phone size={18} /> Police Japon 110</a>
          <a className="call-card" href="tel:119"><Phone size={18} /> Urgence Japon 119</a>
          <a className="call-card" href="tel:112"><Phone size={18} /> Police Corée 112</a>
          <a className="call-card" href="tel:119"><HeartPulse size={18} /> Pompiers Corée 119</a>
        </div>
      </div>
      <BuzzBlock />
      <TranslatorPhotoBlock />
      <VoiceBlock />
    </motion.div>
  )
}

function AppShell() {
  const [tab, setTab] = useState('days')
  const [spent] = useLocalStorage('budget_spent', 1425)
  const [total] = useLocalStorage('budget_total', 5000)
  const nextDay = useMemo(() => days[4], [])

  const page = {
    days: <HomePage nextDay={nextDay} spent={spent} total={total} onGo={setTab} />,
    map: <MapPage />,
    food: <FoodPage />,
    ai: <AIAssistantPage />,
    budget: <BudgetPage />,
    tools: <ToolsPage />,
  }[tab]

  return (
    <div className="phone-shell">
      <div className="hero-banner">
        <img src={assets.banner} alt="Bandeau voyage Famille Lacidi" />
        <div className="hero-topbar">
          <button className="round-btn"><Menu size={20} /></button>
          <div className="hero-actions">
            <button className="round-btn"><Bell size={20} /></button>
            <button className="round-btn"><SunMedium size={20} /></button>
          </div>
        </div>
      </div>

      <div className="home-surface">
        <div className="quick-grid">
          {quickLinks.map((item) => <QuickAction key={item.key} item={item} active={tab === item.key} onClick={() => setTab(item.key)} />)}
        </div>

        <AnimatePresence mode="wait">{page}</AnimatePresence>
      </div>

      <nav className="bottom-nav">
        {quickLinks.map((item) => {
          const Icon = item.icon
          return (
            <button key={item.key} className={`bottom-item ${tab === item.key ? 'active' : ''}`} onClick={() => setTab(item.key)}>
              <Icon size={21} />
              <span>{item.label === 'IA Assistant' ? 'IA' : item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default function App() {
  const [started, setStarted] = useState(() => sessionStorage.getItem('lacidi-started') === '1')
  if (!started) return <SplashScreen onStart={() => { sessionStorage.setItem('lacidi-started', '1'); setStarted(true) }} />
  return <AppShell />
}
