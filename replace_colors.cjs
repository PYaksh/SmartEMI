const fs = require('fs');
const path = require('path');

const replacements = [
  // Light Mode Backgrounds
  { from: /bg-\[\#F0FDF4\]/g, to: 'bg-[#FFFDF8]' },
  { from: /bg-\[\#FAFAFA\]/g, to: 'bg-[#FFFDF8]' },
  { from: /bg-slate-50/g, to: 'bg-[#F5F4EF]' },
  { from: /hover:bg-slate-50/g, to: 'hover:bg-[#F5F4EF]' },
  { from: /hover:bg-slate-100/g, to: 'hover:bg-[#E5E2D9]' },
  { from: /bg-slate-100/g, to: 'bg-[#E5E2D9]' },
  
  // Dark Mode Backgrounds
  { from: /dark:bg-\[\#020617\]/g, to: 'dark:bg-[#000000]' },
  { from: /dark:bg-\[\#06261E\]/g, to: 'dark:bg-[#0A0A0A]' },
  { from: /dark:bg-\[\#0B2F27\]/g, to: 'dark:bg-[#0A0A0A]' },
  { from: /dark:bg-\[\#041A14\]/g, to: 'dark:bg-[#111111]' },
  { from: /dark:hover:bg-\[\#064E3B\]/g, to: 'dark:hover:bg-[#222222]' },
  { from: /dark:hover:bg-\[\#065F46\]/g, to: 'dark:hover:bg-[#222222]' },

  // Light Mode Accents (Emerald -> Black)
  { from: /bg-\[\#10B981\]/g, to: 'bg-[#000000]' },
  { from: /text-\[\#10B981\]/g, to: 'text-[#000000]' },
  { from: /bg-\[\#059669\]/g, to: 'bg-[#000000]' },
  { from: /text-\[\#059669\]/g, to: 'text-[#000000]' },
  { from: /hover:bg-\[\#047857\]/g, to: 'hover:bg-[#333333]' },
  { from: /focus:ring-\[\#059669\]/g, to: 'focus:ring-[#000000]' },
  { from: /focus:border-\[\#059669\]/g, to: 'focus:border-[#000000]' },
  { from: /bg-\[\#10B981\]\/10/g, to: 'bg-black/5' },
  { from: /bg-\[\#10B981\]\/20/g, to: 'bg-black/10' },
  { from: /border-\[\#10B981\]\/20/g, to: 'border-black/10' },
  { from: /border-\[\#10B981\]\/30/g, to: 'border-black/20' },
  { from: /accent-\[\#059669\]/g, to: 'accent-black' },

  // Dark Mode Accents (Emerald -> White)
  { from: /dark:bg-\[\#10B981\]/g, to: 'dark:bg-[#FFFFFF]' },
  { from: /dark:text-\[\#10B981\]/g, to: 'dark:text-[#FFFFFF]' },
  { from: /dark:text-\[\#6EE7B7\]/g, to: 'dark:text-[#FFFFFF]' },
  { from: /dark:bg-\[\#059669\]/g, to: 'dark:bg-[#FFFFFF]' },
  { from: /dark:hover:bg-\[\#059669\]/g, to: 'dark:hover:bg-[#E5E5E5]' },
  { from: /dark:focus:ring-\[\#059669\]/g, to: 'dark:focus:ring-[#FFFFFF]' },
  { from: /dark:focus:border-\[\#059669\]/g, to: 'dark:focus:border-[#FFFFFF]' },
  { from: /dark:bg-\[\#10B981\]\/10/g, to: 'dark:bg-white/10' },
  { from: /dark:border-\[\#10B981\]\/20/g, to: 'dark:border-white/20' },
  { from: /dark:border-\[\#10B981\]\/30/g, to: 'dark:border-white/30' },
  { from: /dark:border-\[\#10B981\]\/50/g, to: 'dark:border-white/50' },
  { from: /dark:accent-\[\#10B981\]/g, to: 'dark:accent-white' },

  // Light Mode Text
  { from: /text-slate-900/g, to: 'text-[#111111]' },
  { from: /text-slate-800/g, to: 'text-[#222222]' },
  { from: /text-slate-700/g, to: 'text-[#333333]' },
  { from: /text-slate-600/g, to: 'text-[#555555]' },
  { from: /text-slate-500/g, to: 'text-[#777777]' },
  { from: /text-slate-400/g, to: 'text-[#999999]' },

  // Dark Mode Text
  { from: /dark:text-\[\#E5E7EB\]/g, to: 'dark:text-[#F3F3F3]' },
  { from: /dark:text-\[\#9CA3AF\]/g, to: 'dark:text-[#A3A3A3]' },
  { from: /dark:text-\[\#6B7280\]/g, to: 'dark:text-[#737373]' },

  // Borders
  { from: /border-slate-200/g, to: 'border-[#E5E2D9]' },
  { from: /border-slate-300/g, to: 'border-[#D4D0C5]' },
  { from: /dark:border-\[\#1F2937\]/g, to: 'dark:border-[#2A2A2A]' },

  // Shadows
  { from: /dark:shadow-\[0_0_20px_rgba\(16,185,129,0\.3\)\]/g, to: 'dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]' },
  { from: /dark:shadow-\[0_0_20px_rgba\(16,185,129,0\.1\)\]/g, to: 'dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]' },
  
  // Specific Landing Page Gradients
  { from: /bg-gradient-to-r from-\[\#10B981\] to-\[\#38BDF8\]/g, to: 'text-[#111111] dark:text-[#F3F3F3]' },
  { from: /text-transparent bg-clip-text/g, to: '' },
  { from: /bg-\[\#38BDF8\]/g, to: 'bg-[#333333] dark:bg-[#CCCCCC]' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const { from, to } of replacements) {
        content = content.replace(from, to);
      }
      
      // Fix button text colors that were inverted because of the emerald -> black/white change
      // Previously: text-white bg-[#059669] dark:bg-[#10B981]
      // Now: text-white bg-[#000000] dark:bg-[#FFFFFF]
      // We need dark mode text to be black on the white button
      content = content.replace(/text-white bg-\[\#000000\] dark:bg-\[\#FFFFFF\]/g, 'text-white dark:text-black bg-[#000000] dark:bg-[#FFFFFF]');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
