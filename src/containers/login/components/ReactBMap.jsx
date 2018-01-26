import AppHeader from '../../../components/appheader/AppHeader';

import styles from './css/bMap.css';

class ReactBMap extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        var map = new BMap.Map("container");//初始化地图
        map.addControl(new BMap.NavigationControl());  //初始化地图控件
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        var point=new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);//初始化地图中心点
        var marker = new BMap.Marker(point); //初始化地图标记
        marker.enableDragging(); //标记开启拖拽

        var gc = new BMap.Geocoder();//地址解析类
        //添加标记拖拽监听
        marker.addEventListener("dragend", function(e){
            //获取地址信息
            gc.getLocation(e.point, function(rs){
                showLocationInfo(e.point, rs);
            });
        });

        //添加标记点击监听
        marker.addEventListener("click", function(e){
           gc.getLocation(e.point, function(rs){
                showLocationInfo(e.point, rs);
            });
        });

        map.centerAndZoom(point, 15); //设置中心点坐标和地图级别
        map.addOverlay(marker); //将标记添加到地图中

        //显示地址信息窗口
        function showLocationInfo(pt, rs){
            var opts = {
              width : 250,     //信息窗口宽度
              height: 100,     //信息窗口高度
              title : ""  //信息窗口标题
            }

            var addComp = rs.addressComponents;
            var addr = "当前位置：" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + "<br/>";
            addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;
            //alert(addr);

            var infoWindow = new BMap.InfoWindow(addr, opts);  //创建信息窗口对象
            marker.openInfoWindow(infoWindow);
        }
    }

    backClick = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ReactBMap render");

        return (
            <div className={styles.frame}>
                <AppHeader headerName="地图测试" onBackClick={this.backClick}/>
                <div id="container" className={styles.container}></div>
            </div>
        );
    }

}

module.exports = ReactBMap;
