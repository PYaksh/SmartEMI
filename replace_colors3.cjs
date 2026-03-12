const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /#E5E7EB/g, to: '#F3F3F3' },
  { from: /rgba\(11, 47, 39, 0\.95\)/g, to: 'rgba(10, 10, 10, 0.95)' },
  { from: /rgba\(16, 185, 129, 0\.05\)/g, to: 'rgba(255, 255, 255, 0.05)' },
  { from: /from-\[\#10B981\]\/20 to-\[\#38BDF8\]\/20/g, to: 'from-black/5 to-transparent dark:from-white/5' },
  { from: /from-\[\#10B981\]\/20 to-transparent/g, to: 'from-black/5 to-transparent dark:from-white/5' },
  { from: /bg-gradient-to-r from-\[\#10B981\] to-\[\#34D399\]/g, to: 'bg-black dark:bg-white' },
  { from: /bg-gradient-to-t from-\[\#10B981\]\/80 to-\[\#34D399\]/g, to: 'bg-black/80 dark:bg-white/80' },
  { from: /const COLORS = \['#059669', '#10B981', '#84CC16', '#F59E0B', '#EF4444', '#0EA5E9'\];/g, to: "const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#EEEEEE'];" },
  { from: /text-green-500/g, to: 'text-[#111111] dark:text-[#F3F3F3]' },
  { from: /bg-green-50/g, to: 'bg-[#F5F4EF]' },
  { from: /border-green-200/g, to: 'border-[#E5E2D9]' },
  { from: /dark:border-\[\#22C55E\]\/30/g, to: 'dark:border-[#2A2A2A]' },
  { from: /dark:border-\[\#22C55E\]\/50/g, to: 'dark:border-[#2A2A2A]' },
  { from: /dark:shadow-\[0_0_15px_rgba\(34,197,94,0\.15\)\]/g, to: 'dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]' },
  { from: /text-amber-500/g, to: 'text-[#111111] dark:text-[#F3F3F3]' },
  { from: /bg-amber-50/g, to: 'bg-[#F5F4EF]' },
  { from: /border-amber-200/g, to: 'border-[#E5E2D9]' },
  { from: /dark:border-\[\#FBBF24\]\/30/g, to: 'dark:border-[#2A2A2A]' },
  { from: /dark:border-\[\#FBBF24\]\/50/g, to: 'dark:border-[#2A2A2A]' },
  { from: /dark:shadow-\[0_0_15px_rgba\(251,191,36,0\.15\)\]/g, to: 'dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]' },
  { from: /text-red-500/g, to: 'text-[#111111] dark:text-[#F3F3F3]' },
  { from: /bg-red-50/g, to: 'bg-[#F5F4EF]' },
  { from: /border-red-200/g, to: 'border-[#E5E2D9]' },
  { from: /dark:border-\[\#F87171\]\/30/g, to: 'dark:border-[#2A2A2A]' },
  { from: /dark:border-\[\#F87171\]\/50/g, to: 'dark:border-[#2A2A2A]' },
  { from: /dark:shadow-\[0_0_15px_rgba\(248,113,113,0\.15\)\]/g, to: 'dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]' },
  { from: /text-red-600/g, to: 'text-[#111111] dark:text-[#F3F3F3]' },
  { from: /dark:text-\[\#F87171\]/g, to: 'dark:text-[#F3F3F3]' },
  { from: /bg-red-100/g, to: 'bg-[#F5F4EF]' },
  { from: /border-red-300/g, to: 'border-[#E5E2D9]' },
  { from: /dark:shadow-\[0_0_20px_rgba\(248,113,113,0\.25\)\]/g, to: 'dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]' },
  { from: /bg-green-100/g, to: 'bg-[#F5F4EF]' },
  { from: /text-green-600/g, to: 'text-[#111111] dark:text-[#F3F3F3]' },
  { from: /bg-blue-100/g, to: 'bg-[#F5F4EF]' },
  { from: /bg-amber-100/g, to: 'bg-[#F5F4EF]' }
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
