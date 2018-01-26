module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const questionnairePage = require('../../pages/home/QuestionnairePage');
        cb(null, questionnairePage);
    }, 'questionnaire');
}
