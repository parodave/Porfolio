import { execSync } from 'child_process';

function run(script: string) {
  execSync(`ts-node --loader ts-node/esm ${script}`, { stdio: 'inherit' });
}

run('scripts/fix-three-deps.ts');
run('scripts/fix-three-missing.ts');
