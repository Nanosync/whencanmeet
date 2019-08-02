import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import MyModal from './MyModal';

function ShareModal(props) {
  const { shareURL, onHide, ...additionalProps } = props;
  const [show, setShow] = useState(false);
  const handleCopyClick = (e) => {
    navigator.clipboard.writeText(shareURL);
    setShow(true);
  };
  const onDefaultHide = () => {
    setShow(false);

    if (onHide) {
      onHide();
    }
  };

  const content = (
    <div className="text-center">
      <p>Send this link to others to share this meeting!</p>
      <InputGroup className="mb-3" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
        <FormControl
          value={shareURL}
          aria-label="Share URL"
          aria-describedby="basic-addon2"
          readOnly
        />
        <InputGroup.Append>
          <Button id="basic-addon2" title="Copy URL" aria-label="Copy URL" variant="primary" onClick={handleCopyClick}>
            { /* eslint-disable-next-line */ }
            <i className="fa fa-files-o" aria-hidden="true"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
      { show ? (
        <p style={{ color: 'green' }}>
          Link copied to clipboard!
        </p>
        ) : null }
    </div>
  );

  return (
    <MyModal
      {...additionalProps}
      title="Share Meeting"
      body={content}
      onHide={onDefaultHide}
    />
  );
}

export default ShareModal;
