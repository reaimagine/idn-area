import { dbConfig } from '@/common/config/db.js';
import { validateDBConfig } from '@/common/utils/db/index.js';
import { runOrFail } from '@/common/utils/runner.js';

const main = async () => {
  validateDBConfig('provider');

  await runOrFail(
    `prisma generate --schema prisma/${dbConfig.provider}/schema.prisma`,
  );
};

main().catch((err: Error) => {
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
});
