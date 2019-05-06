import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <br />
                <hr />
                <div className="container">
                    <span className="text-muted">Copyright ©2019. All Right Reserved By</span><span> CIKTELECOM </span>
                </div>
                <br />
            </footer>
        );
    }
}