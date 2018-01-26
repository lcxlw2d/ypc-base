import {connect} from 'react-redux';
import {setUndoType, showMessage, getNewCustomMOT, WARNING, SUCCESS, MOTDATA, MOTORDER} from '../../../../store/actions';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import Category from '../../../../components/common/category/Category';
import TextButton from '../../../../components/common/category/TextButton';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import TypeItem from '../../components/todo/list/TypeItem';
import TypeMotItem from '../../components/todo/list/TypeMotItem';
import TodoIntro from '../../components/todo/list/TodoIntro';
import Sortable from '../../../../lib/Sortable';
import styles from '../css/todo/listPage.css';

function getMOTDATA(){
    var data = {};
    for(var id in MOTDATA){
        data[id] = false;
    }
    return data;
}

/** 待办-自定义 **/
class ListPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            mymotClick:false,
            saveOrder:[],
            filterTypeState:getMOTDATA(),
            saveTypeState:getMOTDATA(),
            showIntro:false
        }
    }

    //获取页面名称
    getPageName(){ return "待办_自定义"; }

    componentWillMount(){
        var saveUndoType = getNewCustomMOT(),
            {undoType} = this.props,
            {filterTypeState, saveTypeState, saveOrder} = this.state,
            list = undoType.split(","),
            saveList = saveUndoType.split(",");

        //临时状态
        for(var i=0;i<list.length;i++){
            var item = list[i];
            if(filterTypeState.hasOwnProperty(item)){
                filterTypeState[item] = true;
            }
        }
        //管理状态
        for(var i=0;i<saveList.length;i++){
            var item = saveList[i];
            saveOrder.push(item);
            if(saveTypeState.hasOwnProperty(item)){
                saveTypeState[item] = true;
            }
        }
    }

    componentDidMount(){
        this.initSortableList();
        super.componentDidMount();
    }

    componentDidUpdate(){
        var {mymotClick} = this.state;
        this.initSortableList();
        this.sortable.option("disabled",mymotClick?false:true);
    }

    componentWillUnmount(){
        this.destroySortableList();
        super.componentWillUnmount();
    }

    //销毁排序对象
    destroySortableList(){
        var {sortable} = this;
        sortable && sortable.destroy();
    }

    //初始化可拖拽区域
    initSortableList(){
        var {dragArea} = this.refs;
        this.destroySortableList();
        this.sortable = Sortable.create(dragArea,{
            animation: 300,
            delay:50,
            disabled:true,
            ghostClass: styles.ghost,
            onEnd:this.updateOrder
        });
    }

    //更新数组顺序
    updateOrder = (e)=>{
        var {saveOrder} = this.state,
            {newIndex, oldIndex} = e;
        if(newIndex != oldIndex){
            var item = saveOrder[oldIndex];
            saveOrder.splice(oldIndex,1);
            saveOrder.splice(newIndex,0,item);
        }
    }

    //状态更新
    filterType = (type)=>{
        this.props.setUndoType(type, true);
        hashHistory.goBack();
    }

    //点击我的MOT管理
    myMotManageClick = ()=>{
        this.setState({mymotClick:true});
    }

    //从saveOrder中删除类型
    delType(id){
        var {saveOrder} = this.state;
        for(var i=0;i<saveOrder.length;i++){
            if(saveOrder[i] == id){
                saveOrder.splice(i,1);
                return;
            }
        }
    }

    //我的Mot点击事件,删除类型
    myMotClick = (id, type)=>{
        var {mymotClick, saveTypeState, saveOrder} = this.state;
        if(mymotClick){
            saveTypeState[id] = type=="del"?false:true;
            if(type == "plus"){
                saveOrder.push(id);
            }
            else if(type == "del"){
                this.delType(id);
            }
            this.forceUpdate();
        }
    }

    //保存我的MOT
    saveMotClick = ()=>{
        var {saveTypeState, saveOrder} = this.state;

        if(saveOrder.length < 4){
            this.props.showMessage(WARNING,"请至少选择四项MOT");
        }
        else{
            //设置待办类型
            this.props.setUndoType(saveOrder.join(","), false);
            this.state.filterTypeState = Object.assign({},saveTypeState);
            this.setState({mymotClick:false});
            this.props.showMessage(SUCCESS,"设置成功");
        }

    }

    //根据id，返回对应待办图标
    getMotItem(id){
        var {mymotClick} = this.state,
            item = MOTDATA[id];
        if(item){
            var {icoCls, shortName} = item;
            return <TypeMotItem icoCls={icoCls} text={shortName} id={id} type={mymotClick?"del":"none"} onClick={this.myMotClick} key={id}/>;
        }
        return "";
    }

    //我的MOT-Icon
    renderMyMotIcon(){
        var {mymotClick} = this.state;
        if(mymotClick){
            return [<TextButton text="保存" selfStyle="bareBlue" onClick={this.saveMotClick}/>];
        }
        else{
            return [<TextButton text="管理" selfStyle="bareBlue" onClick={this.myMotManageClick}/>]
        }

    }

    //渲染可拖拽的待办图标
    renderDragArea(){
        var {saveOrder, mymotClick} = this.state;

        return saveOrder.map((item,index)=>{
            return this.getMotItem(item);
        });
    }

    //关闭介绍
    closeIntro = ()=>{
        this.setState({showIntro:false});
    }

    //点击提示
    tipClick = ()=>{
        this.setState({showIntro:true});
    }

    //渲染顶部图标
    renderIcons = ()=>{
        return [<HeaderIcon iconCls="tip" onClick={this.tipClick}/>]
    }

    renderAllMot(list){
        var {saveTypeState} = this.state;
        return list.map((id)=>{
            var {icoCls, shortName} = MOTDATA[id];
            return <TypeMotItem icoCls={icoCls} text={shortName} id={id} type={saveTypeState[id]?"on":"plus"} onClick={this.myMotClick}/>;
        });
    }

    renderTypeItem(list){
        var {filterTypeState} = this.state;
        return list.map((id)=>{
            var {icoCls, shortName} = MOTDATA[id];
            return <TypeItem icoCls={icoCls}  text={shortName} id={id} selected={filterTypeState[id]} onClick={this.filterType} />;
        });
    }

    render(){
        systemApi.log("DetailPage render");

        var {mymotClick, showIntro} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="待办自定义" iconRight={this.renderIcons()}/>
                <Content iscroll={false}>
                    <Category title="我的MOT" iconLeft="none" borderColor="gray" iconElement={this.renderMyMotIcon()}>
                        <div className={styles.clear} ref="dragArea">
                            {this.renderDragArea()}
                        </div>
                    </Category>
                    <div className="blank"></div>
                    <Category title="全部MOT" iconLeft="none" borderColor="gray">
                        <div className={styles.clear}>
                            {mymotClick?this.renderAllMot(MOTORDER):this.renderTypeItem(MOTORDER)}
                        </div>
                    </Category>
                </Content>
                {showIntro?(<TodoIntro onClose={this.closeIntro}/>):null}
            </FullScreenView>

        );
    }
}

function injectProps(state){
    var {undoType} = state.base;
    return {undoType};
}

function injectAction(){
    return {setUndoType,showMessage};
}

module.exports = connect(injectProps, injectAction())(ListPage);
