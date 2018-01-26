import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/client/filter.css';

class FilterItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state={
            value:props.value
        }

    }

    itemClick0 = () => {
        if(this.state.value == 0) return;
        this.setState({value:0});
    }

    itemClick1 = () => {
        if(this.state.value == 1) return;
        this.setState({value:1});
    }

    itemClick2 = () => {
        if(this.state.value == 2) return;
        this.setState({value:2});
    }

    getValue = () =>{
        return this.state.value;
    }

    render() {

        systemApi.log("FilterItem render");
        var {name} = this.props,
        {value} = this.state;
        return (
            <li>
                <span>{name}</span>
                <a className={value==0?styles.on:""} onClick={this.itemClick0}>全部</a>
                <a className={value==1?styles.on:""} onClick={this.itemClick1}>是</a>
            </li>

        )

    }

}

module.exports = FilterItem;
