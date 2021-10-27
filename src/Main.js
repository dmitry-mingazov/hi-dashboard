import { Container, Content, Footer, Header, Sidebar } from 'rsuite';

import './Main.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MainGrid from './MainGrid';
import MainSidenav from './MainSidenav';

const Main = () => (
    <div>
        <Container className="mainContainer">
            <Container>
                <Header className="mainHeader">
                    <h4>Hi-Dashboard</h4>
                </Header>
                <Container>
                    <Content className="mainContent">
                        Main Content
                        <MainGrid />
                    </Content>
                    <MainSidenav className="mainSidebar">Sidebar</MainSidenav>
                </Container>
                <Footer className="mainFooter">
                    <h4>Footer</h4>
                </Footer>
            </Container>
        </Container>
    </div>
)

export default Main;