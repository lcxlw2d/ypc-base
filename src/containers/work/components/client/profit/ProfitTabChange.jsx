class ProfitTabChange extends PureComponent{
    static defaultProps = {
        index:0
    };

    //构造函数
    constructor(props) {
        super(props);
        //默认状态
        this.state = {
            index:0
        }
    }

    componentWillMount(){
        this.setState({
            index:this.props.index
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            index:nextProps.index
        });
    }

    tabClick = index => () => {
            var {onTabChange} = this.props;
            this.setState({index});

            if(onTabChange){
                onTabChange(index);
            }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ProfitTabChange render");

        var myChildren = this.getChildren(),
            length = myChildren.length;
        var children = myChildren.map((tab, index) => {
            return React.cloneElement(tab, {
                key:index,
                index:index,
                total:length,
                selected:this.state.index,
                onClick:this.tabClick(index)
            });
        })

        return(
            <div style={{overflow:"hidden"}}>
                <ul style={{overflow:"hidden"}}>
                    {children}
                </ul>
            </div>
        );
    }


}

module.exports = ProfitTabChange;
