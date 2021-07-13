import React, { Component } from 'react';
import logo from '../assets/default-logo.svg';
import rocketImage from '../assets/Rocket.svg';
import carousel from '../assets/carousel.svg';
import security from '../assets/security.svg';
import bitcoin from '../assets/bitcoin.svg';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="landing-hero">
                    <img src={logo} alt="main landing logo" />
                    <h2>Welcome to Moon Graph</h2>
                    <h3>Cyptocurrency Portfolo Tracker</h3>
                    <a href="/portfolio" className="btn" ><button >Get Started</button></a>
                </div>
                <div className="landing-middle">
                    <img src={rocketImage} alt="non-information rocket" />
                    <h3>Why Moon Graph?</h3>
                    
                </div>
                
                <div className="landing-middle landing-info">
                    <div className="text-content">
                        <h4>Simplify</h4>
                        <p>Is your portfolio spread across more than one wallet or exchange? Instead of logging into each of your separate accounts you can quickly get an estimate of your portfolio's total value. At Moon Graph, you just fill in what you're holding, where ever, and we'll track its value for you.</p>
                    </div>
                    <img src={carousel} alt="non-information rocket" />
                </div>
                <div className="landing-middle landing-info col-reverse">
                    <img src={security} alt="non-information rocket" />
                    <div className="text-content">
                        <h4>Security</h4>
                        <p>Concerned about security? No need to share your wallet addresses, logins, or exchange APIs. Just input your current crypto assests and we'll track the value. We don't care where, how, or if you actually hold them. </p>
                    </div>
                </div>
                <div className="landing-middle landing-info">
                    <div className="text-content">
                        <h4>Paper Trading</h4>
                        <p>New to cryptocurrency and want to test out a potential strategy without risking real fiat? Are you a long term hodlr looking try some trendy mooning meme coin? Make a throw away account to track your potential scheme without any risk. Except for the risk of real life fomo... </p>
                    </div>
                    <img src={bitcoin} alt="non-information rocket" />
                </div>
            </div>
        );
    }
}

export default Landing;