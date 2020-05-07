import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1588828483970 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },

                {
                    name: 'name',
                    type: 'varchar',
                },

                {
                    name: 'email',
                    type: 'varchar',
                },

                {
                    name: 'password',
                    type: 'varchar',
                },

                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },

                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users')
    }

}
