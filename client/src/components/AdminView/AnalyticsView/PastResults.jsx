import React, { Component } from 'react';

class PastResults extends Component {



  render() {
    return (
      <div className="past-challenge-container">
      <button className="ui button" onClick={()=>{this.props.showTable()}}>Back to Past Challenges</button>
      <table className="ui celled table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Status</th>
          <th>Save to Favorites</th>
        </tr>
      </thead>
      <tbody>
      {this.props.pastResults.map((item) => {
        return (
          <tr key={item.candidate_id}>
            <td>{item.username}</td>
            <td style={item.user_passed ? {color: 'green'} : {color: 'red'}} >{item.user_passed ? "Passed" : "Failed"}</td>
            <td><i className={!this.props.favorites.includes(item.id) ? "heart outline icon cursor" : "heart icon cursor"} 
            onClick={!this.props.favorites.includes(item.id) ? ()=>{this.props.save(localStorage.getItem('userId'), item.candidate_id)} : () => this.props.remove(localStorage.getItem('userId'), item.candidate_id)}></i></td>
          </tr>
        )
      })}
      </tbody>
      </table>
      </div>
    )
  }
}


export default PastResults;