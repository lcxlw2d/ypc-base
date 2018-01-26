import {connect} from 'react-redux';
import {showWarning, getRecentTheme, getRecentList, setRecentTheme} from '../../../actions/client/summary/serverAction';

import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import ServThemeList from './ServThemeList';

import styles from '../../css/client/detail/servThemeSelect.css';

class ServThemeSelect extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.userId = systemApi.getValue("userId");
        this.themes = getRecentTheme(this.userId);
        this.state = {
            value:"",
            search:"",
            servThemeId:"",
            servThemeName:"",
            showRecent:true,
            recentThemes:this.themes
        }
    }

    componentDidMount(){
        if(!this.themes.length){
            //从服务器取数据
            this.props.getRecentList(this, this.updateList);
        }
    }

    updateList = (data)=>{
        var recentThemes = data.map((item)=>{
            var {servThemeId, servThemeName} = item;
            return {id:servThemeId, text:servThemeName};
        });
        setRecentTheme(this.userId, recentThemes);
        this.setState({
            showRecent:!!data.length,
            recentThemes
        })
    }

    //输入框改变
    inputChange = (e)=>{
        var {value} = e.target;
        this.setState({value});
    }

    //点击确定
    okClick = ()=>{
        var {onSelect} = this.props,
            {servThemeId, servThemeName} = this.state;
        if(servThemeId != ""){
            onSelect && onSelect(servThemeId, servThemeName);
        }
        else{
            this.props.showWarning("请选择服务主题");
        }
    }

    servSelect = (servThemeId, servThemeName)=>{
        this.setState({servThemeId, servThemeName});
    }

    searchClick = ()=>{
        var {value} = this.state;
        this.setState({search:value, showRecent:false});
    }

    itemClick = (servThemeId, servThemeName)=>()=>{
        this.servSelect(servThemeId, servThemeName);
    }

    renderRecent(){
        var {servThemeId, recentThemes} = this.state;
        return recentThemes.map((item)=>{
            var {id, text} = item;
            return <span className={servThemeId==id?styles.selected:""} onClick={this.itemClick(id,text)}>{text}</span>
        });
    }

    render(){
        var {onClose} = this.props,
            {servThemeId,search,value,showRecent} = this.state;

        return(
            <FullScreenView transparent={true}>
                <div className={styles.pop_up}>
                    <div className={styles.ecard_box}>
                        <div className={styles.choose_top}>
                            <span className="left">请选择服务主题</span>
                            <span className="right" onClick={onClose}>关闭</span>
                        </div>
                        <div className={styles.choose_search}>
                            <input type="text" placeholder="搜索服务主题" value={value} onChange={this.inputChange} />
                            <input type="button" onClick={this.searchClick}/>
                        </div>
                        <div className={styles.boxes}>
                            {showRecent?(
                                <div className={styles.recent}>
                                    <div className={styles.title}>最近主题</div>
                                    <div className={styles.content}>
                                        {this.renderRecent()}
                                    </div>
                                </div>
                            ):(
                                <ServThemeList search={search} curThemeId={servThemeId} onSelect={this.servSelect}/>
                            )}
                        </div>
                        <div className={this.mergeClassName(styles.choose_btn, servThemeId!=""?styles.on:"")} onClick={this.okClick}><span>确 定</span></div>
                    </div>
                </div>
            </FullScreenView>
        )
    }

}

function injectAction() {
    return {showWarning, getRecentList};
}

module.exports = connect(null, injectAction())(ServThemeSelect);
