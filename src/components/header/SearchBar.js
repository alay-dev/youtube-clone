import React from 'react' ;

import './SearchBar.css' ;
import SearchIcon from '@material-ui/icons/Search';
import history from '../../history' ;

class SearchBar extends React.Component {
    state = { term: ''} ;

    onInputChange = (e) => {
        this.setState({ term: e.target.value }) ;
    };

    onFormSubmit = (e) => {
        e.preventDefault() ;
        this.props.onFormSubmit(this.state.term) ;
        history.push('/search') ;
    };

    render() {
        return (
            <form className="search__form" onSubmit={ this.onFormSubmit}>
                <input type="text" value={ this.state.term} onChange={ this.onInputChange} placeholder="Search"/>

                    <button className="submit__btn" type="submit">
                        <SearchIcon className="search__icon" />
                    </button>
            </form>
        );
    }
}

export default SearchBar ;