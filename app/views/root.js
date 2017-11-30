/**
 * Created by ChenMao on 2017/11/13.
 */
import React,{Component} from 'react';
import RouteMap from '../routes/route'
class Roots extends Component {
    render() {
        return (
            <RouteMap {...this.props}/>
        );
    }
}
export default Roots;