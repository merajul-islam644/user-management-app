import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Modal = ({
  openModal,
  onClose,
  onConfirm,
  title = "Confirmation",
  description = "Description",
  confirmText = "Yes",
  cancelText = "Cancel",
  children, 
}) => {  
  
  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && <div className="my-4">{children}</div>}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button className={`px-6 ${description.includes("update") && "bg-sky-500 hover:bg-sky-500"}`} variant="destructive" onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
