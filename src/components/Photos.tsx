

const Photos = ({urls: {regular}, alt_description, likes, user: {name, portfolio_url, profile_image: {medium}}}: any) => {
  return (
    <article className='photo'>
      <img src={regular} alt={alt_description}/>
      <div className='photo-info'>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className='user-img'/>
        </a>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
      </div>
    </article>
  );
};

export default Photos;