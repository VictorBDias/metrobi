import {
  Container,
  Sidebar,
  Content,
  RelatedContent,
  Footer,
  Body,
} from './layoutComponent.styles';

export const LayoutComponent = () => {
  return (
    <Container>
      <header
        style={{
          height: '10vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#53CBE6',
          width: '100%',
          border: '2px solid white',
        }}
      >
        <h1>Header</h1>
      </header>
      <Body>
        <Sidebar>
          <div
            style={{
              height: '30vh',
              backgroundColor: '#D1C2DD',
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
              border: '2px solid white',
            }}
          >
            <h2>Hero</h2>
          </div>
          <div
            style={{
              backgroundColor: '#96BB62',
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
              border: '2px solid white',
            }}
          >
            <h1>Sidebar</h1>
          </div>
        </Sidebar>
        <Content>
          <div
            style={{
              backgroundColor: '#F2BF43',
              height: '45vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              border: '2px solid white',
            }}
          >
            <h1>Main Content</h1>
            <h1 style={{ textAlign: 'center' }}>
              Something very difficult to read lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quos.
            </h1>
          </div>
          <div
            style={{
              backgroundColor: '#7E7E7E',
              height: '25vh',
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
              border: '2px solid white',
            }}
          >
            <h1>Extra Content</h1>
          </div>
        </Content>
      </Body>
      <RelatedContent>
        <div
          style={{
            backgroundColor: '#30AB6D',
            height: '10vh',
            width: '70%',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            border: '2px solid white',
          }}
        >
          <h1>Relaited Images</h1>
        </div>
        <div
          style={{
            backgroundColor: '#F1C3D8',
            height: '10vh',
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            border: '2px solid white',
          }}
        >
          <h1>Related Posts</h1>
        </div>
      </RelatedContent>
      <Footer
        style={{
          backgroundColor: '#FB9C2D',
          border: '2px solid white',
        }}
      >
        <h1>Footer</h1>
      </Footer>
    </Container>
  );
};
