import React, { Component } from 'react';

export class SearchBar extends Component {
    state = {
        searchInput: ''
    }

    handleInputChange = (event) => {
        const { value } = event.currentTarget;
        this.setState({searchInput: value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchInput);
        this.setState({searchInput: ''})
    }

    render() {
        const { searchInput } = this.state;
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={searchInput}
                        placeholder="Search images and photos"
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>
        );
    }
}
