import {connect} from 'react-redux';

import TdItem from './TdItem';

import styles from '../../css/home/tracking/Track.css';

class TrackItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    render() {
        systemApi.log("TrackItem render");
        var{clientName,mobilePhone,userStatusvalue,cooperationChannelvalue,updateTime,branchName}= this.props;
        return (
            <tr className={styles.tr}>
               <TdItem title={clientName} describe={mobilePhone} />
               <TdItem title={userStatusvalue} describe={branchName} />
               <TdItem title={cooperationChannelvalue} describe={updateTime} />
            </tr>
        )
    }


}

module.exports =TrackItem;
