import React from 'react';
import { Activity, Moon, Sun, ChevronRight, Sparkles, TrendingDown, ShieldCheck, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, isDarkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 relative font-sans">
      
      {/* Background Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Header / Nav */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-accent" />
          <span className="font-semibold text-lg tracking-tight text-text-main">SmartEMI</span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-full bg-bg-card/50 backdrop-blur-md text-text-sec border border-border-color/50 hover:bg-bg-card transition-all"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="max-w-5xl w-full text-center space-y-10 z-10 mt-16 relative">
        
        {/* Floating Visual Elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 blur-[100px] rounded-full animate-pulse delay-700"></div>

        {/* Animated Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 left-10 p-4 bg-bg-card/40 backdrop-blur-md border border-border-color/30 rounded-2xl shadow-xl hidden lg:block"
        >
          <DollarSign className="w-8 h-8 text-accent" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 -right-10 p-4 bg-bg-card/40 backdrop-blur-md border border-border-color/30 rounded-2xl shadow-xl hidden lg:block"
        >
          <PieChart className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div 
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-10 left-1/4 p-4 bg-bg-card/40 backdrop-blur-md border border-border-color/30 rounded-2xl shadow-xl hidden lg:block"
        >
          <BarChart3 className="w-8 h-8 text-highlight" />
        </motion.div>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card/60 border border-border-color/50 backdrop-blur-md mx-auto shadow-sm">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-text-main">The first AI financial stress predictor</span>
        </div>
        
        {/* Hero Text */}
        <div className="space-y-6 max-w-4xl mx-auto relative">
          <h1 className="text-6xl md:text-8xl font-bold text-text-main tracking-tighter leading-[1.05]">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">SmartEMI</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-sec max-w-3xl mx-auto leading-relaxed font-light">
            The average person spends nearly half their life working just to pay off EMIs. We help you break the cycle of financial anxiety with AI-driven stress prediction.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:bg-primary-hover"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-highlight/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span>Take Control Now</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Benefits & Pressure Section */}
        <div className="mt-24 relative mx-auto max-w-6xl">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent blur-3xl -z-10 transform -translate-y-4 opacity-50"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* The Pressure Card */}
            <div className="bg-bg-card/40 backdrop-blur-xl border border-border-color/30 rounded-3xl p-8 shadow-lg hover:border-chart-expenses/30 transition-colors group">
              <div className="w-12 h-12 bg-chart-expenses/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-chart-expenses" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">The EMI Pressure</h3>
              <p className="text-text-sec leading-relaxed">
                Living paycheck to paycheck? The "EMI Trap" is real. Unexpected expenses combined with rigid loan schedules create a cycle of constant financial stress.
              </p>
            </div>

            {/* The Prediction Card */}
            <div className="bg-bg-card/40 backdrop-blur-xl border border-border-color/30 rounded-3xl p-8 shadow-lg hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">Stress Prediction</h3>
              <p className="text-text-sec leading-relaxed">
                SmartEMI doesn't just track; it predicts. Our AI analyzes your cash flow volatility to warn you about potential stress months before it happens.
              </p>
            </div>

            {/* The Solution Card */}
            <div className="bg-bg-card/40 backdrop-blur-xl border border-border-color/30 rounded-3xl p-8 shadow-lg hover:border-accent/30 transition-colors group">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">Financial Freedom</h3>
              <p className="text-text-sec leading-relaxed">
                Simulate prepayments, optimize your loan portfolio, and see exactly how much interest you can save. Turn your debt into a manageable roadmap.
              </p>
            </div>
          </div>

          {/* Trust Quote */}
          <div className="mt-16 p-8 bg-bg-section/30 rounded-3xl border border-border-color/20 backdrop-blur-sm">
            <p className="text-lg italic text-text-sec text-center">
              "Financial peace isn't the absence of debt, but the presence of a plan. SmartEMI gives you that plan."
            </p>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mt-32 space-y-16 pb-20">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight">How it Works</h2>
            <p className="text-text-sec max-w-xl mx-auto">Four simple steps to reclaim your financial future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-color to-transparent -translate-y-1/2 hidden md:block -z-10"></div>

            {[
              { step: "01", title: "Profile", desc: "Input your income, expenses, and savings habits.", icon: "👤" },
              { step: "02", title: "Loans", desc: "Add your current loans and EMI details securely.", icon: "📝" },
              { step: "03", title: "Analyze", desc: "Our AI predicts stress points in your cash flow.", icon: "🧠" },
              { step: "04", title: "Optimize", desc: "Simulate prepayments and see interest savings.", icon: "🚀" }
            ].map((item, idx) => (
              <div key={idx} className="relative group flex">
                <div className="w-full bg-bg-card border border-border-color/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Step {item.step}</div>
                  <h4 className="text-xl font-bold text-text-main mb-2">{item.title}</h4>
                  <p className="text-sm text-text-sec leading-relaxed flex-grow">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
            >
              <span>Get started with Step 01</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
