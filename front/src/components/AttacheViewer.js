import React, {Component} from 'react';

class AttacheViewer extends Component {

    render() {
        return (
            <div style={{width:"100%",height:"100%", border:'none', margin:0, padding:0}}>
             <iframe style={{width:"100%",height:"100%", border:'none', margin:0, padding:0}} src={process.env.REACT_APP_SERVER_URL_PREFIX+"/uploads/"+this.props.fileName}>
            </iframe>
            </div>
        );
    };
}

AttacheViewer.propTypes = {};

export default AttacheViewer;
