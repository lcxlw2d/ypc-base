import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

export function getStoreConfig(){
    return applyMiddleware(thunk)(createStore)(function(){}, {});
}

export function getStoreConfigTest(){
        if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){
            return applyMiddleware(thunk)(createStore)(function(){}, {});
        }else{
             return compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())(createStore)(function(){}, {}) //插件调试，未安装会报错
        }

}
