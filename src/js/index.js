import React from 'react';
import Header from './components/pc_header'
import Footer from './components/pc_footer'
import NewsContainer from './components/pc_newscontainer';

export default class Index extends React.Component{
	
		render(){
			return(
				<div>
                    <Header></Header>
					<NewsContainer></NewsContainer>
					<Footer></Footer>
  				</div>
  			)
		}
}
