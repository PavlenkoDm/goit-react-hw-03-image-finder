import React, { Component } from 'react';
import {createPortal} from 'react-dom'

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.props.escCloseModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.props.escCloseModal);
    }

    handleOverlayClick = (event) => {
        if (event.target !== event.currentTarget) return;

        this.props.closeModal();
    }

    render() {
        const { urlBigImage, alt } = this.props.modalImageData;
        return createPortal(
            <div className="Overlay" onClick={this.handleOverlayClick}>
                <div className="Modal">
                    <img src={urlBigImage} alt={alt} />
                </div>
            </div>, modalRoot
        );
    }
}
