/* "Modal component for Website", v. 0.5 - 20.09.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React. For Websites with support modal on page. */


    /* INSTALLATION */
/* Add in HTML portal:  <div id="modal-root"></div> */
/* Add in application next string:  const [select, setSelect] = useState(null); */
/* Add in CSS Style:
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.65);
        z-index: 2;
        transition: opacity linear 250ms;
    }

    .overlay__button {
        position: absolute;
        margin: 10px;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.0);
        border: 2px ridge #eeeeee;
        border-radius: 50%;
        cursor: pointer;
        fill: #eeeeee;
        transition: fill linear 250ms, border-color linear 250ms;

    .overlay__button__icon {
        fill: inherit;
        width: 32px;
        height: 32px;
        z-index: -1;
    }

    .overlay__button:hover {
        fill: #e12424; // #aa0000, #bb2828, #e12424
        border-color: #e12424; // #aa0000, #bb2828, #e12424
    }

    .modal, .large-image {
        max-width: calc(100vw - 48px);
        max-height: calc(100vh - 24px);
    }

    .large-image {
        display: block;
        margin: 20px auto;
    }
*/
/* Import component in application: import Modal from './components/Modal_v.0.5.jsx'; */
/* Add component in application for use in JSX string on section render or return: <Modal content={select} /> */
/* You need send in promise for component data...           
    setSelect(
      {
        src: event.currentTarget.src,
        alt: event.currentTarget.alt
      }
    )
*/
/* Example for Use on image in JSX string on section render or return:
    <img src={./img/jpg/example.jpg} alt="Example" onClick={event => setSelect(
          {
            src: event.currentTarget.src,
            alt: event.currentTarget.alt
          }
    )}></img>
*/


import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalPortal = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    showModal: false,
    data: this.props.content,
    opacity: 0,
    isFadingOut: false,
  };

  componentDidMount() {
    const { content } = this.props;
    this.setState({ data: content });
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      this.setState({ data: this.props.content });
    }

    if (this.state.data !== prevState.data && !prevState.showModal) {
      this.openModal(); // Плавное открытие при смене контента
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.code === 'Escape') {
      this.startFadeOut();
    }
  };

  toggleModal = (event) => {
    if (event.currentTarget === event.target) {
      this.startFadeOut();
    }
  };

  openModal = () => {
    this.setState({ showModal: true }, () => {
      setTimeout(() => {
        this.setState({ opacity: 1 }); // Плавное появление
      }, 50); // Позволяет модалке сначала появиться в DOM, а затем плавно изменять opacity
    });
  };

  startFadeOut = () => {
    this.setState({ opacity: 0, isFadingOut: true });
    setTimeout(() => {
      this.setState({ showModal: false, isFadingOut: false });
    }, 250); // Длительность анимации 250мс
  };

  render() {
    const { showModal, opacity, isFadingOut } = this.state;
    const { content } = this.props;

    let jsx = null;
    if (!content) {
      jsx = <p>"No content available"</p>;
    } else {
      jsx = (
        <img
          className='large-image'
          src={content.src}
          width={"80%"}
          height={"auto"}
          alt={content.alt}
          id="largePicture" />
      );
    }

    const modal = (
      <div
        className="overlay"
        style={{ opacity: opacity, transition: 'opacity 300ms ease' }} // Переход для плавности
        onClick={this.toggleModal}>
        <button
          className="overlay__button"
          type="button"
          aria-label="close modal"
          onClick={this.toggleModal}>
          <svg
            className="overlay__button__icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32">
            <path d="M30.721 6.774l-9.197 9.253 9.197 9.198c0.385 0.384 0.385 1.007 0 1.392l-4.176 4.175c-0.383 0.385-1.006 0.385-1.391 0l-9.182-9.182-9.127 9.182c-0.384 0.385-1.007 0.385-1.392 0l-4.175-4.175c-0.384-0.385-0.384-1.008 0-1.392l9.127-9.182-9.126-9.126c-0.384-0.384-0.384-1.007 0-1.392l4.175-4.175c0.384-0.385 1.007-0.385 1.392 0l9.11 9.11 9.199-9.253c0.385-0.385 1.008-0.385 1.391 0l4.176 4.175c0.383 0.385 0.383 1.008-0.001 1.392z"></path>
          </svg>
        </button>
        <div className="modal" onClick={this.toggleModal}>
          {jsx}
        </div>
      </div>
    );

    return createPortal(showModal || isFadingOut ? modal : null, modalPortal);
  }
}
