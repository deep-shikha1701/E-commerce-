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
                <Button onClick={props.handleClose}>Close</Button>
                {props.handleAddButton ?
                    <Button onClick={props.handleAddButton}>Add</Button>
                    : null
                }
            </Modal.Footer>
        </Modal>

    )
}

export default ModalComponent
