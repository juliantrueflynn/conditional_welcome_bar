import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DropZone, Caption, Thumbnail } from '@shopify/polaris';

const FileUploadField = ({ updateImageUpload, backgroundFile, backgroundImage }) => {
  const dropzoneContainerStyle = { width: 155, height: 115 };
  const dropZoneImageStyle = { padding: '0 6px' };

  return (
    <Fragment>
      <div style={dropzoneContainerStyle}>
        <DropZone label="Background image" accept="image/*" type="image" onDrop={updateImageUpload}>
          {backgroundFile && (
            <div style={dropZoneImageStyle}>
              <Thumbnail
                size="small"
                alt={backgroundFile.name}
                source={window.URL.createObjectURL(backgroundFile)}
              />
              <div>
                {backgroundFile.name}
                <Caption>{`${backgroundFile.size} bytes`}</Caption>
              </div>
            </div>
          )}
          {!backgroundFile && <DropZone.FileUpload />}
        </DropZone>
      </div>
      {backgroundImage && (
        <div>
          <Thumbnail size="small" source={backgroundImage} />
        </div>
      )}
    </Fragment>
  );
};

FileUploadField.propTypes = {
  updateImageUpload: PropTypes.func.isRequired,
  backgroundFile: PropTypes.instanceOf(Object),
  backgroundImage: PropTypes.string,
};

FileUploadField.defaultProps = {
  backgroundFile: {},
  backgroundImage: '',
};

export default FileUploadField;
