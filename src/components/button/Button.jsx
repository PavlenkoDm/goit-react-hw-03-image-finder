export const Button = ({ onClick }) => {
    return (
        <div className="Button-container">
            <button
                className="Button"
                type="button"
                onClick={event => onClick(event)}
            >
                Load more
            </button>
        </div>
    );
};
