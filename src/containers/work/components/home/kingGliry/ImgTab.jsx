
import styles from '../../../../work/pages/css/home/KingGloryPage.css';

class ImgTab extends PureComponent{

    static defaultProps = {
        text:'',
        yesStyle:true,
        isOnClick:true
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ImgTab render");
        var {text='', yesStyle=true, isOnClick=true, index, selected, total} = this.props,
            itemCls = this.mergeClassName(yesStyle?styles["tab0"+(index+1)]:"", (index==selected?styles.on:"")),
            tabStyle = {
                width:100/(total)+"%"
            };

        return(
            <li className={itemCls}   onClick={isOnClick?this.props.onClick:this.props.onTipClick}>
                {text&&<a>{text}</a>}
            </li>
        );
    }


}

// const ImgTab = props => {
//     //打印渲染日志，必写
//     systemApi.log("ImgTab render");
//     var {
//             text,
//             yesStyle = true,
//             index,
//             selected,
//             total
//         } = props,
//         itemCls = `${yesStyle
//             ? styles["tab0" + (index + 1)]
//             : ""} ${index == selected
//                 ? styles.on
//                 : ""}`,
//         tabStyle = {
//             width: 100 / (total) + "%"
//         };
//     return (
//         <li className={itemCls} onClick={props.onClick}>
//             <a>{text}</a>
//         </li>
//     );
// }

module.exports = ImgTab;
