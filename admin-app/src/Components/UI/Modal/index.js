import { Modal, Button } from 'react-bootstrap';

const ModalComponent = (props) => {
    return (
        <Modal
            show={props.show}
            size={props.size}
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body  >
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.handleAddButton ?
                    <>                
                        <Button onClick={props.handleClose}>Close</Button>
                        <Button onClick={props.handleAddButton}>Add</Button>
                    </>
                    : null
                }
                {props.handleUpdateButton ?
                    <>
                        <Button onClick={props.handleClose}>Close</Button>
                        <Button onClick={props.handleUpdateButton}>Update</Button>
                    </>
                    : null
                }
                {props.handleDeleteButton?
                    <>
                        <Button onClick={props.handleClose}>No</Button>
                        <Button onClick={props.handleUpdateButton}>Yes</Button>  
                    </>
                    : null
                }
            </Modal.Footer>
        </Modal>

    )
}

export default ModalComponent
