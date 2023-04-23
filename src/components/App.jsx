import React, { Component } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { SearchBar } from 'components/index';
import { getImagesFromApi, createUrlParameters } from 'components/index';
import { ImageGallery } from 'components/index';
import { Button } from 'components/index';
import { Modal } from 'components/index';

export class App extends Component {
    state = {
        searchInputSubmit: '',
        isLoading: false,
        currentPage: 1,
        totalItems: 0,
        minimizedResponse: [],
        loadMoreBtnStatus: false,
        openModalData: null,
        error: '',
    };

    async componentDidUpdate(_, prevState) {
        const { searchInputSubmit, currentPage } = this.state;
        if (
            prevState.searchInputSubmit !== searchInputSubmit ||
            prevState.currentPage !== currentPage
        ) {
            const urlOptions = createUrlParameters(
                searchInputSubmit,
                currentPage
            );

            try {
                Loading.arrows();
                this.setState({ isLoading: true });
                const { total, hits } = await getImagesFromApi(urlOptions);
                if (total === 0) {
                    Report.failure('Ooops', 'We found nothing. Change your request <br/><br/>', 'Okay', {svgSize: '200px'});
                    Loading.remove();
                    return;
                }
                const minimizedHits = hits.map(item => {
                    const { id, largeImageURL, webformatURL, tags } = item;
                    return {
                        id,
                        webformatURL: webformatURL,
                        largeImageURL: largeImageURL,
                        tags,
                    };
                });

                this.setState(prevState => {
                    const { minimizedResponse } = prevState;
                    return {
                        isLoading: false,
                        totalItems: total,
                        minimizedResponse: [
                            ...minimizedResponse,
                            ...minimizedHits,
                        ],
                    };
                });

                Loading.remove();
            } catch (error) {
                Loading.remove();
                this.setState({ isLoading: false });
                this.setState({ error: error.massage });
            }
        }
    }

    handleSearchSubmit = searchValue => {
        this.setState({
            searchInputSubmit: searchValue.trim().toLowerCase(),
            currentPage: 1,
            isLoading: false,
            totalItems: 0,
            minimizedResponse: [],
            loadMoreBtnStatus: false,
            openModalData: null,
            error: '',
        });
    };

    handleLoadMoreBtnClick = event => {
        if (event.target !== event.currentTarget) return;
        this.setState(prevState => {
            return { currentPage: prevState.currentPage + 1 };
        });
    };

    handleImageClick = data => {
        if (!data) return;
        this.setState({ openModalData: data });
    };

    handleModalClose = () => {
        this.setState({ openModalData: null });
    };

    onEscCloseModal = event => {
        if (event.code !== 'Escape') return;
        this.handleModalClose();
    };

    render() {
        const {
            isLoading,
            totalItems,
            minimizedResponse,
            error,
            openModalData,
        } = this.state;
        const isButtonVisible =
            !isLoading && minimizedResponse.length < totalItems;

        return (
            <div>
                <SearchBar onSubmit={this.handleSearchSubmit} />
                <ImageGallery
                    arrToRender={minimizedResponse}
                    imageClick={this.handleImageClick}
                ></ImageGallery>
                {isButtonVisible && (
                    <Button onClick={this.handleLoadMoreBtnClick} />
                )}
                {error && <p>{error}</p>}
                {openModalData && (
                    <Modal
                        modalImageData={openModalData}
                        closeModal={this.handleModalClose}
                        escCloseModal={this.onEscCloseModal}
                    />
                )}
            </div>
        );
    }
}
