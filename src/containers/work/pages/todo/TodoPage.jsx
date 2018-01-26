import {connect} from 'react-redux';
import {rollBackUndoType, MOTDATA, EVENT_REFRESH_TODO_TOTAL} from '../../../../store/actions';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import SearchBar from '../../../../components/common/searchbar/SearchBar';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import TodoList from '../../components/todo/TodoList';
import DoneList from '../../components/todo/DoneList';

import styles from '../css/todo/todoPage.css';

function renderMap(){
    var map = {};
    for(var id in MOTDATA){
        map[id] = MOTDATA[id].name;
    }
    return map;
}

/** 待办首页 **/
class TodoPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        var index = Cache.getValue("todo_tab_type") || 0;
        this.state = {
            index:index,
            value:""
        }
        this.subMap = renderMap();
    }

    //获取页面名称
    getPageName(){ return "待办列表"; }

    componentDidMount(){
        Event.fire(EVENT_REFRESH_TODO_TOTAL);
        Client.cleanCachedPushMessage();
        super.componentDidMount();
    }

    //UI更新后，对列表刷新
    componentDidUpdate(){
        var {todoList, doneList} = this.refs;

        if(todoList){
            todoList.getWrappedInstance().getScroll().refresh();
        }
        if(doneList){
            doneList.getWrappedInstance().getScroll().refresh();
        }
    }

    componentWillUnmount(){
        this.props.rollBackUndoType();
        super.componentWillUnmount();
    }

    //切换tab
    tabChange = (index)=>{
        Cache.setValue("todo_tab_type",index);
        this.setState({index});
    }

    //搜索框文本改变
    searchChange = (value)=>{
        this.setState({value});
    }

    //渲染分类标题
    renderSubTitle(undoType){
        var list = undoType.split(",");
        if(list.length==1 && list[0]){
            return this.subMap[list[0]];
        }
        return "";
    }

    //点击类型筛选
    listClick = ()=>{
        this.props.rollBackUndoType();
        hashHistory.push("/work/todo/list");
    }

    //图标
    renderIcons(){
        return [
            <HeaderIcon iconCls="list" onClick={this.listClick}/>
        ];
    }

    render(){
        systemApi.log("TodoPage render");

        var {undoType} = this.props,
            {index,value} = this.state;

        return (
            <div>
                <AppHeader showBack={false}  headerName="待办" subTitle={this.renderSubTitle(undoType)} iconRight={this.renderIcons()}/>
                <Content withBottom={false} iscroll={false}>
                    <SearchBar placeholder={index==0?"输入待办关键字":"输入已办关键字"} value={value} onChange={this.searchChange}/>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="待办"/>
                        <UlineTab text="已办"/>
                    </SubTabs>
                    <div className="blank"></div>
                    <LazyLoad index={index}>
                        <TodoList search={value} undoType={undoType} ref="todoList"/>
                        <DoneList search={value} undoType={undoType} ref="doneList"/>
                    </LazyLoad>
                </Content>
                {this.props.children}
            </div>

        );
    }

}

function formatUndo(undoType){
    var obj = {},
        list = undoType.split(",");

    for(var i=0;i<list.length;i++){
        obj[list[i]] = true;
    }
    list = [];
    for(var k in obj){
        list.push(k);
    }

    return list.join(",");
}

function injectProps(state){
    var {base} = state,
        {undoType} = base;

    return {undoType:formatUndo(undoType)};
}

function injectAction(){
    return {rollBackUndoType};
}

module.exports = connect(injectProps,injectAction())(TodoPage);
