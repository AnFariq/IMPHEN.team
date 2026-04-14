import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Sparkles, Utensils, BrainCircuit, Globe } from 'lucide-react';

const LandingPage = () => {

  useEffect(() => {
    /** * PROFESIONAL SCROLL RESET:
     * Memaksa browser kembali ke koordinat (0,0) saat komponen dimount.
     * Menggunakan 'instant' agar tidak terjadi visual scrolling yang mengganggu transisi.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []); // Array kosong memastikan ini hanya jalan sekali saat refresh/masuk halaman

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans overflow-x-hidden selection:bg-blue-100">
      
      {/* 1. Hero Section */}
      <header className="relative pt-32 pb-24 px-6 min-h-[95vh] flex items-center overflow-hidden">
        
        {/* === THE INFINITE FLYING BUTTERFLY === */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full max-w-6xl mx-auto">
            <div className="absolute w-32 h-32 md:w-48 md:h-48 animate-butterfly-combined">
              <div className="absolute inset-0 bg-blue-400/10 blur-[60px] rounded-full animate-pulse" />
              
              <DotLottieReact
                src="butterfly.lottie"
                loop autoplay
                renderConfig={{ devicePixelRatio: window.devicePixelRatio }}
                speed={0.8}
              />
            </div>
          </div>
        </div>

        {/* Decorative Ambient */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/40 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-50/20 blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto text-center relative z-20">
          
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter leading-[1.05] mb-8 animate-fade-up [animation-delay:200ms] text-slate-900">
            Healthy Lives & <br />
            <span className="font-serif italic text-blue-600">Well-being</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed mb-12 animate-fade-up [animation-delay:400ms]">
            Pendamping kesehatan cerdas yang memahami lidah Indonesia. Perpaduan 
            <span className="text-blue-600 font-medium italic"> Vision-AI </span> 
            dan database nutrisi kuliner lokal terlengkap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up [animation-delay:600ms]">
            <button className="px-12 py-4.5 rounded-full bg-blue-600 text-white font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 hover:-translate-y-1 active:scale-95">
              Mulai Konsultasi AI
            </button>
            <button className="px-12 py-4.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95">
              Pelajari Cara Kerja
            </button>
          </div>
        </div>
      </header>

      {/* 2. Features Grid */}
      <section className="py-24 bg-white px-6 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Utensils className="w-6 h-6" />}
              title="Input Makanan Lokal"
              desc="Analisis otomatis Nasi Padang hingga Sate dengan pengenalan visual cerdas."
              color="bg-blue-50 text-blue-600"
            />
            <FeatureCard 
              icon={<BrainCircuit className="w-6 h-6" />}
              title="Analisis AI Presisi"
              desc="Model AI yang di-fine-tune untuk mendeteksi komposisi bumbu tradisional Nusantara."
              color="bg-purple-50 text-purple-600"
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6" />}
              title="Data Referensi Kemenkes"
              desc="Kalibrasi nutrisi akurat berbasis TKPI (Tabel Komposisi Pangan Indonesia)."
              color="bg-green-50 text-green-600"
            />
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center bg-[#FDFCFB]">
        <p className="text-[10px] tracking-[0.5em] text-slate-400 uppercase font-medium italic">
          &copy; 2026 Healthy Lives & Well-being
        </p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@200;300;400;700&display=swap');
        
        .font-serif { font-family: 'Instrument Serif', serif; }

        @keyframes hero-intro {
          from { 
            transform: translate(100vw, 50vh) rotate(-20deg) scale(0.4); 
            opacity: 0; 
          }
          to { 
            transform: translate(85%, 10%) rotate(0deg) scale(0.8); 
            opacity: 1; 
          }
        }

        @keyframes hero-free-fly {
          0%, 100% { transform: translate(85%, 10%) rotate(0deg) scale(0.8); }
          25% { transform: translate(10%, 20%) rotate(-10deg) scale(1); }
          50% { transform: translate(15%, 70%) rotate(5deg) scale(0.9); }
          75% { transform: translate(80%, 75%) rotate(15deg) scale(1); }
        }

        .animate-butterfly-combined {
          animation: 
            hero-intro 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
            hero-free-fly 20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite 2s;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        
        body { 
          margin: 0;
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="group space-y-6 p-8 rounded-[32px] hover:bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 border border-transparent hover:border-blue-50">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-medium tracking-tight text-slate-800 italic">{title}</h3>
    <p className="text-slate-500 font-light leading-relaxed text-sm">{desc}</p>
  </div>
);

export default LandingPage;