interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 
                      p-8 rounded-2xl shadow-2xl w-[420px] text-white">
        {children}
      </div>
    </div>
  );
};

export default Modal;
