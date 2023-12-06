import { appConfig } from '@/common/config/app.js';
import { dbConfig } from '@/common/config/db.js';
import { runOrFail } from '@/common/utils/runner.js';
import { validateDBConfig } from '@/common/utils/db/index.js';
import { dbProvider } from '@/common/utils/db/provider.js';

const main = async () => {
  validateDBConfig();

  switch (dbConfig.provider) {
    case dbProvider.mongodb:
      await runOrFail('prisma db push --schema prisma/mongodb/schema.prisma');
      break;
    default:
      await runOrFail(
        `prisma migrate ${
          appConfig.env === 'prod' ? 'deploy' : 'dev'
        } --schema prisma/${dbConfig.provider}/schema.prisma`,
      );
      break;
  }

  console.log('The migration command has been executed.');
};

main().catch((err: Error) => {
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
});
