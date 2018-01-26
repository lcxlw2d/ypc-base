module.exports = function login(state, action) {
    var {type} = action;

    state = state || {
        showTip: false,
        message: ""
    };
    switch (type) {

        case "showTip":
            var {message} = action,
                newState = {
                    showTip: true,
                    message
                };

            return Object.assign({}, state, newState);
            break;
        case "closeTip":
            var newState = {
                    showTip: false,
                    message:""
                };

            return Object.assign({}, state, newState);
            break;
        default:
            return state;
    }
};
