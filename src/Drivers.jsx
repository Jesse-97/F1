import { motion, AnimatePresence } from 'framer-motion';
import { drivers2026 } from './data';
import { useState } from 'react';

const DriverCard = ({ driver }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[500px] w-full group cursor-crosshair overflow-hidden rounded-2xl bg-[#1a1a1a]"
    >
      {/* Driver Number Background */}
      <div className="absolute top-4 left-4 z-0">
        <span className="text-9xl font-black italic opacity-10 select-none" style={{ color: driver.color }}>
          {driver.number}
        </span>
      </div>

      {/* High-Quality Cutout */}
      <motion.img 
        src={driver.img}
        alt={driver.name}
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -20 : 0,
          filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)'
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] w-auto z-10 object-contain drop-shadow-2xl transition-all duration-500"
      />

      {/* Stat Overlay (Hover State) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 space-y-4 bg-black/60 backdrop-blur-md p-6 border-r-4"
            style={{ borderColor: driver.color }}
          >
            <div className="text-right">
              <p className="text-gray-400 text-xs font-bold uppercase">Wins</p>
              <p className="text-3xl font-black italic text-white">{driver.wins}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs font-bold uppercase">Poles</p>
              <p className="text-3xl font-black italic text-white">{driver.poles}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs font-bold uppercase">Podiums</p>
              <p className="text-3xl font-black italic text-white">{driver.podiums}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Plate */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-30 bg-gradient-to-t from-black via-black/80 to-transparent">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: driver.color }}>{driver.team}</p>
        <h3 className="text-4xl font-black italic uppercase text-white leading-tight">{driver.name}</h3>
      </div>
    </motion.div>
  );
};

export const DriversGrid = () => (
  <section className="py-24 bg-black">
    <div className="container mx-auto px-6">
      <h2 className="text-5xl font-black italic mb-16 border-l-8 border-[#e10600] pl-6 uppercase">2026 Driver Lineup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {drivers2026.map(driver => <DriverCard key={driver.id} driver={driver} />)}
      </div>
    </div>
  </section>
);