import notes from './notes.seed';

async function main() {
  await Promise.all([notes()]);
}

main().catch(console.error);
