import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import shiftWizardStyles from './ShiftWizard.module.css';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import { ShiftData } from '../../pages/CompleteShiftWizard/CompleteShiftWizard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import InputUpload from '../forms/InputUpload';
import Modal from '../ui/Modal/Modal';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';
import { deleteImage } from '../../services/imageService';
import { notify } from '../../helpers/toast-helpers';

const ShiftFileUpload: FC<{
  goNext: (shiftData: ShiftData | null) => void;
  goBack: (shiftData: ShiftData | null) => void;
  shiftData: ShiftData | null;
}> = ({ goNext, goBack, shiftData }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<ShiftData | null>(shiftData);
  const [imageString, setImageString] = useState<string>('');
  const [image, setImage] = useState<File | null>(shiftData?.image || null);
  const dialogImageRef = useRef<IHTMLDialogElement | null>(null);

  useEffect(() => {
    setUpdatedShift((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        image: image,
      };
    });
  }, [image]);

  const convertToBase64 = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result?.replace(/^data:.+;base64,/, '');
        setImageString(base64);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    if (image) {
      convertToBase64(image);
    }
  }, [image, convertToBase64]);

  const handleSetImage = (file: File): void => setImage(file);

  const handlePrev = (): void => {
    goBack(updatedShift);
  };

  const handleNext = (): void => goNext(updatedShift);

  const resetImageValues = (): void => {
    setImage(null);
    setImageString('');
  };

  const openImageModal = (): void => {
    dialogImageRef.current?.openModal();
  };

  const handleDeleteImage = async () => {
    if (image) {
      resetImageValues();
      dialogImageRef.current?.closeModal();
    } else if (shiftData?.shiftInfo.image) {
      try {
        const { _id: shiftId } = shiftData.shiftInfo;
        const { public_id } = shiftData.shiftInfo.image;
        const { data } = await deleteImage({ shiftId, public_id });
        notify(data.message, 'success', 'delete-image-success');
        const shiftToUpdate = { ...updatedShift };
        delete shiftToUpdate?.shiftInfo?.image;
        resetImageValues();
        setUpdatedShift((prevState) => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            shiftInfo: {
              ...prevState.shiftInfo,
              image: undefined,
            },
          };
        });
      } catch (error) {
        notify('Error deleting image', 'error', 'delete-image-error');
      } finally {
        dialogImageRef.current?.closeModal();
      }
    }
  };

  const imageDisplayName = image
    ? image.name
    : `${shiftData?.shiftInfo.image?.display_name}.${shiftData?.shiftInfo.image?.format}`;

  return (
    <>
      <Modal
        ref={dialogImageRef}
        title='Delete Receipt'
        subtitle='This action cannot be undone'
        children={<ConfirmDialog onConfirm={handleDeleteImage} />}
      />
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Upload Receipt Image</h3>
          <InputUpload
            onImage={handleSetImage}
            hasFile={shiftData?.shiftInfo.image || image ? true : false}
          />
          <h3 className={formStyles.title}>Receipt</h3>
          {shiftData?.shiftInfo.image || imageString ? (
            <>
              <div className={shiftWizardStyles.imageListItem}>
                <span>{imageDisplayName}</span>
                <FontAwesomeIcon
                  className={`${shiftWizardStyles.icon} ${shiftWizardStyles.danger}`}
                  icon={faTrashCan}
                  onClick={openImageModal}
                />
              </div>
              <img
                className={shiftWizardStyles.imagePreview}
                src={
                  shiftData?.shiftInfo.image
                    ? shiftData.shiftInfo.image.url
                    : `data:image/png;base64,${imageString}`
                }
                alt='Preview'
              />
            </>
          ) : (
            'No Receipt to display'
          )}
        </form>
      </div>
      <BottomNav>
        <Button text='Prev' btnStyle='primaryOutlined' onClick={handlePrev} />
        <Button text='Next' btnStyle='primarySolid' onClick={handleNext} />
      </BottomNav>
    </>
  );
};

export default ShiftFileUpload;
