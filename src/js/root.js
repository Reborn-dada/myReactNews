import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Index from './index';
import PCUserCenter from './components/pc_usercenter';
import PCNewsDetails from './components/pc_news_details';

export default class Root extends React.Component{
	
		render(){
			return(
				<div>
					<Router history={hashHistory}>
						<Route path="/" component={Index}></Route>
						<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
						<Route path="/usercenter" component={PCUserCenter}></Route>
					</Router>
  				</div>
  				)
		}
}

ReactDOM.render(<Root />,document.getElementById('mainContainer'));