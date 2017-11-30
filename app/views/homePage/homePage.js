/**
 * Created by ChenMao on 2017/7/6.
 */
import React,{Component} from 'react';
import './homePage.less';

export default class HomePage extends Component {
    constructor(...args) {
        super(...args);
    }
    //reader前
    componentWillMount(){

    }
    //在页面被渲染成功之后
    componentDidMount(){

    }
    //页面销毁
    componentWillUnmount(){

    }

    render() {
        const {text}=this.props.HomePage;
        return (
            <div>{text}</div>
        )
    }
}