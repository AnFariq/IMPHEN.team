import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Utensils, BrainCircuit, Globe, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6">

        {/* Ambient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] bg-blue-200/30 blur-[140px] rounded-full" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-200/20 blur-[140px] rounded-full" />
        </div>

        {/* Butterfly */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full max-w-6xl mx-auto">
            <div className="absolute w-40 h-40 animate-butterfly-combined opacity-70">
              <DotLottieReact src="butterfly.lottie" loop autoplay />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4" /> Built for Indonesian Food AI
            </div>

            <h1 className="text-5xl md:text-7xl font-extralight leading-tight tracking-tight">
              AI That Understands <br />
              <span className="text-blue-600 font-semibold">Indonesian Food</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Kami membangun AI khusus untuk makanan Indonesia — dari nasi padang, gorengan, hingga makanan rumahan — untuk membantu diet yang realistis dan akurat.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:scale-105 transition"
              >
                Try AI Now
              </button>

              <button className="px-8 py-4 bg-white border border-slate-200 rounded-xl text-slate-600 hover:shadow-md transition">
                How It Works
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative space-y-6">

            {/* AI RESULT */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 space-y-4">
              <h3 className="font-semibold">AI Food Analysis</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Nasi Goreng</span>
                  <span className="font-semibold">520 kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-semibold">18g</span>
                </div>
                <div className="flex justify-between">
                  <span>Lemak</span>
                  <span className="font-semibold">22g</span>
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-blue-500" />
              </div>
            </div>

            {/* TEAM PIPELINE */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow">
              <h4 className="text-sm font-semibold mb-3">Our AI System Pipeline</h4>
              <div className="text-xs text-slate-500 space-y-2">
                <p>• 2 Data Scientist → collect & clean Indonesian food dataset</p>
                <p>• 2 AI Engineer → train calorie & nutrition model</p>
                <p>• 2 Fullstack → build & deploy the AI system</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY INDONESIA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-light">
            Why Focus on Indonesia?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Sebagian besar aplikasi diet gagal karena tidak memahami makanan lokal.
            Kami melatih AI dengan dataset makanan Indonesia agar hasil lebih akurat dan relevan.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <FeatureCard icon={<Utensils />} title="Food Detection" desc="Scan makanan Indonesia dengan akurasi tinggi" />
          <FeatureCard icon={<BrainCircuit />} title="AI Nutrition" desc="Hitung kalori & nutrisi otomatis" />
          <FeatureCard icon={<Globe />} title="Real Dataset" desc="Data dikurasi khusus makanan lokal" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-light mb-4">Start Your Diet with Real Data</h2>
        <p className="text-slate-500 mb-8">AI yang benar-benar paham apa yang kamu makan.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

      <footer className="py-10 text-center text-sm text-slate-400">
        © 2026 Healthy AI Indonesia
      </footer>

      <style jsx global>{`
        @keyframes hero-intro {
          from { transform: translate(100vw, 50vh) scale(0.4); opacity: 0; }
          to { transform: translate(80%, 10%) scale(0.8); opacity: 1; }
        }

        @keyframes hero-free-fly {
          0%,100% { transform: translate(80%,10%) scale(0.8); }
          25% { transform: translate(10%,20%) scale(1); }
          50% { transform: translate(20%,70%) scale(0.9); }
          75% { transform: translate(75%,75%) scale(1); }
        }

        .animate-butterfly-combined {
          animation:
            hero-intro 2s ease forwards,
            hero-free-fly 20s linear infinite 2s;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white shadow hover:shadow-xl transition border border-slate-100">
    <div className="mb-4 text-blue-600">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

export default LandingPage;