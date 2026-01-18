import { ActionsTable } from './postgress_entity/actions.entity';

export interface PgDatabase {
  actions: ActionsTable;
}
