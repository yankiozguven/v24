import { motion } from 'framer-motion';

interface SatisfactionMeterProps {
  positiveCount: number;
  negativeCount: number;
}

const SatisfactionMeter: React.FC<SatisfactionMeterProps> = ({ positiveCount, negativeCount }) => {
  const total = positiveCount + negativeCount;
  const satisfactionScore = (positiveCount / total) * 100;
  
  // Skor değerine göre renk belirleme
  const getArcColor = (score: number) => {
    if (score < 33) return '#E57373'; // Kırmızımsı
    if (score < 66) return '#FFB74D'; // Turuncu/Sarı
    return '#81C784'; // Yeşilimsi
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-[#E57373]">Şu an:</h3>
        <p className="text-xl text-[#E57373] mt-1">
          {satisfactionScore < 33 ? 'Endişe' : satisfactionScore < 66 ? 'Nötr' : 'İyimser'}
        </p>
      </div>
      
      <div className="relative w-full h-[160px]">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          {/* Arka plan yarım daire (gri) */}
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Renkli gradient ark */}
          <defs>
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E57373" />
              <stop offset="50%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#81C784" />
            </linearGradient>
          </defs>

          {/* Aktif ark */}
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#meterGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${satisfactionScore * 2.5}, 250`}
          />

          {/* Skor göstergesi */}
          <g transform="translate(100, 75)">
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              r="25"
              fill="white"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="bold"
              fill="#374151"
            >
              {satisfactionScore.toFixed(0)}
            </motion.text>
          </g>

          {/* Ölçek etiketleri */}
          <text x="20" y="120" fontSize="12" fill="#6B7280">0</text>
          <text x="95" y="120" fontSize="12" fill="#6B7280">50</text>
          <text x="170" y="120" fontSize="12" fill="#6B7280">100</text>
        </svg>
      </div>
    </div>
  );
};

export default SatisfactionMeter; 