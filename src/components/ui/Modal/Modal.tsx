import { createPortal } from 'react-dom';
import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './Modal.module.css';
import { ModalProps } from '../../../types/Modal';

const Modal = forwardRef(
  ({ title, subtitle, children }: PropsWithChildren<ModalProps>, ref) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => {
      return {
        openModal() {
          modalRef.current?.showModal();
        },
        closeModal() {
          modalRef.current?.close();
        },
      };
    });

    return createPortal(
      <dialog ref={modalRef} className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
      </dialog>,
      document.getElementById('modal')!
    );
  }
);

export default Modal;
