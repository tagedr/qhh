import {Model} from 'objection';

export default class Message extends Model {
    // Table name is the only required property.
    static tableName = 'messages';

    static relationMappings = {
        candidates: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Candidate`,
            join: {
                from: 'messages.id',
                through: {
                    from: 'candidate_messages.idMessage',
                    to: 'candidate_messages.idCandidate'
                },
                to: 'candidates.id'
            }
        },
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'messages.id',
                through: {
                    from: 'users_messages.idMessage',
                    to: 'users_messages.idUser'
                },
                to: 'users.id'
            }
        }
    }
}
