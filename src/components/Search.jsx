import { useState } from 'react'


function setSearchQuery() {
    return (<></>)
}


function Search() {
    const [searchQuery, setSearchQuery] = useState('Search here');

    return (
        <>
            <label className="field">
                <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Items here  "
                />
            </label>
        </>
    );
}

export default Search;
