import {Model} from 'objection';

export default class Interview extends Model {
    // Table name is the only required property.
    static tableName = 'interviews';

    static relationMappings = {
        welcomeUser: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'interviews.id',
                through: {
                    from: 'interviews_candidates_users.idInterview',
                    to: 'interviews_candidates_users.idWelcomeUser'
                },
                to: 'users.id'
            }
        },
        interviewer: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'interviews.id',
                through: {
                    from: 'interviews_candidates_users.idInterview',
                    to: 'interviews_candidates_users.idInterviewer'
                },
                to: 'users.id'
            }
        },
        candidates: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Candidate`,
            join: {
                from: 'interviews.id',
                through: {
                    from: 'interviews_candidates_users.idInterview',
                    to: 'interviews_candidates_users.idCandidate'
                },
                to: 'candidates.id'
            }
        }
    };
}
