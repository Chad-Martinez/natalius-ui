import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { ModalProps } from '../../../types/Modal';

const Modal = forwardRef((props: ModalProps, ref) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        modalRef.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={modalRef} className={styles.dialog}>
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.subtitle}>{props.subtitle}</p>
      <div className={styles.dialogBtnGroup}>
        <form method='dialog'>
          <button>
            <FontAwesomeIcon
              className={styles.cancelIcon}
              icon={faCircleXmark}
            />
          </button>
        </form>
        <button onClick={props.onConfirm}>
          <FontAwesomeIcon
            className={styles.confirmIcon}
            icon={faCircleCheck}
          />
        </button>
      </div>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default Modal;
