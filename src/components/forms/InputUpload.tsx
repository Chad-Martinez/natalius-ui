import { ChangeEvent, FC, useRef } from 'react';
import formStyles from './FormComponents.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import FormGroup from './FormGroup';

type InputUploadProps = {
  onImage: (file: File) => void;
  hasFile: boolean;
};

const InputUpload: FC<InputUploadProps> = ({ onImage, hasFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (event: ChangeEvent<HTMLInputElement>) => {
    const capturedFile = event.target.files?.[0];
    if (capturedFile) {
      onImage(capturedFile);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <FormGroup>
      <label
        className={`${formStyles.fileLabel} ${
          hasFile ? formStyles.fileInputDisabled : ''
        }`}
        htmlFor='fileInput'
      >
        <FontAwesomeIcon icon={faCamera} size='xl' />
      </label>
      <input
        id='fileInput'
        ref={fileInputRef}
        className={formStyles.upload}
        type='file'
        accept='image/*'
        disabled={hasFile}
        onChange={handleCapture}
      />
    </FormGroup>
  );
};

export default InputUpload;
