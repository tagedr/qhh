import {Model} from 'objection';

export default class Candidate extends Model {
    // Table name is the only required property.
    static tableName = 'candidates';

    static relationMappings = {
        interviews: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Interview`,
            join: {
                from: 'candidates.id',
                through: {
                    from: 'interviews_candidates_users.idCandidate',
                    to: 'interviews_candidates_users.idInterview'
                },
                to: 'interviews.id'
            }
        },
        tags: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Tag`,
            join: {
                from: 'candidates.id',
                through: {
                    from: 'candidates_tags.idCandidate',
                    to: 'candidates_tags.idTag'
                },
                to: 'tags.id'
            }
        },
        attaches: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Attache`,
            join: {
                from: 'candidates.id',
                through: {
                    from: 'candidate_attaches.idCandidate',
                    to: 'candidate_attaches.idAttache'
                },
                to: 'attaches.id'
            }
        },
        messages: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Message`,
            join: {
                from: 'candidates.id',
                through: {
                    from: 'candidate_messages.idCandidate',
                    to: 'candidate_messages.idMessage'
                },
                to: 'messages.id'
            }
        }
    };
}
