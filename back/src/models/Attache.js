import {Model} from 'objection';

export default class Attache extends Model {
    // Table name is the only required property.
    static tableName = 'attaches';
    
    static relationMappings = {
        candidates: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Candidate`,
            join: {
                from: 'attaches.id',
                through: {
                    from: 'candidate_attaches.idAttache',
                    to: 'candidate_attaches.idCandidate'
                },
                to: 'candidates.id'
            }
        }
    }
}
