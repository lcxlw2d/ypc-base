import styles from './css/fullScreenView.css';

class FullScreenView extends PureComponent{

    static defaultProps = {
        transparent:false,
        mask:false,
        show:true
    }

    constructor(props,context) {
        super(props,context);
    }

    //判断是否有状态变化，如果没有不重绘
    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentDidMount(){
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount(){
        this.unrenderLayer();
    }

    //卸载DOM
    unrenderLayer(){
        if(!this.layer){
            return;
        }
        ReactDOM.unmountComponentAtNode(this.layer);
        document.body.removeChild(this.layer);
        $("body").removeClass("hidden");
        this.layer = null;
    }

    getFullViewCls(){
        var {transparent,mask,lightMask,show} = this.props;
        return this.mergeClassName(styles.frame, transparent?styles.transparent:"", mask?styles.mask:"", lightMask?styles.lightMask:"", !show?styles.hidden:"");
    }

    //渲染DOM
    renderLayer(){

        var {transparent,mask} = this.props;

        if(!this.layer){
            this.layer = $("<div/>")[0];
            $("body").append(this.layer);
        }

        var layerElement = (
            <div className={this.getFullViewCls()}>
                {this.props.children}
            </div>
        );
        //装载DOM
        this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this,layerElement,this.layer);
        $("body").addClass("hidden");
    }

    render(){
        systemApi.log("FullScreenView render");
        return null;
    }

}

// module.exports = FullScreenView;
export default FullScreenView;
