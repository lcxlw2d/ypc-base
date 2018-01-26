import FullScreenView from './FullScreenView';

import styles from './css/scaleImage.css';

class ScaleImage extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.curScale = 100;
        this.translateY = 0;
    }

    calDistance(x1,y1,x2,y2){
        return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    }

    touchStart = (e)=>{
        var {touches} = e,
            {frame,img} = this.refs;
        this.multiFingers = touches.length==2;
        if(this.multiFingers){
            this.scale = this.curScale;
            this.oneX = touches[0].screenX;
            this.oneY = touches[0].screenY;
            this.onePageX = touches[0].pageX;
            this.onePageY = touches[0].pageY;
            this.otherX = touches[1].screenX;
            this.otherY = touches[1].screenY;
            this.otherPageX = touches[1].pageX;
            this.otherPageY = touches[1].pageY;
            this.scrollTop = frame.scrollTop;
            this.scrollLeft = frame.scrollLeft;
            this.curTranslateY = this.translateY;
            this.distance = this.calDistance(this.oneX, this.oneY, this.otherX, this.otherY);
            frame.style.overflow = "hidden";
            frame.style.WebkitOverflowScrolling = "auto";
        }
    }

    //通过手势向量判断是否是缩放手势
    isScaleGesture(vx1,vy1,vx2,vy2){
        return vx1*vx2<=0 && vy1*vy2<=0;
    }

    touchMove = (e)=>{
        var {touches} = e;
        if(this.multiFingers){
            var {img, frame} = this.refs,
                oneMoveX = touches[0].screenX,
                oneMoveY = touches[0].screenY,
                otherMoveX = touches[1].screenX,
                otherMoveY = touches[1].screenY,
                oneDiffX = oneMoveX - this.oneX,
                oneDiffY = oneMoveY - this.oneY,
                otherDiffX = otherMoveX - this.otherX,
                otherDiffY = otherMoveY - this.otherY,
                moveDistance = this.calDistance(oneMoveX, oneMoveY, otherMoveX, otherMoveY),
                currentScale = moveDistance/this.distance,
                scale = this.scale * currentScale;

            if(scale < 100 ) scale = 100;
            else if(scale > 200) scale = 200;
            this.curScale = scale;
            img.style.width = scale+"%";

            if(scale>=100 && scale<=200 && this.isScaleGesture(oneDiffX,oneDiffY,otherDiffX,otherDiffY)){

                var fHeight = frame.offsetHeight,
                    iHeight = img.height,
                    onePageX = this.onePageX*currentScale,
                    onePageY = this.onePageY*currentScale,
                    otherPageX = this.otherPageX*currentScale,
                    otherPageY = this.otherPageY*currentScale;

                if(iHeight < fHeight){
                    this.translateY = (fHeight-iHeight)/2;
                    img.style.transform = "translateY("+(fHeight-iHeight)/2+"px)";
                }

                frame.scrollTop = this.scrollTop + (onePageY<otherPageY?onePageY-this.onePageY-oneDiffY:otherPageY-this.otherPageY-otherDiffY) + (this.translateY-this.curTranslateY);
                frame.scrollLeft = this.scrollLeft + (onePageX<otherPageX?onePageX-this.onePageX-oneDiffX:otherPageX-this.otherPageX-otherDiffX);
            }

            e.stopPropagation();
            e.preventDefault();
        }
    }

    touchEnd = (e)=>{
        var {frame} = this.refs;
        this.multiFingers = false;
        frame.style.overflow = "auto";
        frame.style.WebkitOverflowScrolling = "touch";
    }

    imgLoad = ()=>{
        var {img, frame} = this.refs,
            fHeight = frame.offsetHeight,
            iHeight = img.height;

        if(iHeight < fHeight){
            this.translateY = (fHeight-iHeight)/2;
            img.style.transform = "translateY("+(fHeight-iHeight)/2+"px)";
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ScaleImage render");

        var {url, onClose} = this.props;

        return(
            <FullScreenView transparent={true}>
                <div className={this.mergeClassName(styles.frame)} ref="frame">
                    <img ref="img" src={url} onLoad={this.imgLoad} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}/>
                </div>
                <span className={styles.close} onClick={onClose}></span>
            </FullScreenView>
        );
    }


}

module.exports = ScaleImage;
