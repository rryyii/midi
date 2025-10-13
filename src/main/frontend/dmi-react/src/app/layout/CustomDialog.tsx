import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';

function CustomDialog({status, type} : {status: boolean, type: string}) {
    
    const [isOpen, setIsOpen] = useState<boolean>(status);

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div
                    className={"position-fixed top-0 m-5 start-0 p-5 w-45 h-45 d-flex justify-content-center align-items-center pop-up shadow"}>
                    <DialogPanel>
                        <DialogTitle>
                            <p>{type}</p>
                        </DialogTitle>
                        <button onClick={() => setIsOpen(false)} className={"btn btn-outline-custom"}>
                            <i className="fa-solid fa-xmark icon-color"></i>
                        </button>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default CustomDialog;