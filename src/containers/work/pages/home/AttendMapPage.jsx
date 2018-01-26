import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/home/attendMapPage.css';

class AttendMapPage extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        var {longitude,latitude} = this.props.params,
            map = new BMap.Map("map"), //初始化地图类
            point = new BMap.Point(longitude,latitude), //这里设置刚开始的点所在处
            marker = new BMap.Marker(point); //事件类
        map.centerAndZoom(point, 13); //绘制地图
        map.addOverlay(marker); //标记地图
    }

    render(){

        return (
          <FullScreenView>
              <AppHeader headerName="我的位置"/>
              <Content iscroll={false}>
                  <div id="map" className={styles.maproot}/>
              </Content>
          </FullScreenView>
        );
    }

}

module.exports = AttendMapPage;
