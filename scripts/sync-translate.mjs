#!/usr/bin/env node

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rawKeys = process.env.GEMINI_API_KEY || '';
const GEMINI_API_KEYS = rawKeys
  .split(',')
  .map((k) => k.trim())
  .filter((k) => k.length > 0);
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-flash-latest';

let currentKeyIndex = 0;

const SYSTEM_PROMPT = `당신은 최고 수준의 소프트웨어 엔지니어링 및 AI 에이전트 문서 전문 번역가입니다.
주어진 마크다운(Markdown) 문서를 자연스럽고 명확한 한국어로 번역하세요.

[번역 원칙]
1. YAML Frontmatter 규칙:
   - \`name:\` 필드의 값(스킬 식별자 이름)은 절대 번역하지 말고 원문 영문 그대로 유지하세요.
   - \`description:\` 필드의 값은 한국어로 자연스럽게 번역하세요.
   - 기타 메타데이터 키는 그대로 유지하세요.
2. 코드 및 기술 용어 규칙:
   - 코드 블록(\`\`\` ... \`\`\`), 인라인 코드(\`code\`), 파일 경로, URL 링크, 명령어(\`git\`, \`npx\`, \`claude\` 등)는 변경하지 마세요.
   - 업계 표준 기술 용어(예: Diff, Hunk, Refactor, Tracer-bullet, Red-Green-Refactor, ADR, Ubiquitous Language 등)는 영문 그대로 쓰거나 한국어 음차/병기(예: 트레이서 불릿)로 명확히 표현하세요.
3. 번역 어조:
   - 개발자가 읽기 편한 간결하고 정중한 개발 문서체(~합니다, ~하세요, 명사형 종결 등)를 사용하세요.
   - em-dash(—)는 사용하지 마시고 쉼표, 콜론, 마침표, 괄호 등을 사용하세요.
4. 오직 번역된 마크다운 전문만 출력하세요. 앞뒤에 불필요한 인사말이나 코드블록 래핑(\`\`\`markdown)을 추가하지 마세요.`;

async function callGemini(prompt) {
  if (GEMINI_API_KEYS.length === 0) {
    throw new Error('GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
  }

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: {
      temperature: 0.2
    }
  };

  while (currentKeyIndex < GEMINI_API_KEYS.length) {
    const key = GEMINI_API_KEYS[currentKeyIndex];
    const keyDisplay = `${currentKeyIndex + 1}/${GEMINI_API_KEYS.length}번째`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${key}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('응답 본문에서 번역 텍스트를 추출할 수 없습니다.');
      }
      return text.trim();
    } catch (err) {
      console.warn(`[Gemini API] ${keyDisplay} 키 호출 실패 (${err.message})`);
      currentKeyIndex++;
      if (currentKeyIndex < GEMINI_API_KEYS.length) {
        console.log(`[Gemini API] 다음 ${currentKeyIndex + 1}번째 키로 전환하여 재시도합니다.`);
      }
    }
  }

  throw new Error(`모든 GEMINI_API_KEY(${GEMINI_API_KEYS.length}개) 시도가 실패했습니다.`);
}

async function translateFile(filePath) {
  console.log(`[번역 중] ${filePath}`);
  const content = await fs.readFile(filePath, 'utf-8');
  
  // 이미 충분히 한글이 많은 문서인지 확인 (휴리스틱)
  const koreanCharCount = (content.match(/[\uAC00-\uD7AF]/g) || []).length;
  const totalCharCount = content.replace(/\s+/g, '').length;
  if (totalCharCount > 0 && koreanCharCount / totalCharCount > 0.3) {
    console.log(`[건너뜀] 이미 한국어로 번역되어 있습니다: ${filePath}`);
    return;
  }

  const prompt = `다음 문서를 한국어로 번역해 주세요:\n\n${content}`;
  const translated = await callGemini(prompt);

  // 마크다운 코드블록 래퍼 제거 (혹시 포함된 경우)
  let cleanResult = translated;
  if (cleanResult.startsWith('```markdown\n') && cleanResult.endsWith('\n```')) {
    cleanResult = cleanResult.slice(12, -4);
  } else if (cleanResult.startsWith('```\n') && cleanResult.endsWith('\n```')) {
    cleanResult = cleanResult.slice(4, -4);
  }

  await fs.writeFile(filePath, cleanResult + '\n', 'utf-8');
  console.log(`[완료] ${filePath}`);
}

async function getChangedMarkdownFiles() {
  try {
    const diff = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf-8' });
    return diff
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.endsWith('.md') && existsSync(f));
  } catch {
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);
  let filesToTranslate = [];

  if (args.length > 0) {
    if (args[0] === '--diff') {
      filesToTranslate = await getChangedMarkdownFiles();
    } else {
      filesToTranslate = args;
    }
  } else {
    // 인자가 없으면 변경된 파일 확인
    filesToTranslate = await getChangedMarkdownFiles();
  }

  if (filesToTranslate.length === 0) {
    console.log('번역할 대상 파일이 없습니다.');
    return;
  }

  console.log(`총 ${filesToTranslate.length}개 파일 번역 시작...`);
  for (const file of filesToTranslate) {
    try {
      await translateFile(file);
    } catch (err) {
      console.error(`[오류 발생] ${file}:`, err);
    }
  }
  console.log('모든 번역 작업 완료.');
}

main().catch((err) => {
  console.error('스크립트 실행 오류:', err);
  process.exit(1);
});
