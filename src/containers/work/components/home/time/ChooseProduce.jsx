import {connect} from 'react-redux';
import {searchProduct} from '../../../actions/home/newstock/newstockAction';
import AppHeader from '../../../../../components/common/appheader/AppHeader';
import SearchBar from '../../../../../components/common/searchbar/SearchBar';
import ProductList from './ProductList';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import styles from '../../css/home/newstock/list.css';

class ChooseProduce extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            value:"",
            search:""
        }
    }

    //点击搜索按钮
    toSearch = (search)=>{
        this.setState({search});
    }

    //搜索框文本改变
    searchChange = (value)=>{
        this.setState({value});
    }

    //选择产品回调
    choose = (name,productId)=>{

      this.props.choose(name,productId);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ChooseProduce render");

        var {value,search} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="选择产品" onBackClick={this.props.close}/>
                <Content iscroll={false}>
                    <SearchBar onSearch={this.toSearch} value={value} onChange={this.searchChange} placeholder="请输入产品名称或产品代码"/>
                    <ProductList search={search} chooseProduct={this.choose}/>
                </Content>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {searchProduct};
}

module.exports = connect(null, injectAction())(ChooseProduce);
