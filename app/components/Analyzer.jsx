import React from 'react';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import { Match, Miss, Link } from 'react-router';
import MessageChart from './MessageChart';

export default class Analyzer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      entry: {},
    }
  }

   publishEntry(event) {
     event.preventDefault();

     axios.post('/api/analyzer', {
       body: this.refs['body'].value,
     })
     .then((res) => {
       notify.show('Analysis complete!', 'success');
       this.refs['body'].value = '';
       this.setState({submitted: true, entry: res.data})
     })
     .catch(err => {
       notify.show("something went wrong", 'error')
     })

   }

   changeState(event) {
     event.preventDefault();

     this.setState({submitted: false})
   }

  render() {

      return (
        <div className="center-align analyzer">
        <hr></hr>

          {!this.state.submitted &&
          <div className="row center-align">
            <h1>Input your email and we'll analyze it for you</h1>
            <div className="row">
            <div className="input-field col s8 offset-s2">
                   <textarea id="textarea2" ref="body" placeholder="enter email here"></textarea>
                </div>
              </div>
              <div className="row">
              <a className="btn" onClick={this.publishEntry.bind(this)}><Link to="/analyzer/complete" className="white-text">Analyze!</Link></a>
              </div>

            </div>
          }
          {this.state.submitted &&
            <div className="row align-center">
            <div className="row"><a className="btn" onClick={this.changeState.bind(this)}><Link to="/analyzer" className="white-text">New Email</Link></a></div>
              <div className="row">
              <div className="col s12 m6 offset-m3">
                <Match pattern="/analyzer/complete" exactly render={
                    () => <MessageChart entry={this.state.entry}
                            />
                        }/>
              </div>
              </div>
              </div>
          }
        </div>
      );
    }
}