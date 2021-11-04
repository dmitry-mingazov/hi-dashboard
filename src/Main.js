import { Container, Footer, Header, } from 'rsuite';

import './Main.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React from 'react';
import MainHeader from './MainHeader';
import MainContent from './MainContent';
import { UserContext } from './UserContext';



class Main extends React.Component {
    static contextType = UserContext;

    render() {
        let { isTokenSet, } = this.context;

        return(
            <Container className="mainContainer">
                <Container>
                    <Header>
                        <MainHeader />
                    </Header>
                    <Container>
                        {isTokenSet &&
                            <MainContent />
                        }
                    </Container>
                    <Footer className="mainFooter">
                        <h4>Footer</h4>
                    </Footer>
                </Container>
            </Container>
        );
    }
}

export default Main;