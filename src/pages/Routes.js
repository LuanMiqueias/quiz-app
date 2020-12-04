import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './Landing/landing';
import QuizList from './QuizList/QuizList'
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Landing} />
                <Route path="/all" component={QuizList} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes