import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import queryString from 'query-string';
import { HeroCard } from "../components/HeroCard"
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q as string);

  const showSearch = (q?.length === 0);
  const shorError = (q?.length! > 0) && (heroes.length === 0);

  const { searchText, onInputChange } = useForm<{searchText: string}>({
    searchText: q as string
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={handleSubmit} aria-label="form">
            <input 
              type="text" 
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* {
            (q === '')
            ? <div className="alert alert-primary">Search a hero</div>
            : (heroes.length === 0) 
            && <div className="alert alert-danger">No hero with <b>{q}</b></div>
          } */}
          <div className="alert alert-primary animate__animated animate__fadeInLeft" style={{display: showSearch ? "" : "none"}} aria-label="input-empty">Search a hero</div>
          <div className="alert alert-danger animate__animated animate__fadeInLeft" style={{display: shorError ? "" : "none"}} aria-label="input-not-found">No hero with <b>{q}</b></div>
          {
            heroes.map(hero => {
              return <HeroCard key={hero.id} {...hero} />
            })
          }
        </div>
      </div>
    </>
  )
}
