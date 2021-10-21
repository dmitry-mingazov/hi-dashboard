import { Container, Content, Footer, Header, Sidebar } from 'rsuite';

import './Main.css';

const Main = () => (
    <div>
        <Container className="mainContainer">
            <Container>
                <Header className="mainHeader">
                    <h4>Hi-Dashboard</h4>
                </Header>
                <Content className="mainContent">
                    Main Content
                </Content>
                <Footer className="mainFooter">
                    <h4>Footer</h4>
                </Footer>
            </Container>
            {/* <Sidebar className="mainSidebar">Sidebar</Sidebar> */}
        </Container>
    </div>
)

export default Main;