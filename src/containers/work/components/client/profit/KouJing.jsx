import data from '../../../../../../json/profitKouJing.json';


import KouJingList from './KouJingList';

import styles from './css/kouJing.css';

class KouJing extends PageComponent{

    constructor(props, context) {
        super(props, context);
        this.state = {
            index:0,
        }
    }

    //获取页面名称
    getPageName(){ return "首页_客户_盈亏_口径说明"; }

     //切换tab
     tabChange = (index)=>{

        let {KouJingList} = this.refs;
        this.setState({index}, () => {

             $(KouJingList).scrollTop(0);
        });
    }

    render(){
        systemApi.log("KouJingPage render");

        let { index } = this.state;

        return (<KouJingList data={data}/>);
    }

}

module.exports = KouJing;
