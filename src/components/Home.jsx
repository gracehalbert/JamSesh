import React from 'react';
import GroupList from './GroupList.jsx';
import Search from './Search.jsx';
import Messenger from './Messenger.jsx';
import firebase from 'firebase';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      groups: [],
      sendTo: null,
    };

    this.runSearch = this.runSearch.bind(this);
    this.setSendTo = this.setSendTo.bind(this);
    const that = this;
  }


  setSendTo(sendTo) {
    this.setState({ sendTo: sendTo });
  }
  runSearch(queryObj) {
    this.setState({ query: queryObj });
  }

  render() {
    return (
      <div className="container">
        <h2>JamSesh</h2>
        <div className="col-md-8">
          {firebase.auth().currentUser ?
            <strong>Welcome, {firebase.auth().currentUser.displayName}!</strong> :
            <strong>Welcome! Please log in or sign up!</strong>}
          <GroupList query={this.state.query} sendTo={this.setSendTo} />
        </div>
        <div className="col-md-4 bg-info">
          <h4>Filter by:</h4>
          <Search runSearch={this.runSearch} />
        </div>
        <div className="col-md-12">
          <h4>Message</h4>
          <Messenger firebaseApp={this.props.firebaseApp} sendTo={this.state.sendTo} />
        </div>
      </div>
    );
  }
}

export default Home;
