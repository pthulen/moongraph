import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {
    renderContent() {
       
        switch (this.props.auth) {
            case null:
                return <li className="logout" ><a href="/">Error</a></li>;
            case false:
                return (
                    <li className="login" ><a href="/auth/google" >Log In With Google</a></li>
                );
            default:
                return (
                    <li key="2" className="logout"><a href="/api/logout">Logout</a></li>
                );
        }
    }
    render() {
        return (
            <div className="App-header">
                <h4>Moon Graph</h4>
                {this.renderContent()}
            </div>
        );
    }
}


function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header);