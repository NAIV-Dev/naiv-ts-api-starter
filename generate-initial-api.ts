import * as fs from 'fs';
import * as path from 'path';

function getAllTsFiles(dir: string): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const tsFiles: string[] = [];

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.ts')) {
      tsFiles.push(file.name);
      const filePath = path.resolve(`./implementation/${file.name}`);
      if (fs.existsSync(filePath)) {
        console.log(`✅ File already exists: ${filePath}`);
      } else {
        const [fn] = file.name.split('.');
        fs.writeFileSync(filePath, `\
import { T_${fn} } from "../types/api/${fn}";

export const ${fn}: T_${fn} = async req => {
  throw new Error('Implement this');
}
`, 'utf8');
        console.log(`📝 File created: ${filePath}`);
      }
    }
  }

  return tsFiles;
}

console.log(getAllTsFiles('./types/api'));
