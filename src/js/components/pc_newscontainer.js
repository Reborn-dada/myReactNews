import React from 'react';
import {Row, Col, Carousel} from 'antd';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block'
import PCProduct from './pc_product'

export default class PCNewsContainer extends React.Component{



    render(){
        const settings = {
            dots:true,
            Infinity:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        }
        return(
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} className="container">
                    <div className="leftContainer">
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg"></img></div>
                                <div><img src="./src/images/carousel_2.jpg"></img></div>
                                <div><img src="./src/images/carousel_3.jpg"></img></div>
                                <div><img src="./src/images/carousel_4.jpg"></img></div>
                            </Carousel>
                        </div>
                        <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="112px"></PCNewsImageBlock>      
                    </div>
                    <Tabs className="tabs_news">
                        <TabPane tab="头条新闻" key="1">
                            <PCNewsBlock width="100%" bordered="false" type="top" count={22}></PCNewsBlock>
                        </TabPane>
                        <TabPane tab="国际" key="2">
                            <PCNewsBlock width="100%" bordered="false" type="guoji" count={22}></PCNewsBlock>
                        </TabPane>
                    </Tabs>
                    <Tabs class="tabs_product">
							<TabPane tab="ReactNews 产品" key="1">
								<PCProduct/>
							</TabPane>
					</Tabs>  
                    <div>
                        <PCNewsImageBlock count={8} type="shehui" width="100%" cardTitle="社会新闻" imageWidth="132px"></PCNewsImageBlock>
                        <PCNewsImageBlock count={8} type="keji" width="100%" cardTitle="科技新闻" imageWidth="132px"></PCNewsImageBlock>
                        <PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="132px"></PCNewsImageBlock>
                    </div>
                </Col>
                <Col span={2}></Col>
            </Row>
        </div>
            
        );
        
    }
}