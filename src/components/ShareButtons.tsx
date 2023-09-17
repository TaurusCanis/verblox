
/**
 * Component to display social share buttons.
 *
 * @returns {JSX.Element} Share buttons for social platforms.
 */
function ShareButtons(): JSX.Element {
  return (
    <div id="share-buttons">
      <a href="#" id="btn-share-fb"><i className="fab fa-facebook"></i> Share on Facebook</a>
      <a href="#" id="btn-share-tw"><i className="fab fa-twitter"></i> Share on Twitter</a>
      <a href="#" id="btn-share-ig"><i className="fab fa-instagram"></i> Share on Instagram</a>
    </div>
  );
}

export default ShareButtons;
