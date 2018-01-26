import {connect} from 'react-redux';
import {getThemeList} from '../../../actions/client/summary/serverAction';

import styles from '../../css/client/detail/servThemeList.css';

//服务主题列表
class ServThemeList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps){
        var {search} = this.props;
        if(search != nextProps.search){
            super.componentWillReceiveProps(nextProps);
        }
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    getData(startIndex, isAppend, cb, props) {
        var {search} = props,
            params = {
                startIndex,
                servThemeName:search,
                length:20
            };
        this.props.getThemeList(params, isAppend, cb, this, this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    itemClick = (servThemeId,servThemeName)=>()=>{
        var {onSelect} = this.props;
        onSelect && onSelect(servThemeId, servThemeName);
    }

    renderList() {
        var {curThemeId} = this.props,
            {data} = this.state;
        return data.map((item, index) => {
            var {servThemeId, servThemeName} = item;
            return (
                <li className={this.mergeClassName(styles.item, curThemeId==servThemeId?styles.on:"")} onClick={this.itemClick(servThemeId,servThemeName)}>
                    <a>{servThemeName}</a>
                </li>
            );
        });
    }

}

function injectAction() {
    return {getThemeList};
}

module.exports = connect(null, injectAction())(ServThemeList);
