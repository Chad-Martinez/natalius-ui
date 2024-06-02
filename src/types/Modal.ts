import { MutableRefObject } from 'react';
import { IHTMLDialogElement } from '../interfaces/IHTMLDialog.interface';

export type ModalProps = {
  ref: MutableRefObject<IHTMLDialogElement | null>;
  title: string;
  subtitle?: string;
  onConfirm: () => void;
};
