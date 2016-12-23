import React from 'react';
import PhotoGridItem from './PhotoGridItem';
import ExpandedPhotoView from './ExpandedPhotoView';

export default class PhotoGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.posts, 'photo grid');
    this.setState({
      picInfo: nextProps.posts.reverse()
    }, () => {console.log(this.state, 'state')});
    
  }
  expandHandle(picInfo){
    this.setState({
      expandImg: picInfo
    })
  }
  close(){
    console.log('clicked');
    this.setState({
      expandImg: 0
    })
  }
  render(){
    let posts = [];
    if(this.state.picInfo){
      posts = this.state.picInfo
    }
    const imgList = posts.map(post => (
      <PhotoGridItem
        author={post.author}
        comments={post.comments}
        likes={post.likes}
        key={post._id}
        description={post.description}
        filter={post.filter}
        photourl={post.photourl}
        timestamp={post.timestamp}
        testFunc={this.expandHandle.bind(this)}
        />
    ) );
    return(
      <div>
        <div className="photoGrid">
          {imgList}
        </div>
        <div>
        {
          this.state.expandImg 
          ? <ExpandedPhotoView 
              info={this.state.expandImg} 
              photourl={this.state.expandImg.photourl} 
              filter={this.state.expandImg.filter}
              close={this.close.bind(this)}
            /> 
          : null
        }
        </div>
      </div>
    )
  }
}