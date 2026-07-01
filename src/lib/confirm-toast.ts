import { toast } from 'sonner';

type ConfirmToastOptions = {
  actionLabel?: string;
  cancelLabel?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  title: string;
};

export function confirmToast({
  actionLabel = 'Confirm',
  cancelLabel = 'Cancel',
  description,
  onConfirm,
  title,
}: ConfirmToastOptions) {
  toast(title, {
    description,
    action: {
      label: actionLabel,
      onClick: () => {
        void onConfirm();
      },
    },
    cancel: {
      label: cancelLabel,
      onClick: () => {},
    },
  });
}
