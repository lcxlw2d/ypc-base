import {connect} from 'react-redux';

import styles from '../../css/home/tracking/accountList.css';

class Enlist extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div class="floor">
                    <div class="customer pd10">
                        <div class="recruit_box">
                            <div class="recruit_div">
                                <span class="recruit_div_20">营业部</span>
                                <span class="recruit_div_60">上海民生路</span>
                                <a href="#" class="arrowright02"></a>
                            </div>
                            <div class="recruit_div">
                                <span class="recruit_div_20">三方存管</span>
                                <span class="recruit_div_60">
                                    <span>工商银行</span>、<span>交通银行</span>
                                </span>
                                <a href="#" class="arrowright02"></a>
                            </div>
                            <div class="recruit_div">
                                <span class="recruit_div_20">理财顾问</span>
                                <span class="recruit_div_60"><input type="text" value="96654"/></span>
                            </div>
                            <div class="recruit_div">
                                <span class="recruit_div_20">营业部</span>
                                <span class="recruit_div_60"><input
                                    type="text"
                                    value="请输入您的推荐人"
                                    onmouseover="this.focus();this.select();"
                                    onclick="if(value==defaultValue){value='';this.style.color='#000'}"
                                    onblur="if(!value){value=defaultValue;this.style.color='#999'}"
                                    style="color:#999;"/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(Enlist);