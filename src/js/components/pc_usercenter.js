import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification,   
    Upload
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

import Header from './pc_header'
import Footer from './pc_footer'
import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCUserCenter extends React.Component{

    constructor(){
        super();
        this.state={
            previewVisible:false,
            previewImage:'',
            usercollection:''

        }
    }

    
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({userCollection:json})
        });
    };

    render(){

        const props = {

            action:'http://newsapi.gugujiankong.com/handler.ashx',
            handle:{
                "Access-Control-Allow-Origin":"*"
            },
            listType:"picture-card",
            defaultFileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			    thumbUrl:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }],
            onPreview:(file)=>{
                this.setState={
                    previewVisble:true,
                    previewImage:file.url
                }
            }
        };

        const {usercollection} = this.state;
        const usercollectionList = usercollection.length
        ?
        usercollection.map((uc,index)=>(
            <Card key={index} title={uc.uniquekey} extra={<a target='_blank' href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                <p>{uc.Title}</p>
            </Card>
        ))
        :
        '没有加载到收藏文章，请去收藏！';


        
        return(
            <div>
                <Header></Header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏" key="1">
                                <div className="comment">
                                    <Row span={24}>
                                        {usercollectionList}                           
                                    </Row>                 
                                </div> 
                            </TabPane>
                            <TabPane tab="我的评价" key="2">
                                
                            </TabPane>
                            <TabPane tab="个人头像" key="3">
                                <Upload {...props}>
                                    <Icon type='plus'></Icon>
                                    <div className='ant-upload-text'>上传照片</div>
                                </Upload>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt='预览' src={this.state.previewImage}></img>
                                </Modal>
                                
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Footer></Footer>
            </div>

        )
    }

}
