import '../../Styles/styles.css';

export const ButtonLoadMore = ({ onLoadMore }) => {
  return (
    <button className="Button" onClick={onLoadMore}>
      Load more
    </button>
  );
};
