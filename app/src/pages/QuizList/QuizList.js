import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/header';
import './style.css'
import iconSearch from '../../assets/icons/IconSearch.svg'
function QuizList(){
    return(
        <div>
            <Header>
            <div className="container-right">
                <form>
                    <input type="text"/>
                    <button><img src={iconSearch} alt=""/></button>
                </form>
              <Link to="/">Login {'>'}</Link>
            </div>
            </Header>
        </div>
    );
}

export default QuizList