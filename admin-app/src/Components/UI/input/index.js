import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    return (
        <div>
            <Form.Group className={props.className} controlId="formGroupEmail">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
                <Form.Text className="text-muted">{props.error}</Form.Text>
            </Form.Group>
        </div>
    )
}

export default Input
