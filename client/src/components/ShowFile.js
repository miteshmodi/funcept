import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import mime from "mime-types";

export default function ShowFile(props) {
    return (
        <Rodal visible={true} onClose={() => props.onClose()} closeOnEsc={true} customStyles={{ height: "80%", width: "80%" }}>
            <div className="app-modal-content">
                {
                    mime.lookup(props.post.fileName).includes('video') &&
                    <video className="img-fluid post-file-big" controls>
                        <source src={props.post.fileUrl} type={mime.lookup(props.post.fileName)}/>
                        Your browser does not support HTML video.
                    </video>
                }
            </div>
        </Rodal>
    );
}