import { DataSource, DataSourceConfig } from "apollo-datasource";
import { InMemoryLRUCache } from "apollo-server-caching";
import { Game, Phase, Status } from "../../__generated__/lib/graphql-schema";
import { CustomContext } from "./context";

export class GameDataSource<TContext extends CustomContext> extends DataSource {
  protected cacheFromConfig!: InMemoryLRUCache;
  protected context!: TContext;

  initialize(config: DataSourceConfig<TContext> & { cache: InMemoryLRUCache }): void {
    this.context = config.context;
    this.cacheFromConfig = config.cache;
  }

  getGame(id: string): Promise<Game> {
    return Promise.resolve({
      id,
      lastRoundNumber: 12,
      name: "Paco",
      phase: Phase.Preparation,
      players: [],
      status: Status.Ready,
      round: {
        id: `${id}-1`,
        number: 1,
        cards: [],
        hands: [],
      },
    });
  }
}
