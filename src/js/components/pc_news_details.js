import React from 'react';
import {Row, Col, BackTop} from 'antd';

import Header from './pc_header'
import Footer from './pc_footer'
import PCNewsImageBlock from './pc_news_image_block'
import CommonComments from './common_comments'

export default class PCNewsDetails extends React.Component{

    constructor(){
        super();
        this.state={
            newsItem:'',
            newsType:'top'
        };
    };

    componentDidMount(){
        var myFetchOptions = {
            method:'Get'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" +this.props.params.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>this.setState({
            newsItem:json
        })); 
    };

    createMarkup(){
        return {__html:this.state.newsItem.pagecontent};
    };

    

    render(){

        return(
            <div>
                <Header></Header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14}>
                        <div className="artcleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type={this.state.newsType} width="100%" cardTitle="相关新闻" imageWidth="150px"></PCNewsImageBlock>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Footer></Footer>
                <BackTop/>
            </div>
        )
    }

}

