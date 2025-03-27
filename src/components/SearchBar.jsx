export default function SearchBar(props) {
    const SearchSubmit = (event) => {
        if (event.key === 'Enter'){
            props.setSearch(event.target.value)
            console.log(event.target.value);
        }
    };
    return (
        <div className="search">
          <div>
            <img src="src/assets/search.svg" alt="search" />
            <input
            type="text"
            placeholder="Search through thousands of movies"
            onKeyDown={SearchSubmit}
            />
          </div>
        </div>
    )
}