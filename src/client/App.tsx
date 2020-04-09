import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import Navbar from './components/navBar'
import NewBlog from './pages/newBlog'

const App: React.SFC<AppProps> = () => {
	
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/new" component={NewBlog} />
					<Route exact path="/:id/details" component={null} />
                </Switch>
            </main>
        </BrowserRouter>
    )
}

interface AppProps { };

export default App;
