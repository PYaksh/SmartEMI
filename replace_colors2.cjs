const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /bg-slate-200/g, to: 'bg-[#E5E2D9]' },
  { from: /bg-slate-900/g, to: 'bg-[#111111]' },
  { from: /bg-slate-100/g, to: 'bg-[#E5E2D9]' },
  { from: /border-slate-100/g, to: 'border-[#E5E2D9]' },
  { from: /text-slate-400/g, to: 'text-[#999999]' },
  { from: /text-slate-300/g, to: 'text-[#D4D0C5]' },
  { from: /dark:text-\[\#E5E7EB\]/g, to: 'dark:text-[#F3F3F3]' },
  { from: /dark:bg-\[\#1F2937\]/g, to: 'dark:bg-[#2A2A2A]' },
  { from: /dark:placeholder-\[\#6B7280\]/g, to: 'dark:placeholder-[#737373]' },
  { from: /placeholder-slate-400/g, to: 'placeholder-[#999999]' },
  { from: /focus:ring-slate-500/g, to: 'focus:ring-[#777777]' },
  { from: /dark:bg-slate-800/g, to: 'dark:bg-[#222222]' },
  { from: /dark:border-slate-800/g, to: 'dark:border-[#222222]' },
  { from: /dark:text-slate-300/g, to: 'dark:text-[#D4D0C5]' },
  { from: /dark:text-slate-200/g, to: 'dark:text-[#E5E2D9]' },
  { from: /text-slate-200/g, to: 'text-[#E5E2D9]' },
  { from: /text-white bg-\[\#000000\] dark:bg-\[\#FFFFFF\]/g, 'to': 'text-white dark:text-black bg-[#000000] dark:bg-[#FFFFFF]' }
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
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
