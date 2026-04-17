/**
 * ★★ 빌드 스크립트 ★★
 * src/index.html → dist/index.html 로 복사하는 간단한 빌드
 * 외부 의존성 없이 Node.js 내장 모듈만 사용
 */
const fs = require('fs');
const path = require('path');

// (1) dist 폴더 생성
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// (2) src 폴더의 모든 파일을 dist로 복사
const srcDir = path.join(__dirname, 'src');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(srcDir, distDir);

console.log('✅ Build complete → dist/');
