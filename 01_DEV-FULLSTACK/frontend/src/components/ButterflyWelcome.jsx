import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ButterflyWelcome = () => {
  const [stage, setStage] = useState(0); 
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const landTimer = setTimeout(() => setStage(1), 3000);
    const textTimer = setTimeout(() => setStage(2), 3500);
    return () => {
      clearTimeout(landTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => navigate('/home'), 900); 
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen h-screen overflow-hidden font-sans bg-[#F8FDFF] py-12 px-6">
      
      {/* 1. Global Background - Tetap Statis */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-5%] right-[-5%] w-[90%] h-[70%] rounded-full bg-[#BAE6FD] blur-[120px] transition-opacity duration-[3000ms] ${stage >= 1 ? 'opacity-40' : 'opacity-25'}`} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[60%] rounded-full bg-[#E0F2FE] blur-[100px] opacity-60" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      {/* 2. Hero Area (Butterfly + Local Background Glow) */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center pointer-events-none">
        <div className={`
          relative transform-gpu transition-all duration-[2000ms]
          ${isExiting ? 'animate-fly-exit' : stage === 0 ? 'animate-fly-cloud' : 'scale-100 translate-y-0'}
        `}>
          
          {/* --- GLOW BACKGROUND TEPAT DI BELAKANG BUTTERFLY --- */}
          <div className={`absolute inset-[-40%] bg-blue-400/20 blur-[80px] rounded-full transition-all duration-1000 
            ${stage >= 1 && !isExiting ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
          />
          
          {/* Layer Glow Tambahan untuk Efek "Pop" */}
          <div className={`absolute inset-0 bg-blue-300/30 blur-[40px] rounded-full transition-all duration-1000 
            ${stage >= 1 && !isExiting ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`} 
          />

          <div className="relative z-10 w-[240px] h-[240px] md:w-[320px] md:h-[320px]">
            <DotLottieReact
              src="butterfly.lottie"
              loop autoplay
              renderConfig={{ devicePixelRatio: window.devicePixelRatio }}
              speed={0.7}
            />
          </div>

          {/* Shadow */}
          <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-blue-900/5 blur-2xl rounded-full transition-opacity duration-500 
            ${stage >= 1 && !isExiting ? 'opacity-100' : 'opacity-0'}`} 
          />
        </div>
      </div>

      {/* 3. Typography & Button Area */}
      <div className={`relative z-20 w-full max-w-lg text-center transition-all duration-700 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
        
        <div className={`transition-all duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-blue-100 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[9px] tracking-[0.4em] text-blue-500 uppercase font-bold whitespace-nowrap text-nowrap">Healthy Lives & Well-being</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extralight text-slate-800 tracking-tighter leading-[1.2] mb-6">
            Selamat datang, <br />
            <span className="font-serif italic text-blue-500 font-medium whitespace-nowrap text-nowrap text-nowrap">sehat dimulai di sini</span>
          </h1>

          <div className="w-10 h-[1px] bg-blue-200 mx-auto mb-8 opacity-50" />

          <button
            onClick={handleStart}
            className="group relative flex items-center gap-3 mx-auto px-10 py-3.5 rounded-full bg-white transition-all duration-300 
                       shadow-[0_10px_30px_-10px_rgba(186,230,253,0.5)] hover:-translate-y-0.5
                       hover:shadow-[0_15px_35px_-10px_rgba(186,230,253,0.7)] active:scale-95 border border-blue-50/50 pointer-events-auto"
          >
            <span className="relative z-10 text-[10px] tracking-[0.3em] uppercase font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
              Masuk Ke Beranda →
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@300;400;700&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; }
        
        @keyframes fly-cloud {
          0% { transform: translate(110vw, 20vh) rotate(-10deg) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translate(-10vw, -10vh) rotate(5deg) scale(0.8); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes fly-exit {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(120vw, -40vh) scale(0.4) rotate(25deg); opacity: 0; }
        }
        .animate-fly-cloud { animation: fly-cloud 3s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        .animate-fly-exit { animation: fly-exit 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        body { margin: 0; overflow: hidden; background: #F8FDFF; }
      `}</style>
    </div>
  );
};

export default ButterflyWelcome;