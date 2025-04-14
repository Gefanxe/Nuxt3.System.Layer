import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export default defineEventHandler(async () => {
  const apiDir = path.resolve(process.cwd(), 'server/api');
  const files = await fs.promises.readdir(apiDir);

  // 轉換為 API 路徑格式
  const routes = files.map(file => `/api/${file.replace('.ts', '')}`);

  return { routes };
});
