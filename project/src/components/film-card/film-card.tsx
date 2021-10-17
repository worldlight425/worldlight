import {Link} from 'react-router-dom';
import {Film} from 'types/film';

type FilmCardProps = {
  film: Film,
  handleMouseEnter: (film: Film) => void,
  handleMouseLeave: () => void,
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film, handleMouseEnter, handleMouseLeave} = props;

  return (
    <article className="small-film-card catalog__films-card" data-id={film.id} onMouseEnter={() => handleMouseEnter(film)} onMouseLeave={() => handleMouseLeave()}>
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
