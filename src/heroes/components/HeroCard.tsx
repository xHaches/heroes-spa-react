import { Link } from "react-router-dom"

const CharactersByHero = (
    {alter_ego, characters}: {alter_ego: string, characters: string}
) => (alter_ego === characters) ? <></> :  <p>{characters}</p>;

export const HeroCard = ({ 
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters, 
}: {
    id: string,
    superhero: string,
    publisher: string,
    alter_ego: string,
    first_appearance: string,
    characters: string,
}) => {
    const heroImageUrl = `/assets/heroes/${id}.jpg`
    return (
        <div className="col">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4 animate__animated animate__fadeIn">
                        <img src={heroImageUrl} className="card-img" alt={superhero} />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>
                            <CharactersByHero 
                                alter_ego={alter_ego} 
                                characters={characters}
                            />
                            <p className="card-text">
                                <small className="text-muted">{first_appearance}</small>
                            </p>
                            <Link to={`/hero/${id}`}>
                                Más...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
