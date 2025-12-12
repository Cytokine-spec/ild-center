import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  Stethoscope, 
  Users, 
  Phone, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  Utensils,
  Heart,    // HeartPulseの代わり
  Wind,     // Lungsの代わり
  Shield,   // ShieldCheckの代わり
  Search,   // Microscopeの代わり
  Thermometer, // Pillの代わり
  User      // Accessibilityの代わり
} from 'lucide-react';

// ----------------------------------------------------------------------
// Types & Interfaces
// ----------------------------------------------------------------------

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  bgGradient: string;
  decorationIcon?: React.ReactNode; // 背景装飾用アイコン
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// アコーディオンコンポーネント
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border border-white/40 rounded-xl overflow-hidden bg-white/60 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md z-10 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
      >
        <span className="font-bold text-slate-800 text-lg flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-500 rounded-full mr-2"></div>
          {title}
        </span>
        {isOpen ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 py-4 text-slate-700 leading-relaxed border-t border-white/30 bg-white/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Canvas背景コンポーネント (パーティクルアニメーション)
const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; radius: number; vx: number; vy: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = 50; // パーティクル増量
      const colors = ['rgba(59, 130, 246, 0.3)', 'rgba(147, 197, 253, 0.3)', 'rgba(255, 255, 255, 0.4)', 'rgba(52, 211, 153, 0.2)'];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 25 + 5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 背景グラデーション (より柔らかく明るい色味に)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#e0f2fe'); // sky-100
      gradient.addColorStop(1, '#f0fdf4'); // green-50
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

// ----------------------------------------------------------------------
// Main Application
// ----------------------------------------------------------------------

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const slides: SlideData[] = [
    // Page 1: Home
    {
      id: 1,
      title: "間質性肺炎センター",
      subtitle: "専門性と多職種による患者支援を備えた、日本でも数少ない専門センター",
      bgGradient: "from-blue-600 to-cyan-500",
      decorationIcon: <Activity size={400} className="text-white/10" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 mb-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <Heart className="mr-2 text-rose-500" /> センター設立の想い
            </h3>
            <p className="text-slate-800 leading-relaxed font-medium">
              息切れ、咳――その背後に「間質性肺炎」が潜んでいることがあります。
              早期診断と専門的介入が重要ですが、診断まで時間がかかるのが現状です。
              当センターは、患者さんの不安に応え、早期に専門医を受診できるよう設立されました。
            </p>
          </div>

          <AccordionItem title="特徴1：全国でも希少な専門センター" defaultOpen>
            <p>東京都心に立地し、北海道から沖縄まで全国からご紹介いただいています。入院患者数は年々増加傾向にあります。</p>
          </AccordionItem>
          
          <AccordionItem title="特徴2：迅速かつ網羅的な検査体制">
            <p>クリニカルパスを導入し、初診時から外来・入院での詳細な検査により、迅速に治療方針を検討していきます。</p>
          </AccordionItem>
          
          <AccordionItem title="特徴3：多職種診断カンファレンス (MDD)">
            <p>呼吸器内科医、放射線科医、病理医などが集まり、より正確な診断と適切な治療方針を決定します。</p>
          </AccordionItem>

          <AccordionItem title="特徴4：包括支援チームによる集学的治療">
            <p>医師、看護師、薬剤師、リハビリスタッフ、管理栄養士、SWによるチーム医療で、患者さん毎に適切な医療を提供します。</p>
          </AccordionItem>
        </div>
      )
    },
    // Page 2: Team & Stats
    {
      id: 2,
      title: "多職種連携と実績",
      bgGradient: "from-teal-600 to-emerald-500",
      decorationIcon: <Users size={400} className="text-white/10" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="space-y-4">
            <div className="bg-white/80 p-5 rounded-2xl shadow-md border border-teal-100 z-10 relative">
              <h3 className="font-bold text-teal-800 mb-3 flex items-center"><Users className="mr-2"/> チーム体制</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start"><span className="font-bold w-20 text-teal-600">医師</span><span>病状説明、診断・治療、MDD</span></li>
                <li className="flex items-start"><span className="font-bold w-20 text-teal-600">看護師</span><span>日常生活指導、精神的サポート</span></li>
                <li className="flex items-start"><span className="font-bold w-20 text-teal-600">リハビリ</span><span>呼吸リハビリ、在宅指導</span></li>
                <li className="flex items-start"><span className="font-bold w-20 text-teal-600">薬剤師</span><span>服薬指導、副作用対策</span></li>
                <li className="flex items-start"><span className="font-bold w-20 text-teal-600">栄養士</span><span>栄養指導、体重減少予防</span></li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 z-10 relative">
              <p className="text-orange-800 font-bold text-center">患者さんを中心とした円滑な連携</p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl shadow-md border border-teal-100 flex flex-col justify-center z-10 relative">
            <h3 className="font-bold text-slate-700 mb-4 text-center">間質性肺炎 入院患者数推移</h3>
            <div className="flex items-end justify-between h-48 gap-2 px-2">
              {[
                { y: 2015, v: 23 }, { y: 2017, v: 40 }, 
                { y: 2019, v: 69 }, { y: 2021, v: 141 }, 
                { y: 2023, v: 84 }, { y: 2024, v: 100 }
              ].map((d, i) => (
                <div key={i} className="flex flex-col items-center w-full group">
                  <div className="text-xs font-bold text-teal-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{d.v}</div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.v / 160) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-teal-500 to-emerald-300 rounded-t-md shadow-sm relative hover:from-teal-600 hover:to-emerald-400"
                  >
                  </motion.div>
                  <div className="text-[10px] text-slate-500 mt-1">{d.y}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-right text-slate-400 mt-2">※2025年は10月末まで</p>
          </div>
        </div>
      )
    },
    // Page 3: Diseases
    {
      id: 3,
      title: "主な対象疾患",
      bgGradient: "from-indigo-600 to-purple-500",
      decorationIcon: <Wind size={400} className="text-white/10" />,
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-xl mb-4 border border-indigo-100">
            <p className="text-indigo-900 font-medium">
              間質性肺炎は多様な疾患の総称です。正確な診断のために詳細な検査を行います。
            </p>
          </div>

          <AccordionItem title="特発性間質性肺炎 (IPFなど)" defaultOpen>
            <p>原因不明の間質性肺炎です。IPFの臨床経過は患者さんごとに様々です。診断には臨床経過、CT、肺機能、病理など多くの情報が必要で、多職種協議が重要です。</p>
          </AccordionItem>

          <AccordionItem title="過敏性肺炎">
            <p>カビ（夏型）や鳥抗原などが原因でアレルギー反応を起こす疾患です。ご家庭や職場環境、ペット飼育歴などの問診が非常に重要になります。</p>
          </AccordionItem>

          <AccordionItem title="膠原病関連間質性肺炎">
            <p>膠原病に合併する間質性肺炎は生命予後への影響が大きいため、リウマチ・膠原病内科医と連携し、チーム医療で診断・治療を行います。</p>
          </AccordionItem>
          
          <div className="mt-6 bg-white/70 p-4 rounded-xl shadow-sm z-10 relative">
            <h4 className="font-bold text-slate-700 mb-2 border-b border-slate-200 pb-2">実施可能な検査</h4>
            <div className="flex flex-wrap gap-2">
              {["血液検査", "胸部X線・CT", "肺機能検査", "気管支鏡 (クライオ)", "外科的肺生検"].map((test, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm">
                  {test}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Page 4: Diagnosis Details
    {
      id: 4,
      title: "高度な診断プロセス",
      bgGradient: "from-blue-700 to-indigo-500",
      decorationIcon: <Search size={400} className="text-white/10" />,
      content: (
        <div className="flex flex-col h-full gap-4">
          <div className="bg-white/80 p-6 rounded-2xl shadow-lg border-l-8 border-blue-500 z-10">
            <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
              <Stethoscope className="mr-2"/> 気管支鏡検査（クライオバイオプシー）
            </h3>
            <p className="text-slate-700">
              プローブ先端を急激に冷却し、組織を凍結させて採取する新しい検査法です。
              従来の検査よりも大きく質の高い検体が採取でき、診断精度が向上します。
            </p>
          </div>

          <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl flex-grow flex flex-col justify-center relative overflow-hidden z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            <h3 className="text-xl font-bold text-blue-200 mb-4 z-10">
              多職種カンファレンス (MDD)
            </h3>
            <p className="mb-4 text-slate-300 z-10">
              呼吸器内科、放射線科、病理医、膠原病内科医が集結。
              「第一選択の診断」「代替診断」「生検の必要性」などを徹底的に議論します。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center z-10">
              {['画像所見', '臨床経過', '病理結果', '治療方針'].map((item, i) => (
                <div key={i} className="bg-slate-700 p-2 rounded-lg text-sm border border-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Page 5: Treatments
    {
      id: 5,
      title: "集学的治療",
      bgGradient: "from-emerald-600 to-green-500",
      decorationIcon: <Thermometer size={400} className="text-white/10" />,
      content: (
        <div className="space-y-4">
          <p className="bg-white/50 p-3 rounded-lg text-slate-700 font-medium border border-white/50">
            専門医によるカンファレンスに基づき、患者さん一人ひとりに最適な治療を提供します。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AccordionItem title="薬物療法" defaultOpen>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><span className="font-bold">抗線維化薬:</span> 進行を遅らせるための薬剤</li>
                <li><span className="font-bold">抗炎症薬:</span> ステロイドや免疫抑制剤（膠原病・過敏性肺炎など）</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="非薬物療法">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><span className="font-bold">抗原回避:</span> アレルゲンや刺激物の特定と回避</li>
                <li><span className="font-bold">酸素療法:</span> 低酸素血症に対する導入・管理</li>
              </ul>
            </AccordionItem>
          </div>

          <div className="bg-orange-100 border border-orange-200 p-4 rounded-xl mt-2 z-10 relative">
            <h4 className="font-bold text-orange-800 mb-2 flex items-center"><Shield className="w-5 h-5 mr-1"/> 緩和ケア・社会的サポート</h4>
            <p className="text-sm text-orange-900">
              発症早期から多職種による支援が必要です。症状緩和だけでなく、生活の質（QOL）の維持・向上を目指します。
              他院で治療困難と言われた場合でもご相談ください。
            </p>
          </div>
          
          <div className="text-xs text-slate-500 text-center mt-2">
            ※肺移植が必要な場合は、実施施設へご紹介いたします。
          </div>
        </div>
      )
    },
    // Page 6: Rehabilitation 1
    {
      id: 6,
      title: "呼吸リハビリテーション",
      bgGradient: "from-orange-500 to-rose-400",
      decorationIcon: <User size={400} className="text-white/10" />,
      content: (
        <div className="space-y-5">
          <div className="bg-white/80 p-5 rounded-2xl shadow-md z-10 relative">
            <h3 className="text-xl font-bold text-orange-600 mb-3">当センターの特徴</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 font-medium">
              <li>当院オリジナルのリハビリプログラム</li>
              <li>身体機能を個別評価し、最適メニューを作成</li>
              <li>専門資格（呼吸理学療法専門理学療法士など）を持つスタッフが対応</li>
            </ol>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-white/50 z-10 relative">
            <h3 className="font-bold text-slate-700 mb-2">対象とプログラム</h3>
            <p className="text-sm mb-4">主に軽症～中等症の方が対象ですが、重症の方もプログラム調整可能です。</p>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              <div className="min-w-[140px] bg-blue-100 p-3 rounded-xl text-center">
                <div className="font-bold text-blue-800">入院</div>
                <div className="text-sm">週4～5日</div>
                <div className="text-xs text-slate-500 mt-1">集中的介入</div>
              </div>
              <div className="min-w-[140px] bg-green-100 p-3 rounded-xl text-center">
                <div className="font-bold text-green-800">外来</div>
                <div className="text-sm">週1回</div>
                <div className="text-xs text-slate-500 mt-1">希望者のみ</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Page 7: Rehabilitation 2 (Content)
    {
      id: 7,
      title: "リハビリの内容",
      bgGradient: "from-red-500 to-pink-500",
      decorationIcon: <Activity size={400} className="text-white/10" />,
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-6 z-10 relative">
            <span className="bg-white px-4 py-2 rounded-full font-bold text-pink-600 shadow-sm">1回 40分</span>
            <p className="mt-4 text-white font-medium drop-shadow-md">
              定期的な身体機能評価を行い、状態に合わせたプログラムを提供します。
            </p>
          </div>

          <div className="grid gap-4 z-10 relative">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/90 p-4 rounded-xl shadow-lg flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-2xl">🏃</div>
              <div>
                <h4 className="font-bold text-slate-800">有酸素運動</h4>
                <p className="text-sm text-slate-600">全身持久力の向上、息切れ感の軽減</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/90 p-4 rounded-xl shadow-lg flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-2xl">😮‍💨</div>
              <div>
                <h4 className="font-bold text-slate-800">呼吸筋トレーニング</h4>
                <p className="text-sm text-slate-600">呼吸を助ける筋肉を鍛え、換気効率を改善</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/90 p-4 rounded-xl shadow-lg flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 text-2xl">💪</div>
              <div>
                <h4 className="font-bold text-slate-800">レジスタンストレーニング</h4>
                <p className="text-sm text-slate-600">筋力低下を防ぎ、活動的な生活を支援</p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    // Page 8: Nutrition 1
    {
      id: 8,
      title: "栄養療法",
      bgGradient: "from-yellow-500 to-orange-400",
      decorationIcon: <Utensils size={400} className="text-white/10" />,
      content: (
        <div className="space-y-4">
          <div className="bg-white/80 p-5 rounded-2xl shadow-sm z-10 relative">
            <p className="font-medium text-slate-700 mb-2">
              体力低下・体重減少予防のための重要な治療です。
              病態栄養専門管理栄養士などが個別に対応します。
            </p>
          </div>

          <AccordionItem title="栄養指導の流れ" defaultOpen>
            <div className="space-y-3 relative pl-4 border-l-2 border-yellow-300">
              <div className="text-sm"><span className="font-bold block text-slate-700">① 問診</span>嗜好、食習慣の確認</div>
              <div className="text-sm"><span className="font-bold block text-slate-700">② 体組成測定</span>筋肉量などをチェックし目標設定</div>
              <div className="text-sm"><span className="font-bold block text-slate-700">③ 食事計画</span>無理のない範囲での調整提案</div>
              <div className="text-sm"><span className="font-bold block text-slate-700">④ 定期フォロー</span>継続的な支援（原則月1回）</div>
            </div>
          </AccordionItem>

          <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 z-10 relative">
            <h4 className="font-bold text-yellow-800 flex items-center mb-1">
              <Utensils className="w-4 h-4 mr-2"/> 栄養療法のポイント
            </h4>
            <p className="text-sm text-yellow-900">
              普段の食事を整えながら、MCTオイルや栄養補助食品（1日200kcal程度）を取り入れることが基本です。
            </p>
          </div>
        </div>
      )
    },
    // Page 9: Nutrition 2 (Diet details)
    {
      id: 9,
      title: "当院オリジナル呼吸ケア食",
      bgGradient: "from-lime-500 to-green-400",
      decorationIcon: <Utensils size={400} className="text-white/10" />,
      content: (
        <div className="flex flex-col h-full gap-4">
          <div className="bg-white/90 p-5 rounded-2xl shadow-lg z-10 relative">
            <h3 className="font-bold text-green-800 text-lg mb-2">呼吸ケア食とは？</h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-4">
              基準となる常食(1600kcal)に、エネルギーとタンパク質を強化した食事です。
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                <div className="font-bold text-green-700 mb-1">MCTオイル</div>
                <div className="text-xs text-slate-600">小さじ1杯 (約6g)</div>
                <div className="text-[10px] text-slate-400 mt-1">ご飯に混ぜてエネルギーUP</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                <div className="font-bold text-green-700 mb-1">補助ゼリー</div>
                <div className="text-xs text-slate-600">1日1袋 (100kcal)</div>
                <div className="text-[10px] text-slate-400 mt-1">リハビリ後の筋肉維持に</div>
              </div>
            </div>
          </div>

          <div className="bg-lime-100 p-4 rounded-xl border border-lime-200 z-10 relative">
            <h4 className="font-bold text-lime-800 mb-2">主な栄養補助食品の例</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-700">
              <span className="bg-white px-2 py-1 rounded shadow-sm">MCTオイル</span>
              <span className="bg-white px-2 py-1 rounded shadow-sm">リハたいむゼリー</span>
              <span className="bg-white px-2 py-1 rounded shadow-sm">CP10</span>
              <span className="bg-white px-2 py-1 rounded shadow-sm">アイソカル100</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-auto z-10">
            ※制限食が必要な方は、医師・管理栄養士が個別に調整します。
          </p>
        </div>
      )
    },
    // Page 10: Access & Reservation
    {
      id: 10,
      title: "ご予約・アクセス",
      bgGradient: "from-sky-600 to-blue-700",
      decorationIcon: <Calendar size={400} className="text-white/10" />,
      content: (
        <div className="h-full flex flex-col gap-4">
          <div className="bg-white/90 p-5 rounded-2xl shadow-md flex-grow z-10 relative">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center border-b pb-2">
              <Calendar className="mr-2"/> 初診外来（担当：猪俣稔）
            </h3>
            <p className="text-slate-700 font-bold mb-1">毎週 月曜日 午後（完全予約制）</p>
            <div className="flex gap-2 text-sm text-slate-600 mb-4">
              <span className="bg-blue-100 px-2 py-1 rounded">①13:30-</span>
              <span className="bg-blue-100 px-2 py-1 rounded">②14:30-</span>
              <span className="bg-blue-100 px-2 py-1 rounded">③15:30-</span>
            </div>
          </div>

          <AccordionItem title="予約方法" defaultOpen>
            <div className="space-y-3">
              <div>
                <div className="font-bold text-blue-700 text-sm">当院に通院中の方</div>
                <p className="text-xs text-slate-600">主治医へご相談ください。</p>
              </div>
              <hr className="border-dashed border-slate-300"/>
              <div>
                <div className="font-bold text-blue-700 text-sm">初診・他院からのご紹介</div>
                <p className="text-xs text-slate-600">
                  紹介元医療機関より「日赤医療センター医療連携課」へご連絡ください。<br/>
                  ※要紹介状・胸部CTデータ
                </p>
              </div>
            </div>
          </AccordionItem>

          <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-lg mt-auto text-center z-10 relative">
            <div className="text-sm opacity-80 mb-1">お問い合わせ（医療連携課）</div>
            <div className="flex justify-center items-center gap-2 text-2xl font-bold font-mono">
              <Phone size={24} /> 03-3400-0471
            </div>
            <div className="text-xs opacity-60 mt-1">平日 8:30 - 19:00</div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-slate-800 bg-slate-50">
      {/* CanvasBackgroundコンポーネント */}
      <CanvasBackground />
      
      {/* メインスライドコンテナ - 高さ調整: 90vh -> 95vh */}
      <div className="absolute inset-0 flex items-center justify-center p-2 md:p-6">
        <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl h-[95vh] perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 50, rotateX: -5 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, rotateX: 5 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
              className={`w-full h-full rounded-[40px] shadow-2xl overflow-hidden bg-gradient-to-br ${slides[currentPage].bgGradient} p-1`}
            >
              {/* カードの内側 */}
              <div className="w-full h-full bg-white/20 backdrop-blur-xl rounded-[36px] overflow-hidden flex flex-col relative z-0">
                
                {/* 背景デコレーションアイコン (追加) */}
                {slides[currentPage].decorationIcon && (
                   <div className="absolute -bottom-20 -right-20 opacity-30 pointer-events-none rotate-12 transition-all duration-1000 ease-in-out">
                     {slides[currentPage].decorationIcon}
                   </div>
                )}

                {/* ヘッダーエリア */}
                <div className="pt-8 px-8 pb-4 shrink-0 z-10 relative">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md leading-tight">
                      {slides[currentPage].title}
                    </h2>
                    {slides[currentPage].subtitle && (
                      <p className="text-white/90 text-sm md:text-base mt-2 font-medium drop-shadow-sm">
                        {slides[currentPage].subtitle}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* コンテンツエリア (スクロール可能) - pb-48 に増やして下部余白確保 */}
                <div className="flex-grow overflow-y-auto px-6 pb-48 md:px-8 scrollbar-hide z-10 relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-full"
                  >
                    {slides[currentPage].content}
                  </motion.div>
                </div>

                {/* ページネーション & ナビゲーション (下部固定) */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/40 via-black/20 to-transparent flex justify-between items-center z-20">
                  <button 
                    onClick={prevSlide}
                    className="p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md text-white transition-all active:scale-95 shadow-lg border border-white/30"
                  >
                    <ChevronLeft size={28} />
                  </button>

                  <div className="flex gap-2">
                    {slides.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                          index === currentPage ? 'w-8 bg-white' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={nextSlide}
                    className="p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md text-white transition-all active:scale-95 shadow-lg border border-white/30"
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                {/* ページ番号透かし */}
                <div className="absolute top-4 right-6 text-white/20 text-6xl font-black -z-0 pointer-events-none">
                  {String(slides[currentPage].id).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
