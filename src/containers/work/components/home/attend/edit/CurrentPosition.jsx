import styles from '../../../css/home/attend/edit/currentPosition.css';

class CurrentPosition extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            errMsg:""
        }
    }

    componentDidMount(){
        this.startLoaction();
    }

    startLoaction(){
        var {needPos} = this.props;
        if(needPos){
            Client.getLocationInfo(this.locationSuccess, this.onError);
        }
    }

    onError = (errMsg)=>{
        var {onError} = this.props;
        this.setState({errMsg});
        onError && onError();
    }

    //获取地理位置回调
    locationSuccess = (position)=>{
        var {onSuccess} = this.props,
            {lat:latitude, lng:longitude, addr} = position;     //获取纬度和经度 //这里设置刚开始的点所在处

        onSuccess(longitude, latitude, addr);
    }

    showMap=()=>{
        var {posState,longitude,latitude, onRepos} = this.props;
        if(posState=="1"){
            hashHistory.push("work/home/attend/showmap/"+longitude+"/"+latitude);
        }else{
            onRepos && onRepos();
            this.startLoaction();
        }
    }

    render(){

        systemApi.log("CurrentPosition render");

        var statusText,
            {dateTime, needPos, addressName,posState,posStateMsg} = this.props,
            {posStateMsg} = this.state;


        if(!needPos){
            statusText = addressName;
        }
        else{
            statusText = (posState=="0"?"开始定位":(posState=="1"?addressName:posStateMsg));
        }

        return (
            <div className={styles.locationbox} onClick={this.showMap}>
                <span>{dateTime}</span>
                <span className={styles.ml5}>{statusText}</span>
            </div>
        );
    }

}

module.exports = CurrentPosition;
