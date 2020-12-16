import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/header';
import './style.css'
import iconSearch from '../../assets/icons/IconSearch.svg'
import IconUser from '../../assets/icons/IconUser.svg'
import QuizItem from '../../components/QuizItem/quizItem'

function QuizList(){
    
    return(
        <div className="quizList">
            <Header>
            <div className="container-right">
                <form>
                    <input type="text"  />
                    <button><img src={iconSearch} alt=""/></button>

                </form>
              <Link to="/">Login {'>'}</Link>
            </div>
            </Header>
            <main>
                <div className="content">
                <h1>Quizzes enviados recentemente </h1>
                    <section>
                        <QuizItem
                        title="Perguntas sobre JavaScript ES6"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum risus non odio semper, id pulvinar risus suscipit. Quisque faucibus elit at nunc aliquet ultrices."
                        tags={['JavaScript', 'Programação', 'ES6 2017']}
                        favorited={true}
                        />
                                                <QuizItem
                        title="Perguntas sobre JavaScript ES6"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum risus non odio semper, id pulvinar risus suscipit. Quisque faucibus elit at nunc aliquet ultrices."
                        tags={['JavaScript', 'Programação', 'ES6 2017']}
                        favorited={false}
                        />
                                                                        <QuizItem
                        title="Perguntas sobre JavaScript ES6"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum risus non odio semper, id pulvinar risus suscipit. Quisque faucibus elit at nunc aliquet ultrices."
                        tags={['JavaScript', 'Programação', 'ES6 2017']}
                        favorited={false}
                        />
                                                                        <QuizItem
                        title="Perguntas sobre JavaScript ES6"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum risus non odio semper, id pulvinar risus suscipit. Quisque faucibus elit at nunc aliquet ultrices."
                        tags={['JavaScript', 'Programação', 'ES6 2017']}
                        favorited={false}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}

export default QuizList