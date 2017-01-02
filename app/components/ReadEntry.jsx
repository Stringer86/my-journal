import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import MessageChart from './MessageChart';
import NotFound from './NotFound';

export default class ReadEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: {},
    }
  }

  componentDidMount() {
    const id = Number(location.pathname.slice(7));
    console.log(id);

    axios.get(`/api/entries/${id}`)
      .then((res) => {
        this.setState({entry: res.data});
      })
      .catch((err) => {
        return err;
      })
  }

  deletePost(event) {
    event.preventDefault();

    axios({
      method: 'delete',
      url: `/api/entries/${this.state.entry.id}`
    })
    .then(res => {
      notify.show('Post Deleted', 'success');
      axios.get('/api/entries')
        .then(res => {
          this.props.getEntries(res.data);
        })
        .catch(err => {
          console.log(err);
      })
    })
    .catch(err => {
      return err;
    })
  }



  render() {

    if (!this.state.entry.id) {
      return <NotFound />
    }


    return (
      <div className="row">
      <hr></hr>
      <br></br>
      <div className="col s12 l7 m7">
        <div className="card readCard">
          <p className="journalBody">{this.state.entry.body}</p>
          <div className="row center-align">
          <a className="btn delete" onClick={this.deletePost.bind(this)}><Link to="/entries" className="white-text">Delete</Link></a>
          </div>
        </div>
      </div>
      <div className="col s12 l3 m3 journalChart">
      <MessageChart entry={this.state.entry}/>
      </div>
      </div>
    );
  }
}
