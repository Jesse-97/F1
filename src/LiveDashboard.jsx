import { motion } from 'framer-motion';

const liveData = [
  { pos: 1, name: 'LEC', s1: '28.1', s2: '32.4', s3: '21.9', delta: 'INTERVAL', color: '#e10600' },
  { pos: 2, name: 'HAM', s1: '28.3', s2: '32.5', s3: '21.8', delta: '+0.142', color: '#e10600' },
  { pos: 3, name: 'NOR', s1: '28.2', s2: '32.7', s3: '22.1', delta: '+0.455', color: '#ff8000' },
];

export const LiveDashboard = () => (
  <div className="bg-[#0b0b0b] p-6 font-mono text-xs uppercase tracking-tighter border-t border-[#e10600]/30">
    <div className="grid grid-cols-6 mb-4 text-gray-500 font-bold border-b border-white/10 pb-2">
      <span>POS</span><span>DRIVER</span><span>S1</span><span>S2</span><span>S3</span><span>GAP</span>
    </div>
    <div className="space-y-2">
      {liveData.map((d) => (
        <motion.div 
          key={d.name}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="grid grid-cols-6 items-center py-1 border-l-2 pl-2"
          style={{ borderColor: d.color }}
        >
          <span className="font-black text-white">{d.pos}</span>
          <span className="font-bold text-white">{d.name}</span>
          <span className="text-purple-400">{d.s1}</span>
          <span className="text-green-400">{d.s2}</span>
          <span className="text-yellow-400">{d.s3}</span>
          <span className="text-white/60">{d.delta}</span>
        </motion.div>
      ))}
    </div>
  </div>
);