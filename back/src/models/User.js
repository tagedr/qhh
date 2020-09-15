import {Model} from 'objection';

export default class User extends Model {
    // Table name is the only required property.
    static tableName = 'users';

    static relationMappings = {
        interviews: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Interview`,
            join: {
                from: 'users.id',
                // ManyToMany relation needs the `through` object to describe the join table.
                through: {
                    from: 'interviews_candidates_users.idWelcomeUser',
                    to: 'interviews_candidates_users.idInterview'
                },
                to: 'interviews.id'
            }
        }
    };
}
