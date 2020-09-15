import {Model} from 'objection';

export default class Tag extends Model {
    // Table name is the only required property.
    static tableName = 'tags';

    static relationMappings = {
        candidates: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Candidate`,
            join: {
                from: 'tags.id',
                // ManyToMany relation needs the `through` object to describe the join table.
                through: {
                    from: 'candidates_tags.idTag',
                    to: 'candidates_tags.idCandidate'
                },
                to: 'candidates.id'
            }
        }
    };
}
