import React from 'react';
import {Row,Col, Button} from 'antd';
import { Menu, Icon } from 'antd';
import { Modal, Form, message, Tabs, Input, Checkbox} from 'antd';

const FormItem = Form.Item;//用于form表单提交
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import {Router, Route, Link,  browserHistory} from 'react-router'


class PCHeader extends React.Component{

        constructor(){
            super();
            this.state={
                current:'top',
                hasLogined:false,
                userNickName:'',
                modalVisible:false,
                userid:0,
                action:'login'
            }
        }

        componentWillMount(){
            if(localStorage.userid!=''){
                this.setState({hasLogined:true});
                this.setState({userid:localStorage.userid,userNickName:localStorage.userNickName});
            }
        }
        setModalVisible(value){
            this.setState({modalVisible:value});
        }

        handleChick(e){
            if(e.key=="register"){ 
                this.setState({current:"register"});
                this.setState({modalVisible:true});
            }
            else{
                this.setState({current:"e.key"});
            }
        }

        handleSubmit(e){
            e.preventDefault();//原生的组织事件冒泡的方法
            var myFetchOptions = {
                method:'GET'
            };
            var formData = this.props.form.getFieldsValue();
            console.log(formData);
            
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="
            +formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="
            +formData.r_confirmPassword,myFetchOptions)
            .then(response=>response.json())    
            .then(json=>{
                this.setState({userNickName:json.NickUserName,userid:json.UserId});
                localStorage.userid=json.UserId;
                localStorage.userNickName=json.NickUserName;
                //console.log(this.state.userNickName);console.log(this.state.userid);
            });//fetch()后返回一个promise<response>的对象，随后response.then(xxxx.json)返回了一个json对象,随后json.then()

            if (this.state.action=="login") {
                this.setState({hasLogined:true});
            };
            
            message.success("请求成功！！！");
            this.setModalVisible(false);
        }

        callback(key){
            if(key==1){
                this.setState({action:'login'});
                //this.setState({hasLogined:true});
                
            }
            else if(key==2){
                this.setState({action:'register'})
            }
        }

        logout(){
            localStorage.userid='';
            localStorage.userNickName='';
            this.setState({hasLogined:false});
        };
	
		render(){

            let {getFieldProps} = this.props.form;//好像是为了后面form表单内的属性 & 因为你的这个组件需要被 Form.create({}) 修饰之后才有 this.props.form，不写当然会报错了
            const userShow = this.state.hasLogined ?
                <Menu.Item key="logout" className="register">
                    <Button type="primary" htmlType="button" >{this.state.userNickName}</Button>
                    &nbsp;&nbsp;
                    <Link target="_blank" to={`/usercenter`}>
						<Button type="dashed" htmlType="button">个人中心</Button>
					</Link>
                    &nbsp;&nbsp;
                    <Button type="danger" onClick={this.logout.bind(this)}>退出</Button>
                </Menu.Item> 
                :
                <Menu.Item key="register" className="register">
                    <Icon type="appstore"/>登入/注册
                </Menu.Item>;

            
			return(
				<header>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={4}>
                            <a href="/" className="logo">
                                <img src="./src/images/logo.png" alt="logo" />
                                <span>ReactNews</span>
                            </a>
                        </Col>
                        <Col span={16}> 
                            <Menu mode="horizontal" onClick={this.handleChick.bind(this)} selectedKeys={[this.state.current]}>
                                <Menu.Item key="top">
                                    <Icon type="appstore"/>头条
                                </Menu.Item>
                                <Menu.Item key="shehui">
                                    <Icon type="appstore"/>社会
                                </Menu.Item>
                                <Menu.Item key="guoji">
                                    <Icon type="appstore"/>国际
                                </Menu.Item>
                                <Menu.Item  key="guonei">
                                    <Icon type="appstore"/>国内
                                </Menu.Item>
                                <Menu.Item  key="yule">
                                    <Icon type="appstore"/>娱乐
                                </Menu.Item>
                                <Menu.Item  key="tiyu">
                                    <Icon type="appstore"/>体育
                                </Menu.Item>
                                <Menu.Item  key="keji">
                                    <Icon type="appstore"/>科技
                                </Menu.Item>
                                <Menu.Item  key="shishang">
                                    <Icon type="appstore"/>时尚
                                </Menu.Item>
                                {userShow}
                            </Menu>

                            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} 
                                onOk={()=>{this.setModalVisible(false)}} onCancel={()=>{this.setModalVisible(false)}}   okText="关闭" >
                                <Tabs type="card" onChange={this.callback.bind(this)}>
                                    <TabPane tab="登入" key="1">
                                        <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem label="用户名">
                                                <Input placeholder="请输入用户名" {...getFieldProps('userName')}></Input>
                                            </FormItem>
                                            <FormItem label="密码">
                                                <Input type = "password" placeholder="请输入密码" {...getFieldProps('password')}></Input>
                                            </FormItem>

                                            <Button type="primary" htmlType="submit">登入</Button>
                                        </Form>
                                    </TabPane>

                                    <TabPane tab="注册" key="2">
                                        <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem label="用户名">
                                                <Input placeholder="请输入用户名" {...getFieldProps('r_userName')}></Input>
                                            </FormItem>
                                            <FormItem label="密码">
                                                <Input type = "password" placeholder="请输入密码" {...getFieldProps('r_password')}></Input>
                                            </FormItem>
                                            <FormItem label="确认密码">
                                                <Input type = "password" placeholder="请再次确认密码" {...getFieldProps('r_confirmPassword')}></Input>
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>

                            </Modal>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    
                </header>
  			)
		}
}

export default PCHeader = Form.create({})(PCHeader);//这里的Form.create方法会将getFieldProps添加到props上，必须先Form.create
