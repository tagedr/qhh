import React, {Component} from 'react';

class AttacheViewer extends Component {

    render() {
        return (
            
             <iframe title="AttachmentContent" style={{width:"100%",height:"100%", maxHeight:"100%", border:'none'}} src={process.env.REACT_APP_SERVER_URL_PREFIX+"/uploads/"+this.props.fileName}>
            </iframe>
        );
    };
}

AttacheViewer.propTypes = {};

export default AttacheViewer;
