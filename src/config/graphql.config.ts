import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { isDev } from '../utils/is-dev.util';
import { ConfigService } from '@nestjs/config';

export async function getGraphQlConfig(
  configServie: ConfigService,
): Promise<ApolloDriverConfig> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    sortSchema: true,
    playground: isDev(configServie),
    context: ({ req, res }) => ({ req, res }),
  };
}
