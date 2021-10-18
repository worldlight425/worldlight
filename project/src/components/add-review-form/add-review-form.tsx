import {useState, ChangeEvent, FormEvent, Fragment} from 'react';

const COMMENT_PLACEHOLDER = 'Enter Your Review...';

const Ratings = [
  10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
];

interface AddReviewFormProps {
  initialRating: number,
  initialComment: string,
  handleSubmit: (comment: string, currentRating: number) => void
}

function AddReviewForm(props: AddReviewFormProps): JSX.Element {
  const {initialRating, initialComment, handleSubmit} = props;

  const [currentRating, setCurrentRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrentRating(+evt.target.value);
  };

  const handleSubmitChange = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit(comment, currentRating);
    setCurrentRating(initialRating);
    setComment(initialComment);
  };


  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmitChange}>
        <div className="rating">
          <div className="rating__stars">
            {
              Ratings?.map((rating) => {
                const inputID = `star-${rating}`;
                const checked = rating === currentRating;

                return (
                  <Fragment key={inputID}>
                    <input className="rating__input" id={inputID} type="radio" name="rating" value={rating} checked={checked} onChange={handleRatingChange}/>
                    <label className="rating__label" htmlFor={inputID}>Rating {rating}</label>
                  </Fragment>
                );
              })
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder={COMMENT_PLACEHOLDER} value={comment} onChange={handleCommentChange} />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
