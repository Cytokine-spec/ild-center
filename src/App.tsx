import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Brain, 
  Pill, 
  Users, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Cigarette,
  Dna,
  Bed,
  Utensils
} from 'lucide-react';

// --- Custom Icons (Fallback for missing library icons) ---

const LungIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M17.5 19c0-1.7-1.3-3-3-3h-5c-1.7 0-3 1.3-3 3 .8 2.3 2.7 4 5.5 4s4.7-1.7 5.5-4z" />
    <path d="M8.2 16a6 6 0 0 1-.9-8.6L12 2l4.7 5.4a6 6 0 0 1-.9 8.6" />
    <path d="M9 8h6" />
  </svg>
);

// --- Types ---
type SlideId = 'intro' | 'problem' | 'solution' | 'domains' | 'pipeline' | 'conclusion';

interface SlideProps {
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
}

// --- Components ---

const SlideContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`w-full h-full flex flex-col items-center justify-center p-8 text-center ${className}`}>
    {children}
  </div>
);

const NavButtons: React.FC<{ onNext?: () => void; onPrev?: () => void; showNext?: boolean; showPrev?: boolean }> = ({ 
  onNext, onPrev, showNext = true, showPrev = true 
}) => (
  <div className="absolute bottom-8 flex gap-4 z-10">
    {showPrev && (
      <button 
        onClick={onPrev}
        className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={20} /> 前へ
      </button>
    )}
    {showNext && (
      <button 
        onClick={onNext}
        className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center gap-2 shadow-lg"
      >
        次へ <ArrowRight size={20} />
      </button>
    )}
  </div>
);

// --- Slides ---

// 1. Intro Slide
const IntroSlide: React.FC<SlideProps> = ({ onNext, onPrev }) => {
  return (
    <SlideContainer className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <LungIcon size={64} className="text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          間質性肺疾患（ILD）と<br/>
          <span className="text-blue-600">Treatable Traits</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          〜 包括的なプレシジョン・メディシン（精密医療）へのアプローチ 〜
        </p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-blue-100 inline-block text-left"
        >
          <p className="text-gray-700 font-medium">
            📝 解説のポイント：
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>従来の診断・治療の課題</li>
            <li>「Treatable Traits（治療可能な特性）」とは？</li>
            <li>4つの重要な領域（ドメイン）</li>
          </ul>
        </motion.div>
      </motion.div>
      <NavButtons onNext={onNext} onPrev={onPrev} showPrev={false} />
    </SlideContainer>
  );
};

// 2. Problem Slide
const ProblemSlide: React.FC<SlideProps> = ({ onNext, onPrev }) => {
  return (
    <SlideContainer className="bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-12 absolute top-12">現在のILD管理の課題</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { 
            icon: <Search size={40} />, 
            title: "診断の難しさ", 
            text: "ILDの分類は複雑で、診断が難しいケースや「分類不能」なケースも多い。",
            color: "text-amber-500",
            bg: "bg-amber-50"
          },
          { 
            icon: <Pill size={40} />, 
            title: "薬物療法の限界", 
            text: "抗線維化薬などは進行を遅らせるが、咳や息切れ、生活の質(QOL)の改善には不十分なことも。",
            color: "text-red-500",
            bg: "bg-red-50"
          },
          { 
            icon: <Stethoscope size={40} />, 
            title: "ケアの断片化", 
            text: "肺の病変ばかりに注目し、合併症や精神面、生活習慣のケアが不十分になりがち。",
            color: "text-purple-500",
            bg: "bg-purple-50"
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className={`p-6 rounded-2xl border-2 border-transparent hover:border-gray-100 shadow-lg ${item.bg} flex flex-col items-center`}
          >
            <div className={`mb-4 p-3 rounded-full bg-white ${item.color}`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-4 bg-gray-100 rounded-lg text-gray-700 font-medium"
      >
        診断名に基づいた「画一的な治療」だけでは、患者さん全体を支えきれない...
      </motion.div>

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </SlideContainer>
  );
};

// 3. Solution Concept Slide
const SolutionSlide: React.FC<SlideProps> = ({ onNext, onPrev }) => {
  return (
    <SlideContainer className="bg-gradient-to-br from-green-50 to-emerald-100">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-4xl w-full"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">解決策：Treatable Traits アプローチ</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-left space-y-4">
            <p className="text-lg text-gray-700">
              喘息やCOPDですでに導入されている<span className="font-bold text-blue-600">「個別化医療」</span>の考え方です。
            </p>
            <p className="text-gray-600">
              診断名（ラベル）にとらわれすぎず、患者さん一人ひとりの<span className="font-bold text-green-600">「治療可能な特性（Traits）」</span>をリストアップし、それぞれに対応します。
            </p>
          </div>

          <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Trait（特性）の3条件</h3>
            <ul className="space-y-3">
              {[
                "臨床的に重要である（予後やQOLに関わる）",
                "特定・測定が可能である（バイオマーカーなど）",
                "治療・介入が可能である"
              ].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      <NavButtons onNext={onNext} onPrev={onPrev} />
    </SlideContainer>
  );
};

// 4. Domains Interactive Slide
const DomainsSlide: React.FC<SlideProps> = ({ onNext, onPrev }) => {
  const [activeDomain, setActiveDomain] = useState<number | null>(null);

  const domains = [
    {
      id: 1,
      title: "病因 (Aetiological)",
      icon: <Dna size={32} />,
      color: "bg-orange-100 text-orange-600 border-orange-200",
      items: ["免疫異常・炎症", "進行性肺線維化 (PPF)", "自己抗体", "喫煙", "環境曝露 (抗原)", "薬剤性"]
    },
    {
      id: 2,
      title: "肺病変 (Pulmonary)",
      icon: <LungIcon size={32} />,
      color: "bg-blue-100 text-blue-600 border-blue-200",
      items: ["肺感染症", "肺気腫 (CPFE)", "肺高血圧症", "肺がん", "低酸素血症", "慢性咳嗽", "呼吸困難"]
    },
    {
      id: 3,
      title: "肺外病変 (Extra-pulmonary)",
      icon: <Heart size={32} />,
      color: "bg-green-100 text-green-600 border-green-200",
      items: ["閉塞性睡眠時無呼吸 (OSA)", "胃食道逆流 (GERD)", "体重減少/肥満", "不安・抑うつ", "虚血性心疾患", "身体機能低下"]
    },
    {
      id: 4,
      title: "行動・生活習慣 (Behavioural)",
      icon: <Users size={32} />,
      color: "bg-purple-100 text-purple-600 border-purple-200",
      items: ["治療アドヒアランス不良", "身体活動不足", "社会的孤立", "ポリファーマシー (多剤併用)", "家族・社会的支援不足"]
    }
  ];

  return (
    <SlideContainer className="bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 absolute top-8">4つのTreatable Traits領域</h2>
      <p className="text-gray-500 mb-8 absolute top-16 text-sm">カードをタップして詳細を確認してください</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl h-[60vh] md:h-auto mt-12">
        {domains.map((domain) => (
          <motion.div
            key={domain.id}
            layout
            onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
            className={`relative cursor-pointer rounded-2xl border-2 p-6 overflow-hidden transition-all duration-300 ${
              activeDomain === domain.id ? 'col-span-1 md:col-span-2 row-span-2 bg-white shadow-xl ring-2 ring-offset-2 ring-blue-100' : `${domain.color} hover:shadow-md`
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full bg-white shadow-sm ${activeDomain === domain.id ? 'text-gray-800' : ''}`}>
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold">{domain.title}</h3>
            </div>
            
            <AnimatePresence>
              {activeDomain === domain.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="border-t pt-4 mt-2">
                    <p className="text-gray-600 text-sm mb-3">具体的な特性の例：</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {domain.items.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-100 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {activeDomain !== domain.id && (
              <div className="opacity-60 text-sm mt-2">
                クリックして詳細を表示...
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <NavButtons onNext={onNext} onPrev={onPrev} />
    </SlideContainer>
  );
};

// 5. Research Pipeline / Conclusion Slide
const ConclusionSlide: React.FC<SlideProps> = ({ onNext, onPrev }) => {
  return (
    <SlideContainer className="bg-gradient-to-t from-blue-50 to-white">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">未来への展望</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
           {/* Step 1 */}
           <div className="flex-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-400">
             <div className="text-blue-500 font-bold mb-2">Stage 1</div>
             <h4 className="font-bold text-gray-800">特性の特定</h4>
             <p className="text-xs text-gray-500 mt-1">臨床的な重要性と測定方法の確立</p>
           </div>
           
           <ArrowRight className="hidden md:block text-gray-300" />
           <ArrowRight className="md:hidden text-gray-300 rotate-90 my-2" />

           {/* Step 2 */}
           <div className="flex-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-400">
             <div className="text-indigo-500 font-bold mb-2">Stage 2</div>
             <h4 className="font-bold text-gray-800">メカニズム解明</h4>
             <p className="text-xs text-gray-500 mt-1">バイオマーカーと介入法の開発</p>
           </div>

           <ArrowRight className="hidden md:block text-gray-300" />
           <ArrowRight className="md:hidden text-gray-300 rotate-90 my-2" />

           {/* Step 3 */}
           <div className="flex-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-400">
             <div className="text-purple-500 font-bold mb-2">Stage 3</div>
             <h4 className="font-bold text-gray-800">臨床試験</h4>
             <p className="text-xs text-gray-500 mt-1">実臨床への導入と効果検証</p>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">まとめ</h3>
          <p className="text-lg leading-relaxed opacity-90">
            Treatable Traitsアプローチは、ILDの診断名だけでなく、<br className="hidden md:block"/>
            <span className="font-bold border-b-2 border-white/50 mx-1">「その人全体」</span>
            を診るためのフレームワークです。<br/>
            多職種チームによる包括的なケアで、患者さんの予後と生活の質を改善します。
          </p>
        </motion.div>
      </div>
      <NavButtons onNext={onNext} onPrev={onPrev} showNext={false} />
    </SlideContainer>
  );
};


// --- Main App Component ---

const ILDTreatableTraits: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<SlideId>('intro');

  const slideOrder: SlideId[] = ['intro', 'problem', 'solution', 'domains', 'conclusion'];

  const goToNext = () => {
    const currentIndex = slideOrder.indexOf(currentSlide);
    if (currentIndex < slideOrder.length - 1) {
      setCurrentSlide(slideOrder[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    const currentIndex = slideOrder.indexOf(currentSlide);
    if (currentIndex > 0) {
      setCurrentSlide(slideOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {currentSlide === 'intro' && (
          <motion.div key="intro" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }}>
            <IntroSlide isActive={true} onNext={goToNext} onPrev={goToPrev} />
          </motion.div>
        )}
        {currentSlide === 'problem' && (
          <motion.div key="problem" className="w-full h-full" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            <ProblemSlide isActive={true} onNext={goToNext} onPrev={goToPrev} />
          </motion.div>
        )}
        {currentSlide === 'solution' && (
          <motion.div key="solution" className="w-full h-full" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            <SolutionSlide isActive={true} onNext={goToNext} onPrev={goToPrev} />
          </motion.div>
        )}
        {currentSlide === 'domains' && (
          <motion.div key="domains" className="w-full h-full" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            <DomainsSlide isActive={true} onNext={goToNext} onPrev={goToPrev} />
          </motion.div>
        )}
        {currentSlide === 'conclusion' && (
          <motion.div key="conclusion" className="w-full h-full" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            <ConclusionSlide isActive={true} onNext={goToNext} onPrev={goToPrev} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${((slideOrder.indexOf(currentSlide) + 1) / slideOrder.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ILDTreatableTraits;