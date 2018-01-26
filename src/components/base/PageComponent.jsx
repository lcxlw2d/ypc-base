import {resetLoadingNum} from '../../redux/store/reducers';
import PureComponent from './PureComponent'

class PageComponent extends PureComponent {

    //构造函数，创建请求清单
    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        //记录页面进入
        Client.trackPageBegin(this.getPageName());
    }

    getPageName(){
        try{
            return this.__proto__.constructor.name;
        }catch(e){
            return "无名";
        }

    }

    componentWillUnmount(){
        //记录页面离开
        Client.trackPageEnd(this.getPageName());
        //清空loading计数
        resetLoadingNum();
        super.componentWillUnmount();
    }

}
export default PageComponent;
