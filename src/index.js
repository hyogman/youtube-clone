import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js'
import VideoDetail from './components/video_detail.js';
import _ from 'lodash';
const API_KEY = 'AIzaSyAhcyFCGSL9kYrhuKgG1ryYcle5OERSziU';


class App extends Component{

	constructor(props){
		super(props); 
		this.state = {
			videos: [],
			selectedVideo:null
		}; 

		// default search when page is loaded 
		this.videoSearch('surfboards');
	}

	videoSearch(term){
			YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos:videos, 
				selectedVideo:videos[0]
			}); 
		});
	}
	
	render(){
		
		// lag search a little 
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		
		return (
			<div> 
				<h1> Henry's Amazing Youtube Clone </h1> 
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} /> 
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
			</div>

			);
	}
}

ReactDOM.render(<App/>, document.querySelector('.container'));



