function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search product"
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    )
  }
  
  export default SearchBar
  