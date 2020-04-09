import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import Navbar from './components/navBar'
import NewBlog from './pages/newBlog'
import Details from './pages/blogDetails'
import Admin from './pages/admin'
import Edit from './pages/editBlog'

const App: React.SFC<AppProps> = () => {
	
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/new" component={NewBlog} />
					<Route exact path="/:id/details" component={Details} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/:id/edit" component={Edit} />
                </Switch>
            </main>
        </BrowserRouter>
    )
}

interface AppProps { };

export default App;
