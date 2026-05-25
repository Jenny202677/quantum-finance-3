import { useState } from 'react';
import {
  ChevronDown, Menu, X, ArrowRight, Search, Globe,
  Atom, TrendingUp, Shield, Target, GitBranch, Lock,
  Building2, BarChart3, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const C = {
  bg: '#ffffff',
  surface: '#f7f5f1',
  ink: '#1a1814',
  inkSoft: '#3d3833',
  inkDim: '#6b645c',
  inkMute: '#9c948a',
  border: '#e6e1d8',
  borderLight: '#f0ebe2',
  brand: '#3d2817',
  brandSoft: '#6b4423',
  accent: '#826644',
  gold: '#a87f3d',
};

function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-end gap-6 px-6 py-2 text-[11px] text-stone-600 border-b" style={{ borderColor: C.borderLight, background: C.surface }}>
      <a href="#" className="hover:text-stone-900 transition">Careers</a>
      <a href="#" className="hover:text-stone-900 transition">News</a>
      <a href="#" className="hover:text-stone-900 transition">Contact Us</a>
      <a href="#" className="hover:text-stone-900 transition">Login</a>
      <button className="flex items-center gap-1.5 hover:text-stone-900 transition">
        <Globe size={11} />
        Global
        <ChevronDown size={10} />
      </button>
    </div>
  );
}

function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = ['Sol
