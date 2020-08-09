import React from "react";

class UploadVideoForm extends React.Component {
    constructor(props) {
      super(props);
      // initialize state here
  
    }
    render() {
      return (
        <div>
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="title" placeholder="Video title" />
                </div>
                <div class="form-group">
                    <textarea class="form-control" id="description" placeholder="Say something about your video" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <input type="file" class="form-control" id="video" placeholder="Video" />
                </div>
                <button type="button" class="btn btn-secondary">Upload Video</button>
            </form>
        </div>
      );
    }
  }

export default UploadVideoForm;
