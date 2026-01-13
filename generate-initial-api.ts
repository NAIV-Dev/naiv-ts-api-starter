import * as fs from 'fs';
import * as path from 'path';

function getAllTsFiles(dir: string): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const tsFiles: string[] = [];

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.ts')) {
      tsFiles.push(file.name);
      const implementationFolderPath = path.resolve(`./implementation`);
      if (!fs.existsSync(implementationFolderPath)) {
        fs.mkdirSync('./implementation')
      }
      const filePath = path.resolve(`./implementation/${file.name}`);
      if (fs.existsSync(filePath)) {
        console.log(`✅ File already exists: ${filePath}`);
      } else {
        const [fn] = file.name.split('.');
        const prefix = fn?.slice(0, 2);
        const only_name = fn?.slice(2);
        const is_streaming = prefix == 'S_';
        fs.writeFileSync(filePath, `\
import { ${prefix}${only_name} } from "../types/api/${prefix}${only_name}";

export const ${prefix?.toLowerCase()}${only_name}: ${prefix}${only_name} = async ${is_streaming ? '(req, stream, res)' : '(req, res)'} => {
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