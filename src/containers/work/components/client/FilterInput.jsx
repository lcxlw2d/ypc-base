import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/client/filter.css';

class FilterInput extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    itemChange = (e)=>{
        var {onChange} = this.props,
            {value} = e.target;
        onChange && onChange(value);
    }

    render() {
        systemApi.log("FilterInput render");
        var {name, value, placeholder} = this.props;
        return (
            <li>
                <span>{name}</span>
                <input value={value} onChange={this.itemChange} placeholder={placeholder}/>
            </li>
        )

    }

}

module.exports = FilterInput;
