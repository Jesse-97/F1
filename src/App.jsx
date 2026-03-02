import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronRight, Calendar, Trophy, Zap } from 'lucide-react';
import { teams, races } from './data';
import { Track3D } from './Track3D';
import { LiveDashboard } from './LiveDashboard';
import { DriversGrid } from './Drivers';

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen">
      {/* Speedometer Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-[#e10600] origin-left z-50" style={{ scaleX }} />

      {/* --- HERO SECTION --- */}
      
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
            className="text-[25vw] font-black italic whitespace-nowrap absolute top-1/2 -translate-y-1/2 -left-20"
          >
            SPEED SPEED SPEED
          </motion.div>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl font-black italic uppercase leading-none">
              The New <br/> <span className="text-[#e10600]">Era</span> 2026
            </h1>
            <p className="text-gray-400 mt-6 max-w-md text-lg uppercase tracking-widest font-bold">
              Hybrid Power. Sustainable Fuel. Pure Adrenaline.
            </p>
            <button className="mt-8 bg-[#e10600] px-10 py-4 f1-skew font-black hover:bg-white hover:text-black transition-colors duration-300">
              DISCOVER TEAMS
            </button>
          </motion.div>

          {/* Large Car Overlay */}
          <motion.div 
            initial={{ x: 300, opacity: 0, rotate: 5 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: 'spring' }}
            className="relative"
          >
            <img 
              src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg" 
              className="absolute -top-20 -right-10 w-64 opacity-10" alt=""
            />
            {/* Replace src with a cutout F1 car PNG */}
            <div className="w-full h-[900px] bg-gradient-to-tr from-[#e10600]/20 to-transparent rounded-full blur-3xl absolute -z-10" />
            <img 
              src="https://pngimg.com/d/formula_1_PNG39.png" 
              alt="F1 Car" 
              className="w-full h-auto drop-shadow-2xl translate-x-12"
            />
          </motion.div>
        </div>
      </header>
      <section className="py-20 container mx-auto px-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-black italic mb-4">LIVE CIRCUIT: MONACO</h3>
          <Track3D />
        </div>
        <div className="bg-[#141414] rounded-xl overflow-hidden self-start border border-white/5">
          <div className="bg-[#e10600] p-3 text-center font-black italic">LIVE TELEMETRY</div>
          <LiveDashboard />
        </div>
      </section>
      {/* --- TEAMS SECTION --- */}
      <section className="py-24 bg-[#141414]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-black italic">CONSTRUCTORS</h2>
            <p className="text-[#e10600] font-bold tracking-tighter">SEASON LINEUP // 11 TEAMS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, idx) => (
              <motion.div 
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[#1f1f1f] rounded-lg overflow-hidden border-t-4 group transition-all"
                style={{ borderColor: team.color }}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-black italic group-hover:text-[#e10600] transition-colors">{team.name}</h3>
                  <div className="mt-4 space-y-1">
                    {team.drivers.map(d => (
                      <p key={d} className="text-gray-400 flex items-center gap-2">
                        <Zap size={14} className="text-[#e10600]"/> {d}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="h-48 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url(${team.img})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <DriversGrid />
      {/* --- SCHEDULE SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black italic mb-16 border-l-8 border-[#e10600] pl-6">RACE CALENDAR</h2>
          <div className="space-y-4">
            {races.map((race) => (
              <motion.div 
                key={race.id}
                whileHover={{ x: 20 }}
                className="flex items-center justify-between p-8 bg-[#1f1f1f]/50 border-b border-white/10 group cursor-pointer"
              >
                <div className="flex items-center gap-12">
                  <span className="text-4xl font-black text-white/20 italic group-hover:text-[#e10600]">0{race.id}</span>
                  <div>
                    <h4 className="text-2xl font-bold uppercase">{race.name}</h4>
                    <p className="text-gray-500 font-mono italic">{race.track}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-black text-xl">{race.date.split(' ')[1]}</p>
                    <p className="text-xs uppercase text-gray-400 font-bold">{race.date.split(' ')[0]}</p>
                  </div>
                  <ChevronRight className="text-[#e10600]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p className="font-bold italic"></p>
        </div>
      </footer>
    </div>
  );
};

export default App;